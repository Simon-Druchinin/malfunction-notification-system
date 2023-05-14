import { Badge, Button, Row } from "reactstrap"

import { Can } from "@/utility/context/Can"
import useJwt, { JwtToken } from "@/auth/jwt/useJwt"
import { handleReload } from '@/utility/utils'

import jwt_decode from "jwt-decode"

const ApplicationData = (props: any): JSX.Element => {
  const { malfunctionData, canvasItems } = props

  const { projectInstance, getToken } =  useJwt()

  const decoded_token: JwtToken = jwt_decode(getToken() as string)
  const user_id = decoded_token.user_id

  if (!malfunctionData) return <></>

  const handleApplicationTake = async () => {
    const data = {
      taken_by: user_id,
      status: 2
    }

    const takeResponse = await projectInstance.patch(`/api/v1/schemas/take-problem/${malfunctionData.id}/`, data)
    handleReload()
  }

  const handleApplicationFinish = async () => {
    const data = {
      status: 3
    }

    const finishResponse = await projectInstance.patch(`/api/v1/schemas/take-problem/${malfunctionData.id}/`, data)
    handleReload()
  }

  const renderTakeApplication = (): JSX.Element => {
    if (malfunctionData.status.id === 1) {
      return (
        <Can I='take' a='malfunctionreport'>
          <Button onClick={handleApplicationTake} className="px-2 py-1" color='primary' outline>Взять заявку</Button>
        </Can>
      )
    }

    if (malfunctionData.status.id === 2 && malfunctionData.taken_by.id === user_id) {
      return (
        <Can I='take' a='malfunctionreport'>
          <Button onClick={handleApplicationFinish} className="px-2 py-1" color='primary' outline>Завершить</Button>
        </Can>
      )
    }

    return <></>
  }

  const date_created = new Date(malfunctionData.date_created) 

  return (
    <>
      <div>
        <Badge color={malfunctionData.status.color}>
          Статус: {malfunctionData.status.name}
        </Badge>
      </div>
      <div className="mt-1">
        <Badge className="me-2" color='info'>
          Время создания:
        </Badge>
        {date_created.toLocaleString('ru-RU')}
      </div>
      <div className="mt-3"> 
        <Badge className="me-2" color='info'>
          Создана:
        </Badge>
        {malfunctionData.created_by.last_name}&nbsp;{malfunctionData.created_by.first_name}&nbsp;
        ({malfunctionData.created_by.groups[0].name})
      </div>
      {malfunctionData.taken_by ?
        <div className="mt-3">
            <Badge className="me-2" color='info'>
              В работе:
            </Badge>
            {malfunctionData.taken_by.last_name}&nbsp;{malfunctionData.taken_by.first_name}&nbsp;
            ({malfunctionData.taken_by.groups[0].name})
        </div>
      : null}
      <div className="mt-3">
        {renderTakeApplication()}
      </div>
    </>
  )
}

export default ApplicationData