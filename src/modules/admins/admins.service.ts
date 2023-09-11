import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminRepository,signInDto } from './';
import { Admin } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logging';
import { env } from 'src/config';

@Injectable()
export class AdminsService {
  constructor(
    private readonly repository: AdminRepository,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Seeds the Db with admin data from environmental variables
   */
  async setupAdmin(): Promise<void> {
    const username = env.admin_username;
    const admin = await this.repository.findAdmin({ username });
    if (admin) {
      return this.logger.info(
        'Admin with this username exist!, stopping Admin Set Up',
      );
    }
    const hashedPassword = await hash(env.admin_password, 10);
    await this.repository.createAdmin({
      username: env.admin_username,
      password: hashedPassword,
    });
    this.logger.info('Successfully set up Sees Admin');
  }

  /**
   * Logs an admin in if the credentials are valid
   * @param username
   * @param password
   * @returns the admin
   */

  async signIn(authCredentialsDto: signInDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const admin = await this.repository.findAdmin({ username });
    if (!admin) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    const isSame: boolean = await compare(password, admin.password);
    if (!isSame) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    return this.createAcessToken(admin);
  }

  private createAcessToken = (admin: Admin) => {
    return this.jwtService.sign(
      { id: admin.id },
      { expiresIn: env.accesstoken_expiresat },
    );
  };
}
