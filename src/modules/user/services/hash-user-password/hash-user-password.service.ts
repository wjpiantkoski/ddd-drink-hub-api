import IService from "../../../../@shared/domain/service/service.interface";
import bcrypt from 'bcrypt'
import {PASSWORD_HASH_SALT_ROUNDS} from '../../../../env'

export default class HashUserPasswordService implements IService {
  run(password: string): Promise<string> {
    return bcrypt.hash(password, parseInt(PASSWORD_HASH_SALT_ROUNDS))
  }
}