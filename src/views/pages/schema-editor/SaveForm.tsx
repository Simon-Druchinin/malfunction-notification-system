import { useEffect, useState } from "react"
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { getErrorMessageText } from '@/utility/utils'

import classnames from 'classnames'
import useJwt from "@/auth/jwt/useJwt"

import { defaultSelectOption } from './SchemaSelect'
import { Trash } from "react-feather"

const SaveForm = (props: any) => {
  const { canvasItems, roomSize, selectedRoom } = props

  const [modal, setModal] = useState(false)

  type FormValues = {
    name: string;
  }

  const { formState: { errors }, handleSubmit, control, setValue } = useForm<FormValues>()

  const { projectInstance } = useJwt()

  const handleModal = () =>{
    setModal(!modal)
  }

  useEffect(() => {
    if (selectedRoom.label === defaultSelectOption.label) return setValue('name', '')

    setValue('name', selectedRoom.label)
  }, [selectedRoom])

  const handleReload = () => {
    window.location.reload()
  }

  const deleteSchema = async () => {
    const deleteResponse = await projectInstance.delete(`/api/v1/schemas/room-schemas/${selectedRoom.value}/`)
    handleReload()
  }


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (canvasItems.length === 0 || roomSize.width <= 0 || roomSize.length <= 0) return

    const isNewSchema = selectedRoom.value === 'newSchema'
    let newRoomResponse: any

    if (isNewSchema) {
      const newRoomData = {
        name: data.name,
        ...roomSize,
      }
      newRoomResponse = await projectInstance.post('/api/v1/schemas/room-schemas/create/', newRoomData)
    }
    
    const newItems = canvasItems.filter((item: any) => item.id === undefined).map((item: any) => {
      item.room_schema = isNewSchema ? newRoomResponse.data.id : selectedRoom.value
      item.item = item.itemID

      return item
    })

    const roomData = {
      name: data.name,
      ...roomSize,
      items: canvasItems.filter((item: any) => item.id !== undefined)
    }

    if (!isNewSchema) {
      const updateResponse = await projectInstance.put(`/api/v1/schemas/room-schemas/${selectedRoom.value}/`, roomData)
    }

    if (newItems.length) {
      const newCreatedElementsResponse = await projectInstance.post(`/api/v1/schemas/room-item/`, newItems)
    }

    handleReload()
  }

  return (
    <>
    <Button className='text-white px-4 py-2' color='primary' onClick={handleModal}>
      Сохранить изменения
    </Button>
    <Modal isOpen={modal} toggle={handleModal}>
        <ModalHeader>Сохранить изменения</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
                <Label className='form-label' for='name'>
                  Название комнаты
                </Label>
                <Controller
                  render={
                    ({ field }) =>
                    <Input
                      autoFocus
                      placeholder="Кабинет №..."
                      className={classnames('input-group-merge', { 'is-invalid': errors['name'] })}
                      {...field}
                    />
                  }          
                  defaultValue={''} 
                  control={control}
                  name='name'
                  rules={{ required: {value: true, message: getErrorMessageText('required')} }}
                />
                {errors?.name && <FormFeedback>{errors.name.message}</FormFeedback>}
              </FormGroup>
              <Button className='text-white' type='submit' color='primary' block>
                Сохранить
              </Button>
              {selectedRoom.value !== 'newSchema' ?
                <Button className='mt-3' color='danger' block outline onClick={deleteSchema}>
                  <Trash className="me-1"/> Удалить
                </Button>
              : null}
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default SaveForm
