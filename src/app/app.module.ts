import { LayoutModule } from "@angular/cdk/layout";
import { registerLocaleData } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import localeDeExtra from "@angular/common/locales/extra/de";
import { InjectionToken, LOCALE_ID, NgModule } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ToastrModule } from "ngx-toastr";
import { ApiModule, Configuration } from "../../api";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/services/auth.service";
import { MaterialModule } from "./material/material.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { SharedModule } from "./shared/shared.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { StateModule } from "./state/state.module";

registerLocaleData(localeDe, "de", localeDeExtra);

export function createTranslateLoader(http: HttpClient): TranslateLoader {
	return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
	declarations: [AppComponent, NavigationComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		ApiModule.forRoot(
			() =>
				new Configuration({
					basePath: window["__env"]["API_BASE_PATH"] ?? environment.API_BASE_PATH,
					accessToken: (): string => AuthService.getAccessToken()
				})
		),
		AppRoutingModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			positionClass: "toast-bottom-right",
			progressBar: true,
			preventDuplicates: true
		}),
		TranslateModule.forRoot({
			defaultLanguage: localStorage.getItem("language") ?? "de",
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
		StateModule,
		SharedModule,
		MaterialModule,
		LayoutModule,
		AuthModule,
		ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
	],
	providers: [
		{ provide: LOCALE_ID, useValue: "de" },
		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "fill" } }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
