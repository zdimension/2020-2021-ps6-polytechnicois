import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app.routing.module";

import { AppComponent } from "./app.component";
import { QuizListComponent } from "./quizzes/quiz-list/quiz-list.component";
import { QuizComponent } from "./quizzes/quiz/quiz.component";
import { HeaderComponent } from "./header/header.component";
import { QuizFormComponent } from "./quizzes/quiz-form/quiz-form.component";
import { EditQuizComponent } from "./quizzes/quiz-edit/edit-quiz.component";
import { QuestionsComponent } from "./question/question/question.component";
import { QuestionList } from "./question/question-list/question-list.component";
import { QuestionForm } from "./question/question-form/question-form.component";
import { UserComponent } from "./users/user/user.component";
import { UserFormComponent } from "./users/user-form/user-form.component";
import { UserListComponent } from "./users/user-list/user-list.component";

import { AccueilComponent } from "./accueil/accueil.component";

@NgModule({
    declarations: [
        AppComponent,
        QuizListComponent,
        QuizComponent,
        HeaderComponent,
        QuizFormComponent,
        EditQuizComponent,
        QuestionsComponent,
        QuestionList,
        QuestionForm,
        UserComponent,
        UserFormComponent,
        UserListComponent,
        AccueilComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{
}
