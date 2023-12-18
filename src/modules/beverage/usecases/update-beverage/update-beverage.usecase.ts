import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import IBeverageRepository from "../../repository/beverage.repository.interface";
import ICategoryRepository from "../../repository/category.repository.interface";

export interface BeverageDto {
  name: string
  description: string
  categoryId: string
}

export interface UpdateBeverageUsecaseInput {
  beverageId: string,
  beverage: BeverageDto
}

export default class UpdateBeverageUsecase implements IUsecase {

  constructor(
    private beverageRepository: IBeverageRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: UpdateBeverageUsecaseInput): Promise<UsecaseResponse> {
    const beverage = await this.beverageRepository.findById(input.beverageId)

    if (!beverage) {
      return {
        status: 404,
        data: {
          message: 'Beverage not found'
        }
      }
    }

    if (beverage.category.id !== input.beverage.categoryId) {
      const newCategory = await this.categoryRepository.findById(input.beverage.categoryId)

      if (!newCategory) {
        return {
          status: 400,
          data: {
            message: 'Invalid category'
          }
        }
      }

      beverage.category = newCategory
    }

    beverage.name = input.beverage.name
    beverage.description = input.beverage.description

    try {
      await this.beverageRepository.update(beverage)

      return {
        status: 200,
        data: null
      }
    } catch {
      return {
        status: 422,
        data: null
      }
    }
  }
}