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

export interface PartialAssessmentDto { 
    id?: number;
    assessmentId: string;
    title: string;
    type?: string;
    severity?: PartialAssessmentDto.SeverityEnum;
    points?: number;
    comment?: string;
    path?: string;
    line?: number;
}
export namespace PartialAssessmentDto {
    export type SeverityEnum = 'INFORMATIONAL' | 'WARNING' | 'ERROR' | 'CRITICAL';
    export const SeverityEnum = {
        INFORMATIONAL: 'INFORMATIONAL' as SeverityEnum,
        WARNING: 'WARNING' as SeverityEnum,
        ERROR: 'ERROR' as SeverityEnum,
        CRITICAL: 'CRITICAL' as SeverityEnum
    };
}