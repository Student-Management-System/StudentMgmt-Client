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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CanJoinCourseDto } from '../model/canJoinCourseDto';
import { ChangeCourseRoleDto } from '../model/changeCourseRoleDto';
import { ParticipantDto } from '../model/participantDto';
import { ParticipantsComparisonDto } from '../model/participantsComparisonDto';
import { ParticipantsWithAssignedEvaluatorDto } from '../model/participantsWithAssignedEvaluatorDto';
import { PasswordDto } from '../model/passwordDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CourseParticipantsService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Add user to course.
     * Adds a user to the course. If the course requires a password, the correct password needs to be included in the request body.
     * @param body 
     * @param courseId 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addUser(body: PasswordDto, courseId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addUser(body: PasswordDto, courseId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addUser(body: PasswordDto, courseId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addUser(body: PasswordDto, courseId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addUser.');
        }

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling addUser.');
        }

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling addUser.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users/${encodeURIComponent(String(userId))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Check if joining is possible.
     * Checks, if the user is able to join the course. A user can join a course, if he&#x27;s not already a member and the course is not closed.
     * @param courseId 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public canUserJoinCourse(courseId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<CanJoinCourseDto>;
    public canUserJoinCourse(courseId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CanJoinCourseDto>>;
    public canUserJoinCourse(courseId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CanJoinCourseDto>>;
    public canUserJoinCourse(courseId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling canUserJoinCourse.');
        }

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling canUserJoinCourse.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<CanJoinCourseDto>('get',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users/${encodeURIComponent(String(userId))}/canJoin`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Compare participants list..
     * Returns an Object, which divides the course participants in two groups (in/out).
     * @param courseId 
     * @param compareToCourseIds 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public compareParticipantsList(courseId: string, compareToCourseIds: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<ParticipantsComparisonDto>;
    public compareParticipantsList(courseId: string, compareToCourseIds: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ParticipantsComparisonDto>>;
    public compareParticipantsList(courseId: string, compareToCourseIds: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ParticipantsComparisonDto>>;
    public compareParticipantsList(courseId: string, compareToCourseIds: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling compareParticipantsList.');
        }

        if (compareToCourseIds === null || compareToCourseIds === undefined) {
            throw new Error('Required parameter compareToCourseIds was null or undefined when calling compareParticipantsList.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (compareToCourseIds) {
            compareToCourseIds.forEach((element) => {
                queryParameters = queryParameters.append('compareToCourseIds', <any>element);
            })
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<ParticipantsComparisonDto>('get',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users/query/compare-participants-list`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get participant.
     * Retrieves a specific participant and course related information about the participant.
     * @param courseId 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getParticipant(courseId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<ParticipantDto>;
    public getParticipant(courseId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ParticipantDto>>;
    public getParticipant(courseId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ParticipantDto>>;
    public getParticipant(courseId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getParticipant.');
        }

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getParticipant.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<ParticipantDto>('get',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users/${encodeURIComponent(String(userId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get participants with assigned evaluator.
     * Returns participants with their assigned evaluator for a particular assignment.
     * @param courseId 
     * @param assignmentId 
     * @param skip [Pagination] The amount of elements that should be skipped.
     * @param take [Pagination] The amount of elements that should be included in the response.
     * @param assignedEvaluatorId Filter by assigned evaluator.
     * @param excludeAlreadyReviewed Excludes groups/users that have already been reviewed.
     * @param nameOfGroupOrUser Filter by group or username.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getParticipantsWithAssignedEvaluator(courseId: string, assignmentId: string, skip?: number, take?: number, assignedEvaluatorId?: string, excludeAlreadyReviewed?: boolean, nameOfGroupOrUser?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ParticipantsWithAssignedEvaluatorDto>>;
    public getParticipantsWithAssignedEvaluator(courseId: string, assignmentId: string, skip?: number, take?: number, assignedEvaluatorId?: string, excludeAlreadyReviewed?: boolean, nameOfGroupOrUser?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ParticipantsWithAssignedEvaluatorDto>>>;
    public getParticipantsWithAssignedEvaluator(courseId: string, assignmentId: string, skip?: number, take?: number, assignedEvaluatorId?: string, excludeAlreadyReviewed?: boolean, nameOfGroupOrUser?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ParticipantsWithAssignedEvaluatorDto>>>;
    public getParticipantsWithAssignedEvaluator(courseId: string, assignmentId: string, skip?: number, take?: number, assignedEvaluatorId?: string, excludeAlreadyReviewed?: boolean, nameOfGroupOrUser?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getParticipantsWithAssignedEvaluator.');
        }

        if (assignmentId === null || assignmentId === undefined) {
            throw new Error('Required parameter assignmentId was null or undefined when calling getParticipantsWithAssignedEvaluator.');
        }






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (skip !== undefined && skip !== null) {
            queryParameters = queryParameters.set('skip', <any>skip);
        }
        if (take !== undefined && take !== null) {
            queryParameters = queryParameters.set('take', <any>take);
        }
        if (assignedEvaluatorId !== undefined && assignedEvaluatorId !== null) {
            queryParameters = queryParameters.set('assignedEvaluatorId', <any>assignedEvaluatorId);
        }
        if (excludeAlreadyReviewed !== undefined && excludeAlreadyReviewed !== null) {
            queryParameters = queryParameters.set('excludeAlreadyReviewed', <any>excludeAlreadyReviewed);
        }
        if (nameOfGroupOrUser !== undefined && nameOfGroupOrUser !== null) {
            queryParameters = queryParameters.set('nameOfGroupOrUser', <any>nameOfGroupOrUser);
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<ParticipantsWithAssignedEvaluatorDto>>('get',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users/assignments/${encodeURIComponent(String(assignmentId))}/with-assigned-evaluator`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get users of course.
     * Returns a collection of users that are signed up for this course.
     * @param courseId 
     * @param skip [Pagination] The amount of elements that should be skipped.
     * @param take [Pagination] The amount of elements that should be included in the response.
     * @param courseRole 
     * @param name Compared to the participant&#x27;s username and displayName with ILIKE %name%.
     * @param groupName Filters by a student&#x27;s current group. Compared with ILIKE %groupName%.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUsersOfCourse(courseId: string, skip?: number, take?: number, courseRole?: Array<string>, name?: string, groupName?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ParticipantDto>>;
    public getUsersOfCourse(courseId: string, skip?: number, take?: number, courseRole?: Array<string>, name?: string, groupName?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ParticipantDto>>>;
    public getUsersOfCourse(courseId: string, skip?: number, take?: number, courseRole?: Array<string>, name?: string, groupName?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ParticipantDto>>>;
    public getUsersOfCourse(courseId: string, skip?: number, take?: number, courseRole?: Array<string>, name?: string, groupName?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getUsersOfCourse.');
        }






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (skip !== undefined && skip !== null) {
            queryParameters = queryParameters.set('skip', <any>skip);
        }
        if (take !== undefined && take !== null) {
            queryParameters = queryParameters.set('take', <any>take);
        }
        if (courseRole) {
            courseRole.forEach((element) => {
                queryParameters = queryParameters.append('courseRole', <any>element);
            })
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (groupName !== undefined && groupName !== null) {
            queryParameters = queryParameters.set('groupName', <any>groupName);
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<ParticipantDto>>('get',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Remove user from course.
     * Removes the user from the course. Returns true, if removal was successful.
     * @param courseId 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public removeUser(courseId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public removeUser(courseId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public removeUser(courseId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public removeUser(courseId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling removeUser.');
        }

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling removeUser.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users/${encodeURIComponent(String(userId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update user&#x27;s role in course.
     * Assigns the given role to the user of this course.
     * @param body 
     * @param courseId 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUserRole(body: ChangeCourseRoleDto, courseId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateUserRole(body: ChangeCourseRoleDto, courseId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateUserRole(body: ChangeCourseRoleDto, courseId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateUserRole(body: ChangeCourseRoleDto, courseId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateUserRole.');
        }

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling updateUserRole.');
        }

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling updateUserRole.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('patch',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}/users/${encodeURIComponent(String(userId))}/role`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
