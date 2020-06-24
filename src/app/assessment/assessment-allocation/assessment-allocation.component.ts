import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { UserDto, AssessmentAllocationService, AssessmentAllocationDto } from "../../../../api";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { EvaluatorsFacade } from "../services/evaluators.facade";

/**
 * Component that provides a selection of users (evaluators), which can be assigned to a group or user.
 * Assigned evaluator is then be responsible for creating the assessment for the group or user.
 * Should be created for every group or user element in a list.
 * #### Input params
 * - ```evaluators``` - Users that can be assigned, i.e. lecturers and tutors
 * - ```assignedTo``` - The currently assigned tutor/lecturer. May be undefined.
 * - ```courseId``` & ```assignmentId``` - mandatory to determine the context of the request
 * - ```groupId``` OR ```userId``` - The targeted group or user of this component
 */
@Component({
	selector: "app-assessment-allocation",
	templateUrl: "./assessment-allocation.component.html",
	styleUrls: ["./assessment-allocation.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssessmentAllocationComponent implements OnInit {

	/** Id of the group that should be assigned to the selected tutor/lecturer. */
	@Input() groupId: string;
	/** Id of the user that should be assigned to the selected tutor/lecturer. */
	@Input() userId: string;
	/** Id of the currently assigned tutor/lecturer. May be undefined. */
	@Input() assignedTo: string | undefined;
	@Input() courseId: string;
	@Input() assignmentId: string;

	evaluators: UserDto[];
	evaluator: UserDto;

	constructor(private allocationService: AssessmentAllocationService,
				private evaluatorsFacade: EvaluatorsFacade,
				private snackbar: SnackbarService) { }

	ngOnInit(): void {
		this.evaluators = this.evaluatorsFacade.getEvaluators();
		this.evaluator = this.evaluatorsFacade.getEvaluatorById(this.assignedTo);
	}

	/** Handles the (de)selection of an evaluator. */
	handleEvaluatorChange(evaluator: UserDto | undefined): void {
		// If no evaluator was assigned previously and user selected nobody
		if (!this.assignedTo && !evaluator) {
			return;
		}

		if (!evaluator) {
			// If evaluator was removed
			this.removeAllocation();
		} else if (this.assignedTo !== evaluator?.id) {
			// If evaluator wasn't already assigned to this group/user, assign evaluator
			this.assignEvaluator(evaluator);
		}
	}

	/** Assigns an evaluator to a group or user. */
	assignEvaluator(evaluator: UserDto): void {
		const allocation: AssessmentAllocationDto = {
			assignmentId: this.assignmentId,
			assignedEvaluatorId: evaluator.id,
		};

		// Determine if we're assigning to a group or user
		if (this.groupId) {
			allocation.groupId = this.groupId;
		} else if (this.userId) {
			allocation.userId = this.userId;
		}

		this.allocationService.createAllocation(allocation, this.courseId, this.assignmentId).subscribe(
			result => {
				this.evaluator = evaluator;
				this.assignedTo = evaluator.id;
				this.snackbar.openSuccessMessage();
			},
			error => {
				console.log(error);
				this.snackbar.openErrorMessage();
			}
		);
	}

	/** Removes the assigned evaluator from the group or user. */
	removeAllocation(): void {
		this.allocationService.removeAllocation(this.courseId, this.assignmentId, this.groupId, this.userId).subscribe(
			result => {
				this.evaluator = undefined;
				this.assignedTo = undefined;
				this.snackbar.openSuccessMessage();
			},
			error => {
				console.log(error);
				this.snackbar.openErrorMessage();
			}
		);
	}

}
