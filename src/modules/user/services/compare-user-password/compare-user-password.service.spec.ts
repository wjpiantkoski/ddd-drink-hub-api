import { Sequelize } from "sequelize-typescript"
import { UserModel } from "../../../../infra/database/sequelize/user/user.model"
import HashUserPasswordService from "../hash-user-password/hash-user-password.service"
import CompareUserPasswordService from "./compare-user-password.service"

describe('CompareUserPasswordService', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ UserModel ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should return true when passwords match', async () => {
    const hashUserPasswordService = new HashUserPasswordService()
    
    const password = 'any-password'
    const hashedPassword = await hashUserPasswordService.run(password)

    const compareUserPassword = new CompareUserPasswordService()

    const result = await compareUserPassword.execute({
      password,
      hashedPassword
    })

    expect(result.equal).toEqual(true)
  })

  it('should return false when passwords doesnt match', async () => {
    const hashUserPasswordService = new HashUserPasswordService()
    
    const hashedPassword = await hashUserPasswordService.run('any-password')

    const compareUserPassword = new CompareUserPasswordService()

    const result = await compareUserPassword.execute({
      password: 'wrong-password',
      hashedPassword
    })

    expect(result.equal).toEqual(false)
  })
})