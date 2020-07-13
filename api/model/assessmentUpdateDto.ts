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
import { PartialAssessmentDto } from './partialAssessmentDto';

export interface AssessmentUpdateDto { 
    /**
     * The amount of points that the student or group achieved with their submission.
     */
    achievedPoints: number;
    /**
     * A comment providing additional feedback.
     */
    comment?: string;
    /**
     * UserId of the person that updated the assessment. Automatically set by the server.
     */
    updatedBy?: string;
    partialAssessments?: Array<PartialAssessmentDto>;
}