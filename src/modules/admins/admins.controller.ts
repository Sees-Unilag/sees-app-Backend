import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AdminsService, signInDto } from './';
import { HttpController } from 'src/common';

@Controller('admin')
export class AdminsController extends HttpController {
  @Inject() private readonly service: AdminsService;

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() body: signInDto) {
    const token = await this.service.signIn(body);
    return this.send({token});
  }
}
