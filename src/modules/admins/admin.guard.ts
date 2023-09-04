import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/db';
import { env } from 'src/config';
import { LoggerService } from '../logging';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwt_secret,
      });
      const user = await this.prisma.admin.findUnique({
        where: { id: payload.id },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid Admin Details');
      }
      request['user'] = payload;
      return true;
    } catch {
      this.logger.error('Invalid or Expired Token')
      throw new UnauthorizedException('Invalid or Expired Token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}