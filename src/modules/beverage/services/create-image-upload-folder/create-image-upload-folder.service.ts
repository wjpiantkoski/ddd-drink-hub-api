import IService from "../../../../@shared/domain/service/service.interface";
import fs from 'fs'

export default class CreateImageUploadFolderService implements IService {
  async run(folderPath: string): Promise<void> {
    const folderCreated = await fs.existsSync(folderPath)

    if (!folderCreated) {
      await fs.mkdirSync(folderPath)
    }
  }
}