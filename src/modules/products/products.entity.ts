// import User from "src/users/user.entity";
import { CURRENT_TIMESTAMP, DB_TABLES } from "src/utils/constants";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import Review from "../reviews/review.entity";
import Category from "../category/category.entity";


@Entity({
    name: DB_TABLES.PRODUCTS,
})
class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        nullable: false,
    })
    title!: string;

    @Column()
    description!: string;

    @Column({
        type: 'bool',
        default: false
    })
    trendy!: boolean

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price!: number;

    @Column({
        type: 'int',
        default: 0
    })
    offer!: number;


    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    })
    salePrice!: number | null;

    @CreateDateColumn({
        type: "timestamp",
        default: () => CURRENT_TIMESTAMP,
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => CURRENT_TIMESTAMP,
        onUpdate: CURRENT_TIMESTAMP,
    })
    updatedAt!: Date;

    @OneToMany(() => Review, (review) => review.product)
    reviews!: Review[];


    @Column({
        type: 'int',
        default: 0,
    })
    quantity!: number


    @Column({
        type: 'decimal',
        precision: 2,
        scale: 1,
        default: 0,
    })
    rating!: number


    @Column({
        type: 'int',
        default: 0,
    })
    soldCount!: number

    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({ name: 'category_id' })
    category!: Category

    @Column({
        type: 'text',
        array: true,
    })
    images!: string[];


}

export default Product;