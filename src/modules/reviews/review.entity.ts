import { CURRENT_TIMESTAMP, DB_TABLES } from "src/utils/constants";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "../products/products.entity";
import User from "../users/users.entity";

@Entity({
    name: DB_TABLES.REVIEWS
})
class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'int',
    })
    rating!: number;

    @Column({
        type: 'text',
    })
    comment!: string;

    @Column({
        type: 'timestamp',
        default: () => CURRENT_TIMESTAMP,
    })
    createdAt!: Date;

    @Column({
        type: 'timestamp',
        default: () => CURRENT_TIMESTAMP,
        onUpdate: CURRENT_TIMESTAMP,
    })
    updatedAt!: Date;

    @ManyToOne(() => Product, (product) => product.reviews)
    product!: Product

    @ManyToOne(() => User, (user) => user.reviews)
    user!: User;
}
export default Review;