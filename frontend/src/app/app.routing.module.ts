import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizListComponent } from "./quizzes/quiz-list/quiz-list.component";
import { EditQuizComponent } from "./quizzes/quiz-edit/edit-quiz.component";
import { QuestionList } from "./question/question-list/question-list.component";
import { UserListComponent } from "./users/user-list/user-list.component";

import { ConnexionComponent } from "./connexion/connexion.component";
import { CreationCompteComponent } from "./creationcompte/creationcompte.component";
import { AccueilComponent } from "./accueil/accueil.component";
import { GestionComponent } from "./gestion/gestion.component";
import {GestionIdComponent} from "./gestion/gestion-id/gestion-id.component";
import { ScoreComponent } from "./score/score.component";
import { CreationQuizComponent } from "./creationquiz/creationquiz.component";
import { ChoisirQuizComponent } from "./choisirquiz/choisirquiz.component";
import { PlayComponent } from "./play/play.component";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    { path: "quiz-list", component: QuizListComponent },
    { path: "edit-quiz/:id", component: EditQuizComponent },
    { path: "question-quiz/:id", component: QuestionList },
    { path: "user-list", component: UserListComponent },
    { path: "", component: AccueilComponent },
    { path: "gestion", component: GestionComponent },
    { path: "gestion/:id", component: GestionIdComponent},
    { path: "score", component: ScoreComponent },
    { path: "creationquiz", component: CreationQuizComponent },
    { path: "choisirquiz", component: ChoisirQuizComponent },
    { path: "play/:id", component: PlayComponent }
];

routes.forEach(route => route.canActivate = [AuthGuard]);

routes.push(
    { path: "connexion", component: ConnexionComponent },
    { path: "creationcompte", component: CreationCompteComponent }
);

// play

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{

}
