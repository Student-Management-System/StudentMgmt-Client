import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GroupDto, ParticipantDto } from "../../../../../api";
import { Course } from "../../../domain/course.model";
import { Group } from "../../../domain/group.model";
import { Participant } from "../../../domain/participant.model";
import { SearchParticipantDialog } from "../../../shared/components/dialogs/search-participant/search-participant.dialog";
import { DialogService } from "../../../shared/services/dialog.service";
import { JoinGroupDialog, JoinGroupDialogData } from "../../dialogs/join-group/join-group.dialog";
import { ParticipantFacade } from "../../../shared/services/participant.facade";
import { take } from "rxjs/operators";

@Component({
	selector: "app-group-card",
	templateUrl: "./group-card.component.html",
	styleUrls: ["./group-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupCardComponent implements OnInit {
	@Input() group: Group;
	@Input() course: Course;
	@Input() participant: Participant;

	/** Emits a group that should be removed. */
	@Output() onRemoveGroup = new EventEmitter<GroupDto>();
	/** Emits a `participant` and the group that the participant should be added to. */
	@Output() onAddParticipant = new EventEmitter<{
		group: GroupDto;
		participant: ParticipantDto;
	}>();

	cssClass: string;

	constructor(
		private dialog: MatDialog,
		private participantFacade: ParticipantFacade,
		private router: Router,
		private dialogService: DialogService
	) {}

	ngOnInit(): void {
		if (this.group.hasNotEnoughMembers(this.course)) {
			this.cssClass = "WARNING";
		}
	}

	/**
	 * Opens the `JoinGroupDialog`.
	 * If the students is already in a group, the `ConfirmDialog` will be opened and
	 * if confirmed, student will be removed from current group before the `JoinGroupDialog` is opened.
	 */
	onJoinGroup(): void {
		if (this.participant.groupId) {
			this.participantFacade
				.leaveGroup(this.participant.group, "Text.Group.LeaveToJoinOther")
				.pipe(take(1))
				.subscribe(leftGroup => {
					if (leftGroup) {
						this.openJoinGroupDialog();
					}
				});
		} else {
			this.openJoinGroupDialog();
		}
	}

	/**
	 * Opens the `JoinGroupDialog` and navigates to the group if the user joined
	 * this group.
	 */
	openJoinGroupDialog(): void {
		const data: JoinGroupDialogData = {
			courseId: this.course.id,
			group: this.group,
			participant: this.participant
		};
		this.dialog
			.open<JoinGroupDialog, JoinGroupDialogData, boolean>(JoinGroupDialog, { data })
			.afterClosed()
			.subscribe(joined => {
				if (joined) {
					this.participantFacade.reload();
					this.router.navigate(["/courses", this.course.id, "groups", this.group.id]);
				}
			});
	}

	/**
	 * Opens the `SearchParticipantDialog` and emits the selected Participant (and Group) via `onAddParticipant`.
	 */
	addParticipant(): void {
		this.dialog
			.open<SearchParticipantDialog, string, ParticipantDto[]>(SearchParticipantDialog, {
				data: this.course.id
			})
			.afterClosed()
			.subscribe(participants => {
				// Emit the selected participant, if one was selected
				if (participants?.length > 0) {
					this.onAddParticipant.emit({
						group: this.group,
						participant: participants[0]
					});
				}
			});
	}

	/**
	 * Emits that this group should be removed, if the user confirms it.
	 */
	removeGroup(): void {
		this.dialogService
			.openConfirmDialog({
				title: "Action.Custom.RemoveGroup",
				params: [this.group.name]
			})
			.subscribe(confirmed => {
				if (confirmed) {
					this.onRemoveGroup.emit(this.group);
				}
			});
	}
}
