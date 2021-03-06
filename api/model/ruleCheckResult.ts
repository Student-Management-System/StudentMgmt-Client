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

export interface RuleCheckResult { 
    passed: boolean;
    achievedPoints: number;
    achievedPercent: number;
    comment?: string;
    rule: RuleCheckResult.RuleEnum;
    assignmentType: RuleCheckResult.AssignmentTypeEnum;
}
export namespace RuleCheckResult {
    export type RuleEnum = 'INDIVIDUAL_PERCENT_WITH_ALLOWED_FAILURES' | 'REQUIRED_PERCENT_OVERALL';
    export const RuleEnum = {
        INDIVIDUALPERCENTWITHALLOWEDFAILURES: 'INDIVIDUAL_PERCENT_WITH_ALLOWED_FAILURES' as RuleEnum,
        REQUIREDPERCENTOVERALL: 'REQUIRED_PERCENT_OVERALL' as RuleEnum
    };
    export type AssignmentTypeEnum = 'HOMEWORK' | 'TESTAT' | 'SEMINAR' | 'PROJECT' | 'OTHER';
    export const AssignmentTypeEnum = {
        HOMEWORK: 'HOMEWORK' as AssignmentTypeEnum,
        TESTAT: 'TESTAT' as AssignmentTypeEnum,
        SEMINAR: 'SEMINAR' as AssignmentTypeEnum,
        PROJECT: 'PROJECT' as AssignmentTypeEnum,
        OTHER: 'OTHER' as AssignmentTypeEnum
    };
}