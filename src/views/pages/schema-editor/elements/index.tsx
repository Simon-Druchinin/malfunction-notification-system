import { Circle, Rect } from "react-konva"


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
