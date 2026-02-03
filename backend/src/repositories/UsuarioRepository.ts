import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from '../models/Usuario';


@Injectable()
export class UsuarioRepository {
private repo: Repository<Usuario>;


constructor(private dataSource: DataSource) {
this.repo = this.dataSource.getRepository(Usuario);
}


findAll() {
return this.repo.find();
}


findById(id: string) {
return this.repo.findOne({ where: { id } });
}


findByEmail(email: string) {
return this.repo.findOne({ where: { email } });
}


save(usuario: Usuario) {
return this.repo.save(usuario);
}


delete(id: string) {
return this.repo.delete(id);
}
}