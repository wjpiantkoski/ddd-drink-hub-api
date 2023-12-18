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

  async execute(input: UpdateBeverageUsecaseInput): Promise<void> {
    const beverage = await this.beverageRepository.findById(input.beverageId)

    if (!beverage) {
      throw new Error('Beverage not found')
    }

    if (beverage.category.id !== input.beverage.categoryId) {
      const newCategory = await this.categoryRepository.findById(input.beverage.categoryId)

      if (!newCategory) {
        throw new Error('Category not found')
      }

      beverage.category = newCategory
    }

    beverage.name = input.beverage.name
    beverage.description = input.beverage.description

    await this.beverageRepository.update(beverage)
  }
}