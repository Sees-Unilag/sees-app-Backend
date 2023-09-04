import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminRepository, ISignInResponse, signInDto } from './';
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
    private readonly logger: LoggerService
  ) {}

  /**
   * Seeds the Db with admin data from environmental variables
   */
  async setupAdmin(): Promise<void>{
    const username = env.admin_username;
    const admin = await this.repository.findAdmin({username});
    if (admin){
      return this.logger.info("Admin with this username exist!, stopping Admin Set Up")
    }
    const hashedPassword = await hash(env.admin_password, 10);
    await this.repository.createAdmin({ username:env.admin_username, password:hashedPassword});
    this.logger.info("Successfully set up Sees Admin")
    }

  /**
   * Logs an admin in if the credentials are valid
   * @param username
   * @param password
   * @returns the admin
   */

  async signIn(
    authCredentialsDto:signInDto,
  ): Promise<ISignInResponse> {
    const { username, password } = authCredentialsDto;

    const admin = await this.repository.findAdmin({ username })
    if (!admin) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    const isSame: boolean = await compare(password, admin.password);
    if (!isSame) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    return await this.generateToken(admin);
  }

  /**
   * Generates the access Token and refresh token from the user object
   * Add the Refresh Token to the database and attach to the user
   * @param user
   * @returns
   */
  private async generateToken(admin: Admin): Promise<ISignInResponse> {
    const accessToken = this.createAcessToken(admin);
    const refreshToken = this.createRefreshToken(admin);
    const refreshTokenTime = process.env
      .REFRESHTOKEN_EXPIRY as unknown as number; // no of days
    const expiresAt = new Date(
      Date.now() + refreshTokenTime * 24 * 60 * 60 * 1000,
    );
    const id = admin.id;
    await this.repository.createRefreshToken({
      token: refreshToken,
      expiresAt,
      admin: { connect: { id } },
    });
    return { refreshToken, accessToken };
  }

  private createAcessToken = (admin: Admin) => {
    return this.jwtService.sign(
      { id: admin.id, type: 'access' },
      { expiresIn: env.accesstoken_expiresat },
    );
  };

  private createRefreshToken = (admin: Admin) => {
    return this.jwtService.sign(
      { id: admin.id, type: 'refresh' },
      {
        expiresIn: env.refreshtoken_expiresat,
      },
    );
  };
}