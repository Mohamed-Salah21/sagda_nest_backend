import { DB_TABLES } from "src/utils/constants";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: DB_TABLES.USERS
})
class Cart {
    @PrimaryGeneratedColumn()
    id!: number;
}
export default Cart;