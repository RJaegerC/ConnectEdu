import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Atividade } from '../models/Atividade';

@Injectable()
export class AtividadeRepository {
  private repo: Repository<Atividade>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Atividade);
  }

  findByCurso(cursoId: string) {
    return this.repo.find({
      where: { curso: { id: cursoId } },
      relations: ['curso'],
    });
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['curso'],
    });
  }

  save(entity: Atividade) {
    return this.repo.save(entity);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
