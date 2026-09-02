import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '@/common/decorators/current-user.decorator';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateTokens(payload: JwtPayload): Promise<TokenPair> {
    const accessExpiresIn = this.configService.get<string>(
      'jwt.accessExpiresIn',
      '15m',
    );
    const refreshExpiresIn = this.configService.get<string>(
      'jwt.refreshExpiresIn',
      '7d',
    );

    const accessSecret = this.configService.get<string>('jwt.accessSecret')!;
    const refreshSecret = this.configService.get<string>('jwt.refreshSecret')!;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ ...payload }, {
        secret: accessSecret,
        expiresIn: accessExpiresIn as `${number}m`,
      }),
      this.jwtService.signAsync({ ...payload }, {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn as `${number}d`,
      }),
    ]);

    return { accessToken, refreshToken, expiresIn: accessExpiresIn };
  }

  /**
   * Base para login — implementação completa virá no módulo auth.
   */
  getStatus() {
    return {
      module: 'auth',
      status: 'ready',
      features: ['jwt', 'refresh-token', 'rbac'],
      note: 'Endpoints de login/registro serão implementados na próxima etapa',
    };
  }
}
