import InvalidParamError from "../../../../@shared/domain/errors/invalid-param.error"
import HashUserPasswordService from "./hash-user-password.service"

describe('HashUserPasswordService', () => {
  it('should hash password', async () => {
    const service = new HashUserPasswordService()
    const password = 'any-password'
    const hashedPassword = await service.run(password)

    expect(hashedPassword).toBeDefined()
    expect(hashedPassword).not.toEqual(password)
  })

  it('should throw error when password is invalid', async () => {
    try {
      const service = new HashUserPasswordService()
      await expect(service.run('')).rejects.toThrow('Invalid password')
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidParamError)
    }
  })
})