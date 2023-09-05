import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AdminsService, signInDto } from './';
import { HttpController } from 'src/common';

@Controller('admin/auth')
export class AdminsController extends HttpController {
  @Inject() private readonly service: AdminsService;

  @Post('signin')
  async signIn(@Body() body: signInDto) {
    const tokens = await this.service.signIn(body);
    return this.send(tokens);
  }
}
