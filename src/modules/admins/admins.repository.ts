import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(params: { data: Prisma.AdminCreateInput }): Promise<Admin> {
    const { data } = params;
    const user = this.prisma.admin.create({ data });
    return user;
  }

  async findAdmin(params: {
    where: Prisma.AdminWhereUniqueInput;
  }): Promise<Admin | null> {
    const { where } = params;
    const admin = this.prisma.admin.findUnique({ where });
    return admin;
  }

  public async createRefreshToken(
    data: Prisma.RefreshTokenCreateInput,
  ): Promise<void> {
    await this.prisma.refreshToken.create({
      data,
    });
  }
  
  public getRefreshToken = async(refreshToken:string)=>{
    const token = await this.prisma.refreshToken.findUnique({ where: {  token: refreshToken } });
    return token;
  }

  public deleteRefreshToken = async(refreshToken:string):Promise<void>=>{
      await this.prisma.refreshToken.delete({ where: { token: refreshToken } });        
  }

}
