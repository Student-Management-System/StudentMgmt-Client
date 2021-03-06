import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
	email = "max.mustermann@test.com";
	errorMessage: string;

	constructor(private authService: AuthService) {}

	async login(): Promise<void> {
		const authCredentials = { email: this.email, password: "no_pw_required" };
		await this.authService.login(authCredentials).catch(error => {
			this.errorMessage = error;
		});
	}

	async loginAsTutor(): Promise<void> {
		const authCredentials = { email: "john.doe@test.com", password: "no_pw_required" };
		await this.authService.login(authCredentials).catch(error => {
			this.errorMessage = error;
		});
	}

	async loginAsLecturer(): Promise<void> {
		const authCredentials = { email: "mgtm.admin@test.com", password: "no_pw_required" };
		await this.authService.login(authCredentials).catch(error => {
			this.errorMessage = error;
		});
	}
}
