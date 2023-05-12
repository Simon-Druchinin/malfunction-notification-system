import { Card, CardHeader, CardBody, Badge, Button } from "reactstrap"
import { Trash2 } from "react-feather"

const ElementInfoCard = (props: any): JSX.Element => {
  const { activeElement, setCanvasItems, setActiveElement } = props

  const handleDelete = () => {
    setCanvasItems((prev: any[]) => prev.filter((item: any) => item.key !== activeElement.key))
    setActiveElement(null)
  }

  if (!activeElement?.name) return <></>

  return (
    <Card className="element-info__card">
      <CardHeader>
        <Badge className="fs-6" color='info'>
          {activeElement?.name}
        </Badge>
      </CardHeader>
      <CardBody className="d-flex justify-content-center">
        <Button color='danger' onClick={handleDelete} outline>
          <Trash2 size={14}  />
        </Button>
      </CardBody>
    </Card>
  )
}

export default ElementInfoCard
