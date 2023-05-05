import useJwt from '@/auth/jwt/useJwt'
import { useLocation } from 'react-router'

const { getToken } = useJwt()

// ** Checks if an object is empty
export const isObjEmpty = (obj: any): boolean => Object.keys(obj).length === 0

export const isUserLoggedIn = (): boolean => getToken() !== null

export const getErrorMessageText = (ruleName: string, ruleValue?: any): string => {
  const errorMessagesList = {
    maxLength: `Превышен лимит символов (${ruleValue})`,
    minLength: `Минимальное количество символов (${ruleValue})`,
    required: 'Это обязательное поле',
    passwordsMatch: 'Пароли должны совпадать',
    email: 'Email введён некорректно'
  }

  const errorMessage = errorMessagesList[ruleName as keyof typeof errorMessagesList]

  return errorMessage ? errorMessage : ''
}

export const getHomeRouteForLoggedInUser = (userRole: string): string => {
  return '/home'
}
