import { useState, useEffect } from 'react'
import useJwt from '@/auth/jwt/useJwt'

import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap"

const RoomItemsAccordion = () => {
  const [itemTypes, setItemTypes] = useState([])
  const { projectInstance } = useJwt()

  useEffect(() => {
    projectInstance.get('/api/v1/schemas/item-categories/')
      .then((response: any) => {
        setItemTypes(
          response.data.map((item: any) => item.name)
        )
      })
      .catch((error: any) => console.log(error))
  }, [])

  const renderItems = (): JSX.Element => {
    return (
      <>
        {itemTypes.map((itemType: string, index: number) => {
          return(
            <AccordionItem key={itemType}>
              <AccordionHeader targetId={index.toString()}>
                {itemType}
              </AccordionHeader>
              <AccordionBody accordionId={index.toString()}>
                AccordionBody
              </AccordionBody>
            </AccordionItem>
          )
        })}
      </>
    )
  }

  return (
    <UncontrolledAccordion>
      {renderItems()}
    </UncontrolledAccordion>
  )
}

export default RoomItemsAccordion
