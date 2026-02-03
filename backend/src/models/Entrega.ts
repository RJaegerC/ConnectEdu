import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Atividade } from './Atividade';
import { Usuario } from './Usuario';

@Entity('entrega')
export class Entrega {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Atividade, (atividade) => atividade.entregas, { nullable: true })
    @JoinColumn({ name: 'atividade_id' })
    atividade: Atividade;

    @ManyToOne(() => Usuario, { nullable: true })
    @JoinColumn({ name: 'aluno_id' })
    aluno: Usuario;

    @Column({ type: 'varchar', length: 500, nullable: true })
    arquivoresp: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    nota: number | null;

    constructor() {}
}
