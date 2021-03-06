/**
 * Student-Management-System-API
 * The Student-Management-Sytem-API. <a href='http://localhost:3000/api-json'>JSON</a>
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface NotificationDto { 
    event: NotificationDto.EventEnum;
    courseId: string;
    assignmentId?: string;
    groupId?: string;
    userId?: string;
    payload?: any;
}
export namespace NotificationDto {
    export type EventEnum = 'COURSE_JOINED' | 'ASSIGNMENT_CREATED' | 'ASSIGNMENT_REMOVED' | 'ASSIGNMENT_STATE_CHANGED' | 'GROUP_REGISTERED' | 'GROUP_UNREGISTERED' | 'USER_REGISTERED' | 'USER_UNREGISTERED' | 'USER_JOINED_GROUP' | 'USER_LEFT_GROUP' | 'REGISTRATIONS_CREATED' | 'REGISTRATIONS_REMOVED';
    export const EventEnum = {
        COURSEJOINED: 'COURSE_JOINED' as EventEnum,
        ASSIGNMENTCREATED: 'ASSIGNMENT_CREATED' as EventEnum,
        ASSIGNMENTREMOVED: 'ASSIGNMENT_REMOVED' as EventEnum,
        ASSIGNMENTSTATECHANGED: 'ASSIGNMENT_STATE_CHANGED' as EventEnum,
        GROUPREGISTERED: 'GROUP_REGISTERED' as EventEnum,
        GROUPUNREGISTERED: 'GROUP_UNREGISTERED' as EventEnum,
        USERREGISTERED: 'USER_REGISTERED' as EventEnum,
        USERUNREGISTERED: 'USER_UNREGISTERED' as EventEnum,
        USERJOINEDGROUP: 'USER_JOINED_GROUP' as EventEnum,
        USERLEFTGROUP: 'USER_LEFT_GROUP' as EventEnum,
        REGISTRATIONSCREATED: 'REGISTRATIONS_CREATED' as EventEnum,
        REGISTRATIONSREMOVED: 'REGISTRATIONS_REMOVED' as EventEnum
    };
}