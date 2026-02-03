import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Entrega } from '../models/Entrega';

@Injectable()
export class EntregaRepository {
  private repo: Repository<Entrega>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Entrega);
  }

  findByAtividade(atividadeId: string) {
    return this.repo.find({
      where: { atividade: { id: atividadeId } },
      relations: ['atividade', 'aluno'],
    });
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['atividade', 'aluno'],
    });
  }

  save(entity: Entrega) {
    return this.repo.save(entity);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
