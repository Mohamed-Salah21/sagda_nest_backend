import { DB_TABLES, SECTION_TYPES } from "src/utils/constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: DB_TABLES.SECTIONS
})
class Section {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    title!: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    description!: string;

    @Column({
        type: "varchar",
        length: 255,
        enum: SECTION_TYPES
    })
    type!: string;

}
export default Section;