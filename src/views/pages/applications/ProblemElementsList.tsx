import { Trash2 } from "react-feather"
import { Row, Col, Badge, Button } from "reactstrap"


const ProblemElementsList = (props: any): JSX.Element => {
  const { invisibleCategories, canvasItems, setActiveElement } = props
  
  return (
    canvasItems
    .filter((item: any) => !invisibleCategories.includes(item.category.name))
    .filter((item: any) => item?.problem_text?.length > 0)
    .map((item: any) => {
      return (
        <Col style={{cursor: 'pointer'}} className="mb-1" key={item.key} onClick={() => setActiveElement(item)}>
          <div>
            <Badge color="warning">
              {item.name}
            </Badge>
            <p>{item.problem_text}</p>
          </div>
        </Col>
      )
    })
  )
}


export default ProblemElementsList
