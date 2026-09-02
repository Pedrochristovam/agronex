import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('status')
  @ApiOperation({ summary: 'Status do módulo de autenticação' })
  getStatus() {
    return this.authService.getStatus();
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Placeholder — requer JWT (implementação futura)' })
  me() {
    return { message: 'Endpoint protegido — login será implementado na próxima etapa' };
  }
}
