/**
 * Student-Management-System-API
 * The Student-Management-Sytem-API description.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { GroupDto } from './groupDto';
import { UserDto } from './userDto';

export interface CourseDto { 
    id?: string;
    shortname: string;
    semester: string;
    title: string;
    isClosed: boolean;
    password?: string;
    link?: string;
    allowGroups: boolean;
    maxGroupSize: number;
    users?: Array<UserDto>;
    groups?: Array<GroupDto>;
}