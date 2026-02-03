import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoleType } from './RoleType';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    nome: string;

    @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    senha: string;

    @Column({ type: 'enum', enum: RoleType, nullable: false })
    role: RoleType;

    constructor() {}
}
