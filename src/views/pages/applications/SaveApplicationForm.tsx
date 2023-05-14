import { useEffect, useState } from "react"
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { getErrorMessageText } from '@/utility/utils'

import classnames from 'classnames'
import useJwt from "@/auth/jwt/useJwt"

import { Trash } from "react-feather"

const SaveApplicationForm = (props: any) => {
  const { canvasItems, roomSize, selectedRoom, mode, malfunctionData } = props

  const [modal, setModal] = useState(false)

  type FormValues = {
    name: string;
    problem_text: string;
  }

  const { formState: { errors }, handleSubmit, control, setValue } = useForm<FormValues>()

  const { projectInstance } = useJwt()

  const handleModal = () =>{
    setModal(!modal)
  }

  const handleReload = () => {
    window.location.reload()
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!selectedRoom) return

    const problemData = {
      name: data.name,
      problem_text: data.problem_text,
      room_schema: selectedRoom.value,
    }
    const applicationResponse = await projectInstance.post('/api/v1/schemas/create-problem/', problemData)
    
    const problem_elements = canvasItems
    .filter((item: any) => item?.problem_text?.length > 0)
    .map((item: any) => {
      return {
        problem_text: item.problem_text,
        room_element: item.id,
        malfunction_report: applicationResponse.data.id
      }
    })
    
    if(problem_elements?.length > 0) {
      const problemElementsResponse = await projectInstance.post('/api/v1/schemas/create-problem-items/', problem_elements)
    }

    handleReload()
  }

  return (
    <>
    <Button className='text-white px-4 py-2' color='primary' onClick={handleModal}>
      {mode === 'applicationView' ? 'Просмотр заявки' : 'Создать заявку'}
    </Button>
    <Modal isOpen={modal} toggle={handleModal}>
        <ModalHeader>
         {mode === 'applicationView' ? 'Просмотр заявки' : 'Создать заявку'}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label className='form-label' for='name'>
                Тема заявки
              </Label>
              <Controller
                render={
                  ({ field }) =>
                  <Input
                    autoFocus
                    readOnly={mode === 'applicationView'}
                    placeholder="Неисправности..."
                    className={classnames('input-group-merge', { 'is-invalid': errors['name'] })}
                    {...field}
                  />
                }
                defaultValue={mode === 'applicationView' ? malfunctionData?.name : ''}
                control={control}
                name='name'
                rules={{ required: {value: true, message: getErrorMessageText('required')} }}
              />
              {errors?.name && <FormFeedback>{errors.name.message}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label className='form-label' for='problem_text'>
                Общее описание
              </Label>
              <Controller
                render={
                  ({ field }) =>
                  <Input
                    type="textarea"
                    readOnly={mode === 'applicationView'}
                    placeholder="В кабинете не работает..."
                    className={classnames('input-group-merge', { 'is-invalid': errors['problem_text'] })}
                    {...field}
                  />
                }          
                defaultValue={mode === 'applicationView' ? malfunctionData?.problem_text : ''} 
                control={control}
                name='problem_text'
                rules={{ required: {value: true, message: getErrorMessageText('required')} }}
              />
              {errors?.problem_text && <FormFeedback>{errors.problem_text.message}</FormFeedback>}
            </FormGroup>
            {mode !== 'applicationView' ? 
            <Button className='text-white' type='submit' color='primary' block>
              Сохранить
            </Button>
            : null}
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default SaveApplicationForm
