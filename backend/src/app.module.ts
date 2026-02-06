import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UsuarioModule } from './modules/Usuario.Module'; 
import { DatabaseModule } from './modules/DataBase.Module'; 
import { UserCursoModule } from './modules/UserCurso.Module';
import { CursoModule } from './modules/Curso.Module';

@Module({
  imports: [
    DatabaseModule, // conecta ao banco de dados
    UsuarioModule, // adiciona o módulo de usuário
    UserCursoModule, // adiciona o módulo de user-curso
    CursoModule, // adiciona o módulo de curso
  ],
  controllers: [
    AppController, // mantém o controller principal existente
  ],
  providers: [
    AppService, // mantém o service principal existente
  ],
})
export class AppModule {}