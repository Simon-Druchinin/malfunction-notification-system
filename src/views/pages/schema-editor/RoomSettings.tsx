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


const RoomSettings = (props: any): JSX.Element => {
  return (
    <Row className='match-height'>
      <Col md='4'>
        <Card className="shadow-lg p-3 mb-5 bg-body rounded">
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
        <Card className="shadow-lg p-3 mb-5 bg-body rounded">
          <CardHeader>
            <Badge color="success">Элементы</Badge>
          </CardHeader>
          <CardBody>
            <RoomItemsAccordion />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default RoomSettings
