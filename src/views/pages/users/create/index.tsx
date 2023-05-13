import { useState, useEffect } from "react"
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Select from 'react-select'

import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap"
import { UserPlus } from "react-feather"

import classnames from 'classnames'
import useJwt from "@/auth/jwt/useJwt"
import { getErrorMessageText } from "@/utility/utils"
import InputPasswordToggle from "@/views/components/input-password-toggle"


const UserCreator = (): JSX.Element => {
  const [groups, setGroups] = useState()
  const [userCreated, setUserCreated] = useState<boolean>(false)

  type FormValues = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    retypePassword: string;
    group_id: {value: number, label: string} | null;
  };

  const { formState: { errors }, handleSubmit, control, getValues, reset, setError } = useForm<FormValues>()

  const { projectInstance } = useJwt()

  useEffect(() => {
    projectInstance.get('/api/v1/users/groups/')
      .then((response: any) => {
        setGroups(
          response.data.map((group: any) => {
            return {value: group.id, label: group.name}
          })
        )
      })
  }, [])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // @ts-ignore
    data.group_id = data.group_id.value

    let userCreateResponse
    try {
      userCreateResponse = await projectInstance.post('/api/v1/users/create/', data)
      reset()
      setUserCreated(true)
      setTimeout(() => {
        setUserCreated(false)
      }, 3000)
    } catch (error: any) {
      setError('email', {message: 'Данный email уже занят'})
    }
  }

  return (
    <Col>
      <Card>
        <CardHeader>
          <Badge className="fs-6" color="primary">
            <UserPlus className="me-1" /> Добавить Пользователя
          </Badge>
        </CardHeader>
        <CardBody>
        {userCreated ? (
              <Alert color='success'>
                <div className='alert-body font-small-2'>
                  <small className='me-50'>
                    Пользователь был успешно добавлен.
                  </small>
                </div>
              </Alert>
            ) : null}
          <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6'>
                <FormGroup>
                  <Label className='form-label' for='email'>
                    Email
                  </Label>
                  <Controller
                    render={
                      ({ field }) =>
                      <Input
                        autoFocus
                        type="email"
                        placeholder='ivan@mail.ru'
                        className={classnames('input-group-merge', { 'is-invalid': errors['email'] })}
                        {...field}
                        ref={null}
                      />
                    }          
                    defaultValue='' 
                    control={control}
                    name='email'
                    rules={{ required: {value: true, message: getErrorMessageText('required')} }}
                  />
                  {errors?.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label className='form-label' for='group_id'>
                    Группа
                  </Label>
                  <Controller
                    render={
                      ({ field }) =>
                      <Select
                        classNamePrefix='select'
                        options={groups}
                        placeholder={'Группа'}
                        isClearable
                        noOptionsMessage={() => 'Пусто'}
                        className={classnames('react-select input-group-merge', { 'is-invalid': errors['group_id'] })}
                        {...field}
                        ref={null}
                      />
                    }
                    defaultValue={null}
                    control={control}
                    name='group_id'
                    rules={{ required: {value: true, message: getErrorMessageText('required')} }}
                  />
                  {errors?.group_id && <FormFeedback>{errors.group_id.message}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <FormGroup>
                  <Label className='form-label' for='first_name'>
                    Имя
                  </Label>
                  <Controller
                    render={
                      ({ field }) =>
                      <Input
                        autoFocus
                        placeholder='Иван'
                        className={classnames('input-group-merge', { 'is-invalid': errors['first_name'] })}
                        {...field}
                        ref={null}
                      />
                    }          
                    defaultValue='' 
                    control={control}
                    name='first_name'
                    rules={{ required: {value: true, message: getErrorMessageText('required')} }}
                  />
                  {errors?.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label className='form-label' for='last_name'>
                    Фамилия
                  </Label>
                  <Controller
                    render={
                      ({ field }) =>
                      <Input
                        autoFocus
                        placeholder='Иванов'
                        className={classnames('input-group-merge', { 'is-invalid': errors['last_name'] })}
                        {...field}
                        ref={null}
                      />
                    }          
                    defaultValue='' 
                    control={control}
                    name='last_name'
                    rules={{ required: {value: true, message: getErrorMessageText('required')} }}
                  />
                  {errors?.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <FormGroup>
                  <div className='d-flex justify-content-between'>
                    <Label className='form-label' for='login-password'>
                      Пароль
                    </Label>
                  </div>
                  <Controller
                    render={
                      ({ field }) =>
                      <InputPasswordToggle
                        className={classnames('input-group-merge', { 'is-invalid': errors['password'] })}
                        {...field}
                        ref={null}
                      />
                    }
                    defaultValue=''
                    control={control}
                    name="password"
                    rules={{ required: {value: true, message: getErrorMessageText('required')} }}
                  />
                  {errors?.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <div className='d-flex justify-content-between'>
                    <Label className='form-label' for='retypePassword'>
                      Подтвеждение пароля
                    </Label>
                  </div>
                  <Controller
                    render={
                      ({ field }) =>
                      <InputPasswordToggle
                        className={classnames('input-group-merge', { 'is-invalid': errors['retypePassword'] })}
                        {...field}
                        ref={null}
                      />
                    }
                    defaultValue=''
                    control={control}
                    name="retypePassword"
                    rules={{
                      required: {value: true, message: getErrorMessageText('required')},
                      validate: value => value === getValues('password') || getErrorMessageText('passwordsMatch')
                    }}
                  />
                  {errors?.retypePassword && <FormFeedback>{errors.retypePassword.message}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Button className='text-white' type='submit' color='primary'>
              Добавить
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default UserCreator
