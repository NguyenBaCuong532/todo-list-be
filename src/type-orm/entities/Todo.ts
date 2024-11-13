import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'todo'})
export class Todo{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column()
    content:string;

    @Column()
    checked:string;


}