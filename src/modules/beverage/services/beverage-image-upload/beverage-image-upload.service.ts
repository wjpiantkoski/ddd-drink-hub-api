import IService from "../../../../@shared/domain/service/service.interface";
import path from 'path'
import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import InvalidParamError from "../../../../@shared/domain/errors/invalid-param.error";

export default class BeverageImageUploadService implements IService {
  async run(input: any): Promise<string> {
    if (!/image/.test(input.mimetype)) {
      throw new InvalidParamError('input')
    }

    const fileType = input.mimetype.split(/\//)[1]
    const filename = `${uuidv4()}.${fileType}`
    const fullPath = path.join(__dirname, '../../../../infra/images', filename)

    await fs.writeFileSync(fullPath, input.data)

    return filename
  }
}