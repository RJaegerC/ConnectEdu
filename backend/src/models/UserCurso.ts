import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Curso } from './Curso';

@Entity('user_curso')
export class UserCurso {
    @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    usuarioId: string;

    @ManyToOne(() => Usuario, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    usuario: Usuario;

    @PrimaryColumn({ name: 'curso_id', type: 'uuid' })
    cursoId: string;

    @ManyToOne(() => Curso, { nullable: false })
    @JoinColumn({ name: 'curso_id' })
    curso: Curso;

    constructor() {}
}
