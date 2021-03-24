import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizListComponent } from "./quizzes/quiz-list/quiz-list.component";
import { EditQuizComponent } from "./quizzes/quiz-edit/edit-quiz.component";
import { QuestionList } from "./question/question-list/question-list.component";
import { UserListComponent } from "./users/user-list/user-list.component";

import { AccueilComponent } from "./accueil/accueil.component";
import { CreationCompteComponent } from "./creationcompte/creationcompte.component";

const routes: Routes = [
    { path: "", redirectTo: "/quiz-list", pathMatch: "full" },
    { path: "quiz-list", component: QuizListComponent },
    { path: "edit-quiz/:id", component: EditQuizComponent },
    { path: "question-quiz/:id", component: QuestionList },
    { path: "user-list", component: UserListComponent },
    { path: "accueil", component: AccueilComponent },
    { path: "creationcompte", component: CreationCompteComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{

}
