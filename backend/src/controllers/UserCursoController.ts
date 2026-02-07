import { Controller, Get, Param, Post, Delete, UseGuards, Request } from '@nestjs/common';
import { UserCursoService } from '../services/UserCursoService';
import { JwtAuthGuard } from '../guards/Jwt.Auth.Guard';

@UseGuards(JwtAuthGuard)
@Controller('user-curso')
export class UserCursoController {
  constructor(private readonly userCursoService: UserCursoService) {}

  @Get()
  async listarCursos(@Request() req) {
    return this.userCursoService.listarCursosDoUsuario(req.user.id);
  }

  @Get(':id')
  async detalhesCurso(@Request() req, @Param('id') cursoId: string) {
    return this.userCursoService.detalhesCursoDoUsuario(req.user.id, cursoId);
  }

  @Post(':id/matricular')
  async matricularCurso(@Request() req, @Param('id') cursoId: string) {
    return this.userCursoService.adicionarCursoAoUsuario(req.user.id, cursoId);
  }

  @Delete(':id/cancelar')
  async cancelarCurso(@Request() req, @Param('id') cursoId: string) {
    return this.userCursoService.removerCursoDoUsuario(req.user.id, cursoId);
  }
}


