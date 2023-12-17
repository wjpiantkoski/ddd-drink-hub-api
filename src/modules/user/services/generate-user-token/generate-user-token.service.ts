import IService from "../../../../@shared/domain/service/service.interface";
import jwt from 'jsonwebtoken'
import {JWT_SECRET, JWT_EXPIRATION_TIME} from '../../../../env'
import validator from "validator";
import InvalidParamError from "../../../../@shared/domain/errors/invalid-param.error";

export interface GenerateUserTokenServiceOutput {
  token: string
}

export default class GenerateUserTokenService implements IService {
  run(userId: string): GenerateUserTokenServiceOutput {
    if (!validator.isUUID(userId)) {
      throw new InvalidParamError('userId')
    }

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME })
    return {token}
  }
}