import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Badge
} from "reactstrap"


import RoomItemsVisibilityForm from '@/views/pages/schema-editor/RoomItemsVisibilityForm'
import ProblemElementsList from "./ProblemElementsList"
import ApplicationData from './ApplicationData'


const ApplicationSettings = (props: any): JSX.Element => {
  return (
    <Row className="match-height">
      <Col md='4'>
        <Card className='settings-card elements-card'>
          <CardHeader>
            <Badge color='success'>Слои</Badge>
          </CardHeader>
          <CardBody>
            <RoomItemsVisibilityForm
              itemCategories={props.itemCategories}
              invisibleCategories={props.invisibleCategories}
              setInvisibleCategories={props.setInvisibleCategories}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md='4'>
        <Card className='settings-card elements-card'>
          <CardHeader>
            <Badge color='danger'>Список проблем</Badge>
          </CardHeader>
          <CardBody>
            <ProblemElementsList
              canvasItems={props.canvasItems}
              invisibleCategories={props.invisibleCategories}
              setActiveElement={props.setActiveElement}
            />
          </CardBody>
        </Card>
      </Col>
      {props.mode === 'applicationView' ?
        <Col md='4'>
          <Card className='settings-card elements-card'>
            <CardHeader>
              <Badge color='success'>Данные о заявке</Badge>
            </CardHeader>
            <CardBody>
              <ApplicationData
                canvasItems={props.canvasItems}
                malfunctionData={props.malfunctionData}
              />
            </CardBody>
          </Card>
        </Col>
      : null}
    </Row>
  )
}

export default ApplicationSettings
