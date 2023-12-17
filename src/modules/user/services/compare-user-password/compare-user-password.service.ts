import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
import bcrypt from 'bcrypt'

export interface CompareUserPasswordServiceParams {
  password: string
  hashedPassword: string
}

export interface CompareUserPasswordServiceOutput {
  equal: boolean
}

export default class CompareUserPasswordService implements IUsecase {
  async execute(input: CompareUserPasswordServiceParams): Promise<CompareUserPasswordServiceOutput> {
    const equal = await bcrypt.compare(input.password, input.hashedPassword)
    return {equal}
  }
}