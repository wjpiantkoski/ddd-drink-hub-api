import CreateImageUploadFolderService from "./create-image-upload-folder.service"
import path from 'path'
import fs from 'fs'

describe('CreateImageUploadFolderService', () => {

  const folderPath = path.join(__dirname, '../../../../infra/images')

  afterEach(async () => {
    await fs.rmdirSync(folderPath)
  })

  it('should create image upload folder', async () => {
    const service = new CreateImageUploadFolderService()
    
    await service.run(folderPath)
    
    const folderCreated = await fs.existsSync(folderPath)

    expect(folderCreated).toEqual(true)
  })
})