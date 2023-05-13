import { useState, useEffect, useRef } from "react"
import { Row , Col, Card, CardBody, CardHeader, Badge } from "reactstrap"

import { Edit, Eye } from 'react-feather'

import Canvas from '../schema-editor/Canvas'
import SaveApplicationForm from './SaveApplicationForm'
import SchemaSelect, { selectRoomValue } from '../schema-editor/SchemaSelect'
import ApplicationSettings from './ApplicationSettings'
import ElementApplicationCard from "./ElementApplicationCard"
import useJwt from "@/auth/jwt/useJwt"


const ApplicationEditor = (): JSX.Element => {
  const mode = 'view'

  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [canvasItems, setCanvasItems] = useState([])
  const [itemCategories, setItemCategories] = useState([])
  const [activeElement, setActiveElement] = useState<any>(null)
  const [invisibleCategories, setInvisibleCategories] = useState([])
  const [roomSize, setRoomSize] = useState<{width: number | string, length: number | string}>({width: '', length: ''})

  const [selectedRoom, setSelectedRoom] = useState<selectRoomValue>()

  const cardBodyRef: any = useRef(null)

  const { projectInstance } = useJwt()

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
                  canvasItems={canvasItems}
                  itemCategories={itemCategories}
                  invisibleCategories={invisibleCategories}
                  setInvisibleCategories={setInvisibleCategories}
                  setActiveElement={setActiveElement}
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
              <SchemaSelect 
                className={'mb-2 mb-md-0'}
                setCanvasItems={setCanvasItems}
                setRoomSize={setRoomSize}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                setActiveElement={setActiveElement}
              />
              <SaveApplicationForm
                canvasItems={canvasItems}
                selectedRoom={selectedRoom}
              />
              <ElementApplicationCard
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
