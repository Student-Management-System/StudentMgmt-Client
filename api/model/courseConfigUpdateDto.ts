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

export interface CourseConfigUpdateDto { 
    /**
     * Password required to sign up for the course.
     */
    password?: string;
    /**
     * The route that update messages (i.e user left group or assignment submission closed) should be send to. Will be send via HTTP-POST.
     */
    subscriptionUrl?: string;
}