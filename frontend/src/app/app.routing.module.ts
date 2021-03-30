import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizListComponent } from "./quizzes/quiz-list/quiz-list.component";
import { EditQuizComponent } from "./quizzes/quiz-edit/edit-quiz.component";
import { QuestionList } from "./question/question-list/question-list.component";
import { UserListComponent } from "./users/user-list/user-list.component";

import { AccueilComponent } from "./accueil/accueil.component";
import { CreationCompteComponent } from "./creationcompte/creationcompte.component";
import { ConnecteComponent } from "./connecte/connecte.component";
import { GestionComponent } from "./gestion/gestion.component";
import { ScoreComponent } from "./score/score.component";
import { CreationQuizComponent } from "./creationquiz/creationquiz.component";
import { ChoisirQuizComponent } from "./choisirquiz/choisirquiz.component";
import { PlayComponent } from "./play/play.component";

const routes: Routes = [
    { path: "", redirectTo: "/accueil", pathMatch: "full" }, // Rediriger vers accueil
    { path: "quiz-list", component: QuizListComponent },
    { path: "edit-quiz/:id", component: EditQuizComponent },
    { path: "question-quiz/:id", component: QuestionList },
    { path: "user-list", component: UserListComponent },
    { path: "accueil", component: AccueilComponent },
    { path: "creationcompte", component: CreationCompteComponent },
    { path: "connecte", component: ConnecteComponent },
    { path: "gestion", component: GestionComponent },
    { path: "score", component: ScoreComponent },
    { path: "creationquiz", component: CreationQuizComponent },
    { path: "choisirquiz", component: ChoisirQuizComponent },
    { path: "play/:id", component: PlayComponent }
];

// play

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{

}
