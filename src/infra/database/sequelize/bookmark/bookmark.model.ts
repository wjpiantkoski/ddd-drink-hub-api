import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import BeverageModel from "../beverage/beverage.model";
import { UserModel } from "../user/user.model";
import Beverage from "../../../../modules/beverage/domain/beverage/beverage.entity";

@Table({
  tableName: 'bookmarks',
  timestamps: false
})
export default class BookmarkModel extends Model {

  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  declare userId: string

  @ForeignKey(() => BeverageModel)
  @Column({ allowNull: false })
  declare beverageId: string

  @BelongsTo(() => BeverageModel)
  declare beverage: Beverage
}