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

@Injectable()
export class AdminsService {
  private logger = new Logger('AdminService');

  constructor(private readonly repository: AdminRepository) {}

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

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<Admin> {
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

    // todo: This should return access and refresh Tokens
    return admin;
  }
}
