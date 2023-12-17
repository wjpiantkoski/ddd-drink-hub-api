import IService from "../../../../@shared/domain/service/service.interface";
import Category from "../../domain/category/category.entity";
import ICategoryRepository from "../../repository/category.repository.interface";

export default class PopulateCategoriesService implements IService {

  constructor(private categoryRepository: ICategoryRepository) {}

  async run(): Promise<void> {
    const categories = [
      new Category("Cerveja"),
      new Category("Vinho Tinto"),
      new Category("Vinho Branco"),
      new Category("Vodka"),
      new Category("Whisky"),
      new Category("Caipirinha"),
      new Category("Gin Tônica"),
      new Category("Rum"),
      new Category("Tequila"),
      new Category("Champagne")
    ]

    await this.categoryRepository.createMany(categories)
  }
  
}