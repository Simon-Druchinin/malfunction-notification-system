import { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, Badge, Input, Label, Form } from "reactstrap"

const ElementApplicationCard = (props: any): JSX.Element => {
  const { activeElement, canvasItems, setCanvasItems, mode } = props
  const [problem_text, setProblemText] = useState<string>('')

  const handleElementProblemText = (e: any) => {
    const result = canvasItems.map((item: any) => item.key === activeElement.key ? {...item, problem_text: e.target.value} : {...item})   
    setCanvasItems(result)
    setProblemText(e.target.value)
  }

  useEffect(() => {
    setProblemText(activeElement?.problem_text ? activeElement.problem_text : '')
  }, [activeElement])

  if (!activeElement?.name) return <></>
  
  return (
    <Card className="element-info__card">
      <CardHeader>
        <Badge className="fs-6" color='info'>
          {activeElement.name}
        </Badge>
      </CardHeader>
      <CardBody className="d-flex justify-content-center">
        <Form>
        <Label for={'element-problem-text-area'}>Описание проблемы:</Label>
        <Input
          value={problem_text}
          readOnly={mode === 'applicationView'}
          onChange={handleElementProblemText}
          id={'element-problem-text-area'}
          name={'element-problem-text-area'}
          type="textarea"
        />
        </Form>
      </CardBody>
    </Card>
  )
}

export default ElementApplicationCard
