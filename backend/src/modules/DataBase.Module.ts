// backend/src/modules/DataBase.Module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../models/Usuario';
import { Curso } from '../models/Curso';
import { Atividade } from '../models/Atividade';
import { Entrega } from '../models/Entrega';
import { UserCurso } from '../models/UserCurso';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres', 
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1234567',
      database: process.env.POSTGRES_DB || 'educdb',
      entities: [Usuario, Curso, Atividade, Entrega, UserCurso],
      synchronize: true, // cuidado: true só para primeiro uso
    }),
  ],
})
export class DatabaseModule {}
