import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminRepository } from './admins.repository';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { Admin } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import ISignInResponse from './interface/signInResponse.interface';

@Injectable()
export class AdminsService {
  private logger = new Logger('AdminService');

  constructor(
    private readonly repository: AdminRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers an admin if the credentials are valid
   * @param secretKey
   * @param username
   * @param password
   * @returns the admin
   */

  async signUp(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { secretKey, username, password } = createAdminDto;
    if (secretKey !== process.env.SECRET_KEY)
      throw new UnauthorizedException('The secret key provided is invlaid');

    const hashedPassword = await hash(password, 10);
    const data = { username: username.toLowerCase(), password: hashedPassword };

    let admin: Admin;
    try {
      admin = await this.repository.createAdmin({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username already exists');
      } else {
        this.logger.error(error.code);
        throw new InternalServerErrorException(
          'An unexpected error occurred, try again.',
        );
      }
    }
    return admin;
  }

  /**
   * Logs an admin in if the credentials are valid
   * @param username
   * @param password
   * @returns the admin
   */

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISignInResponse> {
    const { username, password } = authCredentialsDto;

    const admin = await this.repository.findAdmin({
      where: { username: username },
    });
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
    const refreshTokenTime = process.env.REFRESHTOKEN_TIME as unknown as number; // no of days
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
      { expiresIn: process.env.ACCESSTOKEN_EXPIRY },
    );
  };

  private createRefreshToken = (admin: Admin) => {
    return this.jwtService.sign(
      { id: admin.id, type: 'refresh' },
      {
        expiresIn: process.env.REFRESHTOKEN_EXPIRY,
      },
    );
  };
}
