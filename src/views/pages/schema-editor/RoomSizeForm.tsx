import {
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"

import classnames from 'classnames'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'

const RoomSizeForm = (props: any) => {
  const {roomSize, setRoomSize} = props

  type FormValues = {
    roomWidth: number;
    roomLength: number;
  };

  const { formState: { errors } } = useForm<FormValues>()

  return (
    <Form className='mt-2'>
      <FormGroup>
        <Label className='form-label' for='roomLength'>
          Длина комнаты (см)
        </Label>
        <Input
          autoFocus
          placeholder='Напр. 1800 см'
          className={classnames('input-group-merge', { 'is-invalid': errors['roomLength'] })}
          value={roomSize.length}
          onChange={e => setRoomSize((prev: any) => {
            return {width: prev.width, length: e.target.value}
          })}
          ref={null}
        />        
      </FormGroup>
      <FormGroup>
        <Label className='form-label' for='roomWidth'>
          Ширина комнаты (см)
        </Label>
        <Input
          autoFocus
          placeholder='Напр. 800 см'
          className={classnames('input-group-merge', { 'is-invalid': errors['roomWidth'] })}
          value={roomSize.width}
          onChange={e => setRoomSize((prev: any) => {
            return {width: e.target.value, length: prev.length}
          })}
          ref={null}
        />
      </FormGroup>
    </Form>
  )
}

export default RoomSizeForm
