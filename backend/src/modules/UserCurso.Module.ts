import { Module } from '@nestjs/common';
import { UserCursoController } from '../controllers/UserCursoController';
import { UserCursoService } from '../services/UserCursoService';
import { UserCursoRepository } from 'src/repositories/UserCursoRepository';
import { UsuarioModule } from './Usuario.Module';

@Module({
  imports: [
    UsuarioModule, 
  ],
  controllers: [UserCursoController],
  providers: [UserCursoService, UserCursoRepository],
})
export class UserCursoModule {}
