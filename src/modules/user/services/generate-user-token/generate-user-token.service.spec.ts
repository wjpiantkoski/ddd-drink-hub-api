import InvalidParamError from "../../../../@shared/domain/errors/invalid-param.error"
import GenerateUserTokenService from "./generate-user-token.service"
import {v4 as uuidv4} from 'uuid'

describe('GenerateUserTokenService', () => {
  it('should generate user token', () => {
    const service = new GenerateUserTokenService()
    const result = service.run(uuidv4())

    expect(result.token).toBeDefined()
  })

  it('should not generate user token with invalid userId', () => {
    try {
      const service = new GenerateUserTokenService()
      service.run('123')
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidParamError)
    }
  })
})