import { useState } from "react"
import { Form, FormGroup, Input, Label } from "reactstrap"

const RoomItemsVisibilityForm = (props: any): JSX.Element => {
    const {
      itemCategories,
      invisibleCategories,
      setInvisibleCategories
    } = props

    const handleCheckboxClick = (itemCategory: string) => {
        if (invisibleCategories.includes(itemCategory)) {
          setInvisibleCategories((prev: string[]) => prev.filter(category => category !== itemCategory))
        }
        else {
          setInvisibleCategories((prev: string[]) => [...prev, itemCategory])
        }
    }

    const renderLayerVisibilityCheckbox = (itemCategory: string): JSX.Element => {
      return (
        <FormGroup key={itemCategory}>
          <Input onClick={() => handleCheckboxClick(itemCategory)} type='checkbox' className='custom-control-Primary' id={itemCategory} defaultChecked />
          <Label className='form-label ps-1' for={itemCategory}>
            {itemCategory}
          </Label>
        </FormGroup>
      )
    }

    return (
      <Form>
        {itemCategories.map((item: any) => item.name).map((itemCategory: string, index: number) => {
          return renderLayerVisibilityCheckbox(itemCategory)
        })}
      </Form>
      
    )
}

export default RoomItemsVisibilityForm
