import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Atividade } from './Atividade';

@Entity('curso')
export class Curso {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    nome: string;

    @Column({ type: 'text', nullable: true }) // nullable de acordo com o banco
    descricao: string;

    @ManyToOne(() => Usuario, { nullable: true }) // nullable de acordo com o banco
    @JoinColumn({ name: 'professor_id' }) // mapeia para a FK correta
    professor: Usuario;

    // Cascade delete das atividades ao excluir curso
    @OneToMany(() => Atividade, (atividade) => atividade.curso, {
        cascade: ['remove']
    })
    atividades: Atividade[];

    constructor() {}
}
