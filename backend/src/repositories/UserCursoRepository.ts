import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserCurso } from '../models/UserCurso';

@Injectable()
export class UserCursoRepository {
  private repo: Repository<UserCurso>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(UserCurso);
  }

  addRelation(entity: UserCurso) {
    return this.repo.save(entity);
  }

  removeRelation(usuarioId: string, cursoId: string) {
    return this.repo.delete({ usuarioId, cursoId });
  }

  findByUser(usuarioId: string) {
    return this.repo.find({
      where: { usuarioId },
      relations: ['curso', 'curso.professor', 'curso.atividades'],
    });
  }

  findByCurso(cursoId: string) {
    return this.repo.find({
      where: { cursoId },
      relations: ['usuario'],
    });
  }

  async findOneByUserCurso(usuarioId: string, cursoId: string) {
    return this.repo.findOne({
      where: { usuarioId, cursoId },
      relations: ['curso', 'curso.professor', 'curso.atividades'],
    });
  }
}
