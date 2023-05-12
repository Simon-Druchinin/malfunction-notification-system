import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Badge
} from "reactstrap"

import RoomSizeForm from './RoomSizeForm'
import RoomItemsAccordion from './RoomItemsAccordion'
import RoomItemsVisibilityForm from './RoomItemsVisibilityForm'


const RoomSettings = (props: any): JSX.Element => {
  return (
    <Row className="match-height">
      <Col md='4'>
        <Card className="settings-card">
          <CardHeader>
            <Badge color="success">Размеры комнаты</Badge>
          </CardHeader>
          <CardBody>
            <RoomSizeForm
              roomSize={props.roomSize}
              setRoomSize={props.setRoomSize}
            />
          </CardBody>
        </Card>
      </Col >
      <Col md='4'>
        <Card className="settings-card elements-card">
          <CardHeader>
            <Badge color="success">Элементы</Badge>
          </CardHeader>
          <CardBody>
            <RoomItemsAccordion
              setCanvasItems={props.setCanvasItems}
              itemCategories={props.itemCategories}
              setItemCategories={props.setItemCategories}
            />
          </CardBody>
        </Card>
      </Col>
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
    </Row>
  )
}

export default RoomSettings
