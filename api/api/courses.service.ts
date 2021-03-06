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

import { CourseCreateDto } from '../model/courseCreateDto';
import { CourseDto } from '../model/courseDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CoursesService {

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
     * Create course.
     * Creates a new course.
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createCourse(body: CourseCreateDto, observe?: 'body', reportProgress?: boolean): Observable<CourseDto>;
    public createCourse(body: CourseCreateDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CourseDto>>;
    public createCourse(body: CourseCreateDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CourseDto>>;
    public createCourse(body: CourseCreateDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createCourse.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<CourseDto>('post',`${this.basePath}/courses`,
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
     * Delete course.
     * Deletes the course.
     * @param courseId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteCourse(courseId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteCourse(courseId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteCourse(courseId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteCourse(courseId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling deleteCourse.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get course.
     * Retrieves the course, if the requesting user is a member of this course.
     * @param courseId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCourseById(courseId: string, observe?: 'body', reportProgress?: boolean): Observable<CourseDto>;
    public getCourseById(courseId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CourseDto>>;
    public getCourseById(courseId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CourseDto>>;
    public getCourseById(courseId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getCourseById.');
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

        return this.httpClient.request<CourseDto>('get',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get course by name and semester.
     * 
     * @param name 
     * @param semester 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCourseByNameAndSemester(name: string, semester: string, observe?: 'body', reportProgress?: boolean): Observable<CourseDto>;
    public getCourseByNameAndSemester(name: string, semester: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CourseDto>>;
    public getCourseByNameAndSemester(name: string, semester: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CourseDto>>;
    public getCourseByNameAndSemester(name: string, semester: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling getCourseByNameAndSemester.');
        }

        if (semester === null || semester === undefined) {
            throw new Error('Required parameter semester was null or undefined when calling getCourseByNameAndSemester.');
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

        return this.httpClient.request<CourseDto>('get',`${this.basePath}/courses/${encodeURIComponent(String(name))}/semester/${encodeURIComponent(String(semester))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get courses.
     * Returns all courses that match the given filter.
     * @param skip [Pagination] The amount of elements that should be skipped.
     * @param take [Pagination] The amount of elements that should be included in the response.
     * @param shortname 
     * @param semester 
     * @param title 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCourses(skip?: number, take?: number, shortname?: string, semester?: string, title?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<CourseDto>>;
    public getCourses(skip?: number, take?: number, shortname?: string, semester?: string, title?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CourseDto>>>;
    public getCourses(skip?: number, take?: number, shortname?: string, semester?: string, title?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CourseDto>>>;
    public getCourses(skip?: number, take?: number, shortname?: string, semester?: string, title?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (skip !== undefined && skip !== null) {
            queryParameters = queryParameters.set('skip', <any>skip);
        }
        if (take !== undefined && take !== null) {
            queryParameters = queryParameters.set('take', <any>take);
        }
        if (shortname !== undefined && shortname !== null) {
            queryParameters = queryParameters.set('shortname', <any>shortname);
        }
        if (semester !== undefined && semester !== null) {
            queryParameters = queryParameters.set('semester', <any>semester);
        }
        if (title !== undefined && title !== null) {
            queryParameters = queryParameters.set('title', <any>title);
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

        return this.httpClient.request<Array<CourseDto>>('get',`${this.basePath}/courses`,
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
     * Update course.
     * Updates the course.
     * @param body 
     * @param courseId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCourse(body: CourseDto, courseId: string, observe?: 'body', reportProgress?: boolean): Observable<CourseDto>;
    public updateCourse(body: CourseDto, courseId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CourseDto>>;
    public updateCourse(body: CourseDto, courseId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CourseDto>>;
    public updateCourse(body: CourseDto, courseId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateCourse.');
        }

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling updateCourse.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<CourseDto>('patch',`${this.basePath}/courses/${encodeURIComponent(String(courseId))}`,
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
