import { CURRENT_TIMESTAMP, DB_TABLES } from "src/utils/constants";
import { UserRoles } from "src/utils/enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Review from "../reviews/review.entity";

@Entity({
    name: DB_TABLES.USERS
})
class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        type: "varchar",
        length: 255
    })
    email!: string;

    @Column()
    password!: string;

    @Column()
    username!: string;

    @Column({
        type: "text",
        default: UserRoles.USER,
        enum: Object.values(UserRoles)
    })
    role!: string;

    @CreateDateColumn({
        default: () => CURRENT_TIMESTAMP
    })
    createdAt!: Date;

    @UpdateDateColumn({
        default: () => CURRENT_TIMESTAMP,
        onUpdate: CURRENT_TIMESTAMP
    })
    updatedAt!: Date;

    @OneToMany(() => Review, (review) => review.user)
    reviews!: Review[]

}
export default User;