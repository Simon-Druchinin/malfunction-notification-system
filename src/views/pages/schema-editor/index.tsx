import { useState, useEffect, useRef } from "react"
import { Row , Col, Card, CardBody, CardHeader, Badge } from "reactstrap"

import { Settings, Edit } from 'react-feather'

import Canvas from './Canvas'
import SaveForm from './SaveForm'
import SchemaSelect, { defaultSelectOption, selectRoomValue } from './SchemaSelect'
import RoomSettings from './RoomSettings'
import ElementInfoCard from "./ElementInfoCard"


const SchemaEditor = (): JSX.Element => {
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [canvasItems, setCanvasItems] = useState([])
  const [itemCategories, setItemCategories] = useState([])
  const [activeElement, setActiveElement] = useState<any>(null)
  const [invisibleCategories, setInvisibleCategories] = useState([])
  const [roomSize, setRoomSize] = useState<{width: number | string, length: number | string}>({width: '', length: ''})

  const [selectedRoom, setSelectedRoom] = useState<selectRoomValue>(defaultSelectOption)

  const cardBodyRef: any = useRef(null)

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
                <Badge className="fs-6 bg-gradient" color='primary'>
                  <Settings /> Настройки редактора
                </Badge>
              </CardHeader>
              <CardBody>
                <RoomSettings
                  roomSize={roomSize}
                  setRoomSize={setRoomSize}
                  setCanvasItems={setCanvasItems}
                  itemCategories={itemCategories}
                  setItemCategories={setItemCategories}
                  invisibleCategories={invisibleCategories}
                  setInvisibleCategories={setInvisibleCategories}
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
                <Edit /> Редактор комнат
              </Badge>
              <SchemaSelect 
                className={'mb-2 mb-md-0'}
                setCanvasItems={setCanvasItems}
                setRoomSize={setRoomSize}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
              <SaveForm
                canvasItems={canvasItems}
                roomSize={roomSize}
                selectedRoom={selectedRoom}
              />
              <ElementInfoCard
                activeElement={activeElement}
                setCanvasItems={setCanvasItems}
                setActiveElement={setActiveElement}
              />
            </CardHeader>
            <CardBody className="overflow-hidden" innerRef={cardBodyRef}>
              <Canvas
                width={canvasWidth}
                height={400}
                mode={'edit'}
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

export default SchemaEditor
