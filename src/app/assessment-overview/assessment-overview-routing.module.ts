import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssessmentAllocationOverviewComponent } from "./assessment-allocation-overview/assessment-allocation-overview.component";
import { AssessmentOverviewComponent } from "./assessment-overview/assessment-overview.component";
import { CreatedAssessmentsComponent } from "./created-assessments/created-assessments.component";
import { RegisteredGroupsComponent } from "./registered-groups/registered-groups.component";

// courses/:courseId/assignments/:assignmentId/assessments
const routes: Routes = [
	{
		path: "",
		component: AssessmentOverviewComponent,
		children: [
			{
				path: "allocations",
				component: AssessmentAllocationOverviewComponent,
				pathMatch: "full"
			},
			{ path: "created", component: CreatedAssessmentsComponent },
			{ path: "registrations", component: RegisteredGroupsComponent, pathMatch: "full" },
			{
				path: "editor",
				loadChildren: () =>
					import("../assessment-editor/assessment-editor.module").then(
						m => m.AssessmentEditorModule
					)
			},
			{ path: "", redirectTo: "created", pathMatch: "full" }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AssessmentOverviewRoutingModule {}
