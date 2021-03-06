import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { filter, take } from "rxjs/operators";
import { AssignmentDto, GroupDto, UsersService, AssessmentsService } from "../../../../../api";
import { getRouteParam } from "../../../../../utils/helper";
import { Participant } from "../../../domain/participant.model";
import {
	ConfirmDialog,
	ConfirmDialogData
} from "../../../shared/components/dialogs/confirm-dialog/confirm-dialog.dialog";
import { UnsubscribeOnDestroy } from "../../../shared/components/unsubscribe-on-destroy.component";
import { ToastService } from "../../../shared/services/toast.service";
import {
	EditAssignmentDialog,
	EditAssignmentDialogData
} from "../../dialogs/edit-assignment/edit-assignment.dialog";
import { AssignmentManagementFacade } from "../../services/assignment-management.facade";
import { Course } from "../../../domain/course.model";
import { TranslateService } from "@ngx-translate/core";
import { ParticipantFacade } from "../../../shared/services/participant.facade";

@Component({
	selector: "app-assignment-card",
	templateUrl: "./assignment-card.component.html",
	styleUrls: ["./assignment-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentCardComponent extends UnsubscribeOnDestroy implements OnInit {
	@Input() assignment: AssignmentDto;
	@Input() course: Course;

	_participant: Participant;
	@Input() set participant(p: Participant) {
		this._participant = p;
		if (this.studentShouldHaveAGroup(this.assignment, this._participant)) {
			this.displayGroupOrWarning();
		}
	}

	group$ = new Subject<GroupDto>();

	/**
	 * Can be used to display a warning about this assignment, i.e. "You have no group for this assignment."
	 * Will be translated in the template.
	 */
	warning?: string;

	typeEnum = AssignmentDto.TypeEnum;
	stateEnum = AssignmentDto.StateEnum;
	collaborationEnum = AssignmentDto.CollaborationEnum;
	courseId: string;

	constructor(
		private participantFacade: ParticipantFacade,
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private assignmentManagement: AssignmentManagementFacade,
		private userService: UsersService,
		private translate: TranslateService,
		private toast: ToastService
	) {
		super();
	}

	ngOnInit(): void {
		this.courseId = getRouteParam("courseId", this.route);
	}

	private displayGroupOrWarning(): void {
		this.subs.sink = this.participantFacade.assignmentGroups$
			.pipe(
				filter(tuples => !!tuples),
				take(1)
			)
			.subscribe(tuples => {
				const group = tuples.find(a => a.assignment.id === this.assignment.id)?.group;

				if (!group && this.assignment.state === "IN_PROGRESS") {
					this.warning = this.translate.instant("Text.Group.NoGroupForAssignment");
					this.toast.warning("Text.Group.NoGroupForAssignment", this.assignment.name);
				}

				this.group$.next(group);
			});
	}

	private studentShouldHaveAGroup(assignment: AssignmentDto, participant: Participant): boolean {
		return (
			assignment.collaboration === AssignmentDto.CollaborationEnum.GROUP &&
			participant.isStudent
		);
	}

	openEditDialog(): void {
		const data: EditAssignmentDialogData = {
			courseId: this.courseId,
			assignmentId: this.assignment.id
		};
		this.dialog.open(EditAssignmentDialog, { data });
	}

	onDelete(): void {
		const data: ConfirmDialogData = { params: [this.assignment.name] };
		this.dialog
			.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, { data })
			.afterClosed()
			.subscribe(confirmed => {
				if (confirmed) {
					this.subs.sink = this.assignmentManagement
						.remove(this.assignment, this.courseId)
						.subscribe(deleted => {
							this.toast.success(this.assignment.name, "Message.Removed");
						});
				}
			});
	}

	/**
	 * Navigates the user to his assessment for this assignment.
	 */
	goToAssessment(): void {
		this.subs.sink = this.userService
			.getAssessmentOfUser(this._participant.userId, this.courseId, this.assignment.id)
			.subscribe({
				next: assessment => {
					this.router.navigate([
						"/courses",
						this.courseId,
						"assignments",
						this.assignment.id,
						"assessments",
						"view",
						assessment.id
					]);
				},
				error: error => {
					this.toast.apiError(error);
				}
			});
	}
}
