import { Sequelize } from "sequelize-typescript"
import { UserModel } from "./user.model"
import UserRepository from "./user.repository"
import User from "../../../../modules/user/domain/user.entity"

describe('UserRepository', () => {
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

  it('should create user', async () => {
    const repository = new UserRepository()

    const user = new User('Test', 'email@email.com', 'password')
    await repository.create(user)

    const result = await UserModel.findOne({
      where: { id: user.id }
    })

    expect(result).toBeDefined()
    expect(result.id).toEqual(user.id)
  })
})