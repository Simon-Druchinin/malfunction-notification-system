import { useState, useEffect, useRef } from "react"
import { Row , Col, Card, CardBody, CardHeader, Badge } from "reactstrap"

import { Settings, Edit } from 'react-feather'

import Canvas from './Canvas'
import RoomSettings from './RoomSettings'

const WIDTH = 50;
const HEIGHT = 50;


const SchemaEditor = (): JSX.Element => {
  const cardBodyRef: any = useRef(null)
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [roomSize, setRoomSize] = useState<{width: number | string, length: number | string}>({width: '', length: ''})

  useEffect(() => {
    if (!cardBodyRef?.current) return
    setCanvasWidth(cardBodyRef.current.offsetWidth)

    window.addEventListener('resize', () => setCanvasWidth(cardBodyRef.current.offsetWidth))

    return () => window.removeEventListener('resize', () => setCanvasWidth(cardBodyRef.current.offsetWidth))
  }, [])
  
  return (
    <div id='schema-editor'>
      <Row className='match-height'>
        <Col>
          <Card>
              <CardHeader>
                <Badge color='primary'>
                  <Settings /> Настройки редактора
                </Badge>
              </CardHeader>
              <CardBody>
                <RoomSettings
                  roomSize={roomSize}
                  setRoomSize={setRoomSize}
                />
              </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='match-height'>
        <Col>
          <Card>
            <CardHeader>
              <Badge className="fs-6 bg-gradient" color="primary">
                <Edit /> Редактор комнат
              </Badge>
            </CardHeader>
            <CardBody className="overflow-hidden" innerRef={cardBodyRef}>
              <Canvas
                width={canvasWidth}
                height={400}
                mode={'edit'}
                roomSize={roomSize}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SchemaEditor
