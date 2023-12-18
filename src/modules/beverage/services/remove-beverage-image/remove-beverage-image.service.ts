import IService from "../../../../@shared/domain/service/service.interface";
import path from 'path'
import fs from 'fs'

export default class RemoveBeverageImageService implements IService {
  async run(input: string): Promise<void> {
    const fullPath = path.join(__dirname, '../../../../infra/images', input)
    await fs.rmSync(fullPath)
  }  
}