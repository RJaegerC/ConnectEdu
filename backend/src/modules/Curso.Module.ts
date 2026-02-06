import { Module } from '@nestjs/common';
import { CursoRepository } from '../repositories/CursoRepository';

@Module({
  providers: [CursoRepository],
  exports: [CursoRepository], // exporta para outros módulos usarem (user-curso)
})
export class CursoModule {}
