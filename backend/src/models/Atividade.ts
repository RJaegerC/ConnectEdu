import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Curso } from './Curso';
import { Entrega } from './Entrega';

@Entity('atividade')
export class Atividade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Curso, (curso) => curso.atividades, { nullable: true })
    @JoinColumn({ name: 'curso_id' }) // mapeia a FK correta
    curso: Curso;

    @Column({ type: 'varchar', length: 500, nullable: true })
    arquivo: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descricao: string;

    @Column({ type: 'timestamp', nullable: true, name: 'dataentrega' })
    data_entrega: Date;

    // Cascade delete das entregas ao excluir atividade
    @OneToMany(() => Entrega, (entrega) => entrega.atividade, {
        cascade: ['remove']
    })
    entregas: Entrega[];

    constructor() {}
}
