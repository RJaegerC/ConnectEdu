import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UsuarioModule } from './modules/Usuario.Module'; 
import { DatabaseModule } from './modules/DataBase.Module'; 

@Module({
  imports: [
    DatabaseModule, // conecta ao banco de dados
    UsuarioModule, // adiciona o módulo de usuário
  ],
  controllers: [
    AppController, // mantém o controller principal existente
  ],
  providers: [
    AppService, // mantém o service principal existente
  ],
})
export class AppModule {}