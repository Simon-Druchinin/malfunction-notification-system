import { Circle, Rect, Group, Line, RegularPolygon, Arrow } from "react-konva"


export const Lamp = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Circle
      radius={10}
      fill={"#ffff66"}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  )
}

export const Table = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Rect
      width={150}
      height={50}
      fill={"#966f33"}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  )
}

export const Conditioner = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Group>
      <Rect
        width={100}
        height={100}
        cornerRadius={15}
        fill={'#a69090'}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Line
        points={[10, 10, 90, 90]}
        stroke={'#544f4f'}
        tension={1}
      />
      <Line
        points={[90, 10, 10, 90]}
        stroke={'#544f4f'}
        tension={1}
      />
    </Group>
  )
}

export const Socket = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Rect
      width={10}
      height={10}
      cornerRadius={1}
      fill={'#a69090'}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  )
}

export const Chair = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Group>
      <Line
        points={[0, 0, 20, -20, 40, 0]}
        stroke={'#e2b681'}
        tension={1}
      />
      <Rect
        width={40}
        height={40}
        cornerRadius={2}
        fill={'#e2b681'}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </Group>
  )
}

export const Monitor = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Group>
      <Rect
        width={10}
        height={30}
        cornerRadius={2}
        fill={'#3b38d1'}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Rect
        width={5}
        height={30}
        cornerRadius={2}
        fill={'#544f4f'}
      />
    </Group>
  )
}

export const SystemUnit = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Group>
      <Rect
        width={20}
        height={40}
        cornerRadius={2}
        fill={'#544f4f'}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Line
        points={[0, 10, 20, 10]}
        stroke={'black'}
        tension={1}
      />
    </Group>
  )
}

export const SwitchBox = (props: any): JSX.Element => {
  const {
    stroke,
    strokeWidth
  } = props

  return (
    <Group> 
      <RegularPolygon
        sides={3}
        radius={20}
        cornerRadius={2}
        fill={'#ffcc00'}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Arrow
        points={[0, -20, 0, -5, -5, 0, 10, 7]}
        stroke={'black'}
        pointerWidth={3}
        pointerLength={5}
      />
    </Group>
  )
}


