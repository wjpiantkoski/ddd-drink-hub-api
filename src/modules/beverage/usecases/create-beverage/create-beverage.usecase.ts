import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import Beverage from "../../domain/beverage/beverage.entity";
import IBeverageRepository from "../../repository/beverage.repository.interface";
import ICategoryRepository from "../../repository/category.repository.interface";

export interface CreateBeverageUsecaseInput {
  name: string
  userId: string
  categoryId: string
  description: string
}

export default class CreateBeverageUsecase implements IUsecase {

  constructor(
    private beverageRepository: IBeverageRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: CreateBeverageUsecaseInput): Promise<UsecaseResponse> {
    const category = await this.categoryRepository.findById(input.categoryId)

    if (!category) {
      return {
        status: 400,
        data: { 
          message: 'Invalid category'
        }
      }
    }

    const beverage = new Beverage({
      category,
      name: input.name,
      userId: input.userId,
      description: input.description
    })

    try {
      await this.beverageRepository.create(beverage)

      return {
        data: null,
        status: 201
      }
    } catch {
      return {
        data: null,
        status: 400
      }
    }
  }
}