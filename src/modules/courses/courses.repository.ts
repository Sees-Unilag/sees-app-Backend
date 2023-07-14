import {Injectable} from "@nestjs/common";
import { Course, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class CourseRepository{
    constructor(private readonly prisma:PrismaService){}

    async getCourse(params:{where:Prisma.CourseWhereUniqueInput}):Promise<Course |null>{
        const {where} = params;
        return this.prisma.course.findUnique({
            where
        });
    }

    async addCourse(params:{data:Prisma.CourseCreateInput}):Promise<Course>{
        const {data} = params;
        return this.prisma.course.create({data})
    }

    async updateCourse(params:{
        where:Prisma.CourseWhereUniqueInput,
        data: Prisma.CourseCreateInput
        }
        ):Promise<Course>{
            const {where, data} = params;
            return this.prisma.course.update({
                where, data
            });
    }

    async getCourses(params:{where:Prisma.CourseWhereInput}):Promise<Course[]>{
        const {where} = params;
        return this.prisma.course.findMany({
            where
        })
    }

}