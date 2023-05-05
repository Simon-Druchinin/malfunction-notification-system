import { Ability } from '@casl/ability'
import { initialAbility } from './initialAbility'

import useJwt, { JwtToken } from '@/auth/jwt/useJwt'
import jwt_decode from "jwt-decode"

export interface IAbility {
    action: string,
    subject: string
}

const { getToken } = useJwt()

const token = getToken()
const existingAbility = token ? (jwt_decode(token) as JwtToken).user_data.ability : null

export default new Ability(existingAbility || initialAbility)
