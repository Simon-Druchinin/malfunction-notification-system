import { useState, useEffect, useRef } from "react"
import { Row , Col, Card, CardBody, CardHeader, Badge, Input } from "reactstrap"

import { Edit, Eye } from 'react-feather'

import Canvas from '@/views/pages/schema-editor/Canvas'
import SaveApplicationForm from '../SaveApplicationForm'
import ApplicationSettings from '../ApplicationSettings'
import ElementApplicationCard from "../ElementApplicationCard"
import useJwt from "@/auth/jwt/useJwt"
import { useParams } from "react-router"


const ApplicationEditor = (): JSX.Element => {
  const mode = 'applicationView'

  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [canvasItems, setCanvasItems] = useState([])
  const [itemCategories, setItemCategories] = useState([])
  const [activeElement, setActiveElement] = useState<any>(null)
  const [invisibleCategories, setInvisibleCategories] = useState([])
  const [roomSize, setRoomSize] = useState<{width: number | string, length: number | string}>({width: '', length: ''})
  const [malfunctionData, setMalfunctionData] = useState()

  const [selectedRoom, setSelectedRoom] = useState('')

  const cardBodyRef: any = useRef(null)

  const { projectInstance } = useJwt()

  const { reportId } = useParams()

  useEffect(() => {
    if (!cardBodyRef?.current) return
    setCanvasWidth(cardBodyRef.current.offsetWidth)

    window.addEventListener('resize', () => setCanvasWidth(cardBodyRef.current.offsetWidth))

    return () => window.removeEventListener('resize', () => setCanvasWidth(cardBodyRef.current.offsetWidth))
  }, [])

  useEffect(() => {
    projectInstance.get('/api/v1/schemas/item-categories/')
      .then((response: any) => {
        setItemCategories(response.data)
      })
  }, [])

  useEffect(() => {
    handleMalfunctionReportDataFetch()
  }, [])

  const handleMalfunctionReportDataFetch = async () => {
    const malfunctionReportResponse = await projectInstance.get(`/api/v1/schemas/malfunction-reports/${reportId}`)
    const malfunctionReportData = malfunctionReportResponse.data
    
    const roomSchemaResponse = await projectInstance.get(`/api/v1/schemas/room-schemas/${malfunctionReportData.room_schema.id}`)
      
    const roomSchemaData = roomSchemaResponse.data
    const items = roomSchemaData.items.map((item: any, index: number) => {
      const problem_item = malfunctionReportData.problem_elements.filter((problem_item: any) => problem_item.room_element.id === item.id)
      if (problem_item[0]) {
        item.problem_text = problem_item[0].problem_text
      }
      item.key = index + 1
      return item
    })
    setCanvasItems(items)
    setRoomSize({width: roomSchemaData.width, length: roomSchemaData.length})
    setSelectedRoom(roomSchemaData.name)
    setMalfunctionData(malfunctionReportData)
  }
  
  return (
    <div id='application-editor'>
      <Row className='match-height'>
        <Col>
          <Card>
              <CardHeader>
                <Badge className="fs-6 bg-gradient" color='primary'>
                  <Edit /> Параметры заявки
                </Badge>
              </CardHeader>
              <CardBody>
                <ApplicationSettings
                  mode={mode}
                  canvasItems={canvasItems}
                  itemCategories={itemCategories}
                  invisibleCategories={invisibleCategories}
                  setInvisibleCategories={setInvisibleCategories}
                  setActiveElement={setActiveElement}
                  malfunctionData={malfunctionData}
                />
              </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='match-height'>
        <Col>
          <Card>
            <CardHeader>
              <Badge className="fs-6 bg-gradient mb-2 mb-md-0" color="primary">
                <Eye /> Просмотр комнат
              </Badge>
              <Input
                className="react-select"
                readOnly
                value={selectedRoom}
              />
              <SaveApplicationForm
                mode={mode}
                canvasItems={canvasItems}
                selectedRoom={selectedRoom}
                malfunctionData={malfunctionData}
              />
              <ElementApplicationCard
                mode={mode}
                activeElement={activeElement}
                canvasItems={canvasItems}
                setCanvasItems={setCanvasItems}
              />
            </CardHeader>
            <CardBody className="overflow-hidden" innerRef={cardBodyRef}>
              <Canvas
                width={canvasWidth}
                height={400}
                mode={mode}
                roomSize={roomSize}
                canvasItems={canvasItems}
                itemCategories={itemCategories}
                setCanvasItems={setCanvasItems}
                activeElement={activeElement}
                setActiveElement={setActiveElement}
                invisibleCategories={invisibleCategories}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ApplicationEditor
