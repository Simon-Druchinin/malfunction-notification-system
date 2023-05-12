import { useState, useEffect } from 'react'
import useJwt from '@/auth/jwt/useJwt'
import deepcopy from 'deepcopy'

import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Badge } from "reactstrap"

const RoomItemsAccordion = (props: any) => {
  const { itemCategories, setItemCategories, setCanvasItems } = props

  const [items, setItems] = useState([])
  const [open, setOpen] = useState<string>('')

  const toggle = (id: string) => {
    if (open === id) setOpen('')
    else setOpen(id)
  }

  const { projectInstance } = useJwt()

  useEffect(() => {
    projectInstance.get('/api/v1/schemas/item-categories/')
      .then((response: any) => {
        setItemCategories(response.data)
      })
      .catch((error: any) => console.log(error))
  }, [])

  useEffect(() => {
    projectInstance.get('/api/v1/schemas/items/')
      .then((response: any) => {
        setItems(response.data)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const addItemToCanvas = (item: any) => {
    const canvasItem = deepcopy(item)

    setCanvasItems((prev: any) => {
      canvasItem.x = 200
      canvasItem.y = 200
      canvasItem.key = prev.length + 1
      canvasItem.itemID = item.id
      delete canvasItem.id

      return [...prev, canvasItem]
    })
  }

  const renderItems = (): JSX.Element => {
    return (
      <>
        {itemCategories.map((item: any) => item.name).map((itemCategory: string, index: number) => {
          return(
            <AccordionItem key={itemCategory}>
              <AccordionHeader targetId={index.toString()}>
                {itemCategory}
              </AccordionHeader>
              <AccordionBody accordionId={index.toString()}>
                {items.map((item: any, index: number) => {
                  if (item.category.name !== itemCategory) return
                  return (
                    <Badge key={item.id} className='me-1 element-name' onClick={() => addItemToCanvas(item)}>
                      {item.name}
                    </Badge>
                  )
                })}
              </AccordionBody>
            </AccordionItem>
          )
        })}
      </>
    )
  }

  return (
    // @ts-ignore
    <Accordion open={open} toggle={toggle}>
      {renderItems()}
    </Accordion>
  )
}

export default RoomItemsAccordion
