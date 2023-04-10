import { Ability } from '@casl/ability'
import { initialAbility } from './initialAbility'


export interface IAbility {
    action: string,
    subject: string
}


const existingAbility = null

export default new Ability(existingAbility || initialAbility)
