import IService from "../../../../@shared/domain/service/service.interface";
import fs from 'fs'
import path from 'path'

export default class CreateImageUploadFolderService implements IService {
  async run(): Promise<void> {
    const folderPath = path.join(__dirname, '../../../../infra/images')
    const folderCreated = await fs.existsSync(folderPath)

    if (!folderCreated) {
      await fs.mkdirSync(folderPath)
    }
  }
}