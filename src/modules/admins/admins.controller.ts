import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('admin/auth')
export class AdminsController {
  constructor(private readonly service: AdminsService) {}

  @Post('signup')
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    const user = await this.service.signUp(createAdminDto);
    return { success: true, user };
  }

  @Post('signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    const user = await this.service.signIn(authCredentialsDto);
    return { success: true, user }; // should return access and refresh tokens
  }
}
