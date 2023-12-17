import IService from "../../../../@shared/domain/service/service.interface";
import bcrypt from 'bcrypt'
import {PASSWORD_HASH_SALT_ROUNDS} from '../../../../env'
import InvalidParamError from "../../../../@shared/domain/errors/invalid-param.error";

export default class HashUserPasswordService implements IService {
  run(password: string): Promise<string> {
    if (password.length === 0) {
      throw new InvalidParamError('password')
    }

    return bcrypt.hash(password, parseInt(PASSWORD_HASH_SALT_ROUNDS))
  }
}