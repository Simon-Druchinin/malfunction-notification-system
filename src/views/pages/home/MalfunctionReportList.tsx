import { useState, useEffect } from "react"

import useJwt from "@/auth/jwt/useJwt"
import { Row, Col, Badge, Card, CardBody, CardHeader, Button } from "reactstrap"
import * as Icon from "react-feather"
import { Link } from "react-router-dom"


const MalfunctionReportList = (props: any): JSX.Element => {
  const { requestUrl, title, icon } = props

  const IconTag = Icon[icon as keyof typeof  Icon]

  const { projectInstance } = useJwt()

    const [malfunctionReports, setMalfunctionReports] = useState([])

    useEffect(() => {
        projectInstance.get(requestUrl)
            .then((response: any) => setMalfunctionReports(response.data))
    }, [])

    return (
      <Card className={'settings-card elements-card'}>
        <CardHeader>
          <Badge className='fs-6' color='primary'>
            <IconTag /> {title}
          </Badge>
        </CardHeader>
        <CardBody>
          {malfunctionReports.map((report: any, index: number) => {
            const date_created = new Date(report.date_created)
            return (
              <div key={report.id} className='report-info-card'>
                <div>
                  <Link to={`/applications/view/${report.id}`}>  
                    <Badge className='mx-2' color='success'>
                      №{report.id}
                    </Badge>
                    <Button className='py-1 px-2' color='success' outline>
                      {report.name}
                    </Button>
                  </Link>
                </div>
                <div>
                  {report.room_schema.name}
                  <Badge className='mx-3' color={report.status.color}>
                    {report.status.name}
                  </Badge>
                  {date_created.toLocaleDateString("ru-RU")}
                </div>
              </div>
            )
          })}
          {malfunctionReports.length === 0 ? <Badge>Пусто</Badge> : null}
        </CardBody>
      </Card>
    )
}

export default MalfunctionReportList
