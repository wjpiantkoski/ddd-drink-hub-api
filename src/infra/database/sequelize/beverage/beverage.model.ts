import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import CategoryModel from "../category/category.model"
import { UserModel } from "../user/user.model"
import Category from "../../../../modules/beverage/domain/category/category.entity"

@Table({
  tableName: 'beverages',
  timestamps: false
})
export default class BeverageModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({
    allowNull: false,
    unique: true
  })
  declare name: string

  @Column({ allowNull: false })
  declare description: string

  @ForeignKey(() => CategoryModel)
  @Column({ allowNull: false })
  declare categoryId: string

  @BelongsTo(() => CategoryModel)
  declare category: Category

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  declare userId: string
}