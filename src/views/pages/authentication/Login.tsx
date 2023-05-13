import { useState, useContext } from 'react'
import classnames from 'classnames'
import useJwt, { userData, JwtToken} from '@/auth/jwt/useJwt'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { AbilityContext } from '@/utility/context/Can'
import { Link, useNavigate } from 'react-router-dom'
import InputPasswordToggle from '@/views/components/input-password-toggle'
import { getErrorMessageText, getHomeRouteForLoggedInUser } from '@/utility/utils'
import jwt_decode from "jwt-decode"
import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  FormFeedback,
  Tooltip
} from 'reactstrap'

// ** Configs
import themeConfig from '@/configs/themeConfig'

import '@/assets/scss/base/pages/page-auth.scss'

const Login = (): JSX.Element => {
  const ability = useContext(AbilityContext)
  const { login,setToken, setRefreshToken } = useJwt()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  
  type FormValues = {
    email: string;
    password: string;
  };

  const { formState: { errors }, handleSubmit, control, setValue } = useForm<FormValues>()
  
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    login(data)
      .then((response: any) => {
        const data = response.data
        const decoded_token: JwtToken = jwt_decode(data.access)
        const userData: userData = decoded_token?.user_data
        setToken(data.access)
        setRefreshToken(data.refresh)
        ability.update(userData.ability)
        navigate(getHomeRouteForLoggedInUser(''))
      })
      .catch((error: any) => setError(true))
  }

  const setEmailAndPassword = (email: string, password: string) => {
    setValue('email', email)
    setValue('password', password)
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='d-flex align-items-center auth-bg px-2 py-2 p-lg-5' lg='4' sm='12'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <span><img src={themeConfig.app.appLogoImage} alt='logo' /></span>
              <div className='brand-container'>
                <h2 className='brand-text text-primary'>{themeConfig.app.appName}</h2>
                <h5 className='brand-subscription'>Система оповещения о неисправностях</h5>
              </div>
            </Link>
            <Alert id='dev-login-only' color='danger'>
              <div className='alert-body' style={{fontSize: '15px'}}>
                <small className='me-50'>
                  <div style={{cursor: 'pointer'}} onClick={() => setEmailAndPassword('prepod@mail.ru', '1234')}>Преподаватель: prepod@mail.ru | 1234</div>                  
                  <div style={{cursor: 'pointer'}} onClick={() => setEmailAndPassword('admin@mail.ru', '1234')}>Администратор: admin@mail.ru | 1234</div>
                  <div style={{cursor: 'pointer'}} onClick={() => setEmailAndPassword('zavhoz@mail.ru', '1234')}>Завхоз: zavhoz@mail.ru | 1234</div>
                </small>
              </div>
              <Tooltip
                placement='top'
                isOpen={tooltipOpen}
                target='dev-login-only'
                toggle={() => setTooltipOpen(!tooltipOpen)}
              >
                Только для демонстрации
              </Tooltip>
            </Alert>
            <CardTitle tag='h4' className='font-weight-bold mb-1 gradient-text'>
              Вход в личный кабинет
            </CardTitle>
            {error ? (
              <Alert color='danger'>
                <div className='alert-body font-small-2'>
                  <small className='me-50'>
                    Неверно указаны логин или пароль
                  </small>
                </div>
              </Alert>
            ) : null}
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='email'>
                  Электронная почта
                </Label>
                <Controller
                  render={
                    ({ field }) =>
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
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
                {errors?.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </FormGroup>
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
              <FormGroup>
                <Input type='checkbox' className='custom-control-Primary' id='dont-remember-me' />
                <Label className='form-label ps-1' for='dont-remember-me'>
                  Чужой компьютер
                </Label>
              </FormGroup>
              <Button className='text-white' type='submit' color='primary' block>
                Войти
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
