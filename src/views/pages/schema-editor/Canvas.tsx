import { useState, useRef } from "react"
import { Stage, Layer, Rect, Group, Shape } from "react-konva"
import { Html } from 'react-konva-utils'
import * as Elements from './elements'
import { Card, CardHeader, CardBody } from "reactstrap"

const CELL_WIDTH = 50
const CELL_HEIGHT = 50


const Canvas = (props: any) => {
  const { 
    width, 
    height, 
    mode, 
    roomSize, 
    canvasItems, 
    setCanvasItems, 
    itemCategories,
    invisibleCategories,
    activeElement,
    setActiveElement
  } = props

  const stageRef = useRef(null)

  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const [stageScale, setStageScale] = useState({ x: 0.9, y: 0.9 })
  const [stageScalePosition, setStageScalePosition] = useState({ x: 0, y: 0 })

  const startX = -stagePos.x - width
  const endX = -stagePos.x + width * 2

  const startY = -stagePos.y - height
  const endY = -stagePos.y + height * 2

  const gridComponents = []

  const scaleBy = 1.2

  const draggable: boolean = mode === 'edit' ? true : false

  const handleScale = (e: any) => {
    e.evt.preventDefault()
    
    const stage = stageRef.current as any
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    let direction = e.evt.deltaY > 0 ? 1 : -1

    if (e.evt.ctrlKey) {
      direction = -direction
    }

    let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy
    newScale = newScale > 1.5 ? Math.min(newScale, 1.5) : Math.max(newScale, 0.5)

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }

    setStageScale({ x: newScale, y: newScale })
    setStageScalePosition(newPos)
  }

  for (let x = startX; x < endX; x += CELL_WIDTH) {
    for (let y = startY; y < endY; y += CELL_HEIGHT) {
      gridComponents.push(
        <Rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={CELL_WIDTH}
          height={CELL_HEIGHT}
          fill={'#f5f5f5'}
          stroke="black"
          strokeWidth={0.1}
        />
      )
    }
  }

  const handleElementClick = (e: any, item: any) => {
    setActiveElement(item)
  }

  const handleDragEnd = (e: any, key: number) => {
    const result = canvasItems.map((item: any) => item.key === key ? {...item, x: e.target.position().x, y: e.target.position().y} : {...item})   
    setCanvasItems(result)
  }

  const renderElements = (itemCategory: string): JSX.Element => {
    
    return canvasItems.filter((item: any) => item.category.name === itemCategory).map((item: any, index: number) => {
      const Element = Elements[item.type as keyof typeof Elements]

      return (
        <Group
          key={`${item.key}-${index}`}
          x={item.x}
          y={item.y}
          onClick={(e) => handleElementClick(e, item)}
          draggable={draggable}
          onDragMove={(e) => handleDragEnd(e, item.key)}
          onDragEnd={(e) => handleDragEnd(e, item.key)}
        >
          <Element
            stroke={activeElement?.key === item.key ? 'red' : 'gray'}
            strokeWidth={activeElement?.key === item.key ? 3 : 2}
          />
        </Group >
      )
    })
  }

  return (
    <Stage
      ref={stageRef}
      scale={stageScale}
      position={stageScalePosition}
      x={stagePos.x}
      y={stagePos.y}
      width={width - 32}
      height={height}
      draggable
      onWheel={handleScale}
      onDragEnd={e => {
        setStagePos(e.currentTarget.position())
      }}
    >
      <Layer name="backgroundLayer">{gridComponents}</Layer>
      <Layer name="roomCascadeLayer">
        <Group>
          <Shape
              sceneFunc={(context, shape) => {
                context.beginPath()
                context.moveTo(0, 0)

                context.lineTo(roomSize.length, 0) 
                context.lineTo(roomSize.length, roomSize.width)
                context.lineTo(0, roomSize.width)
                
                context.closePath()
                context.fillStrokeShape(shape)
              }}
              x={150}
              y={50}
              fill="transparent"
              stroke={'gray'}
              strokeWidth={4}
          />
        </Group>
      </Layer>
      <Layer name={'itemsLayer'} key={'itemsLayer'}>
      {itemCategories.map((itemCategory: any, index: number) => {
        if (invisibleCategories.includes(itemCategory.name)) return

        return (
          <Group
            key={itemCategory.name}            
          >
            {renderElements(itemCategory.name)}
          </Group>
        )
      })}
      </Layer>
      <Layer name="infoLayer">
        <Group
          x={width}
          y={10}
        >
        </Group>
      </Layer>
    </Stage>
  )
}

export default Canvas 
