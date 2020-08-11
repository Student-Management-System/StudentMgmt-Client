import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ThemeService {

	availableThemes = [
		"default",
		"dark"
	]

	private themeSubject: BehaviorSubject<string>;
	theme$: Observable<string>;

	constructor() {
		const theme = localStorage.getItem("theme") ?? "default";

		this.themeSubject = new BehaviorSubject(theme);
		this.theme$ = this.themeSubject.asObservable()
			.pipe(distinctUntilChanged((x, y) => x === y));
	}

	/**
	 * Emits the new theme via `theme$` and stores it in the storage.
	 * Theme must be included in `availableThemes`.
	 */
	setTheme(theme: string): void {
		if (this.availableThemes.includes(theme)) {
			localStorage.setItem("theme", theme);
			this.themeSubject.next(theme);
		} else {
			console.error(`Theme '${theme}' is not a registered theme.`);
		}
	}

}