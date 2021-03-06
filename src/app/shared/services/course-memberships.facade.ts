import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { CourseDto, CourseParticipantsService, UsersService } from "../../../../api";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({ providedIn: "root" })
export class CourseMembershipsFacade {
	private coursesSubject = new BehaviorSubject<CourseDto[]>([]);
	public courses$ = this.coursesSubject.asObservable();

	constructor(
		private courseParticipantsService: CourseParticipantsService,
		private userService: UsersService,
		private authService: AuthService
	) {
		this.authService.user$.subscribe(user => {
			if (user) {
				this.loadCoursesOfUser(user.id);
			} else {
				this.coursesSubject.next([]);
			}
		});
	}

	/** Allows to manually query the API for the user's courses. Results will be emitted via the courses-observable. */
	loadCoursesOfUser(userId: string): void {
		if (userId) {
			this.userService.getCoursesOfUser(userId).subscribe(
				courses => {
					this.coursesSubject.next(courses);
				},
				error => console.log(error)
			);
		}
	}

	/**
	 * Adds the user to the course and updates the user's courses.
	 * If joining fails, the error will be passed on to the caller.
	 */
	joinCourse(courseId: string, password?: string): Observable<void> {
		const userId = this.getUserId();
		return this.courseParticipantsService.addUser({ password }, courseId, userId).pipe(
			switchMap(success => {
				this.loadCoursesOfUser(userId);
				return of(null);
			}),
			catchError(error => {
				console.log(error);
				return throwError(error);
			})
		);
	}

	/**
	 * Removes the user from the course and updates the user's courses.
	 * If leaving fails, the error will be passed on to the caller.
	 */
	leaveCourse(courseId: string): Observable<void> {
		const userId = this.getUserId();

		return this.courseParticipantsService.removeUser(courseId, userId).pipe(
			switchMap(success => {
				const courses = this.coursesSubject.getValue().filter(c => c.id !== courseId);
				this.coursesSubject.next(courses);
				return of(null);
			}),
			catchError(error => {
				console.log(error);
				return throwError(error);
			})
		);
	}

	private getUserId(): string {
		return this.authService.getAuthToken()?.user.id;
	}
}
