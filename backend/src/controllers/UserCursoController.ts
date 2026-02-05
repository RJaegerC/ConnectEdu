import { Controller, Get, Param, Post, Delete, UseGuards, Request } from '@nestjs/common';
import { UserCursoService } from '../services/UserCursoService';
import { JwtAuthGuard } from '../guards/Jwt.Auth.Guard';

@UseGuards(JwtAuthGuard) 
@Controller('user-curso')
export class UserCursoController {
  constructor(private readonly userCursoService: UserCursoService) {}

  @Get()
  async listarCursos(@Request() req) {
    const usuarioId = req.user.sub; 
    return this.userCursoService.listarCursosDoUsuario(usuarioId);
  }

  @Get(':id')
  async detalhesCurso(@Request() req, @Param('id') cursoId: string) {
    const usuarioId = req.user.sub;
    return this.userCursoService.detalhesCursoDoUsuario(usuarioId, cursoId);
  }

  @Post(':id/matricular')
  async matricularCurso(@Request() req, @Param('id') cursoId: string) {
    const usuarioId = req.user.sub;
    return this.userCursoService.adicionarCursoAoUsuario(usuarioId, cursoId);
  }

  @Delete(':id/cancelar')
  async cancelarCurso(@Request() req, @Param('id') cursoId: string) {
    const usuarioId = req.user.sub;
    return this.userCursoService.removerCursoDoUsuario(usuarioId, cursoId);
  }
}
