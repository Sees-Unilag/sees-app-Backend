import { Injectable } from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { Course, Semester, Year } from '@prisma/client';
import { GetCoursesDto } from './dtos/get-courses.dto';

@Injectable()
export class CoursesService {
    constructor(private readonly repository:CourseRepository){}

    /**
     * Takes in the course Id and returns the course with given id if any
     * @param id - course id
     * @returns the course
     */
    async getCourse(id:string):Promise<Course | null>{
        const course = await this.repository.getCourse({where: {id}})
        return course;
    }

    /**
     * Finds a list of courses for the given year and semester
     * @param year 
     * @param semester 
     */
    async getCourses(getCoursesDto:GetCoursesDto):Promise<Course[]>{
        const {year, semester} = getCoursesDto;
        const courses = await this.repository.getCourses({where: {year, semester}});
        return courses;
    }
}
