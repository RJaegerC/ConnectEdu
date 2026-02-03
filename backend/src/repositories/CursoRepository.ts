import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Curso } from '../models/Curso';

@Injectable()
export class CursoRepository {
private repo: Repository<Curso>;


constructor(private dataSource: DataSource) {
this.repo = this.dataSource.getRepository(Curso);
}


findAll() {
return this.repo.find({ relations: ['professor'] });
}


findById(id: string) {
return this.repo.findOne({ where: { id }, relations: ['professor'] });
}


save(curso: Curso) {
return this.repo.save(curso);
}


delete(id: string) {
return this.repo.delete(id);
}
}