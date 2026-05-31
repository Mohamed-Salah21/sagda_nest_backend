import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "../products/products.entity";
import { DB_TABLES } from "src/utils/constants";

@Entity({
    name: DB_TABLES.SUB_CATEGORIES,
})
class SubCategory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
    })
    name!: string;

    @Column({
        type: "text",
    })
    description!: string;

    @Column({
        type: "text",
        default: null,
    })
    image!: string

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[]
}
export default SubCategory;