import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs/Rx";
import { Quiz } from "../models/quiz.model";
import { HttpClient } from "@angular/common/http";
import { Question } from "../models/question.model";
import { QuizTheme } from "../models/quiztheme.model";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class QuizService
{
    /**
     * Services Documentation:
     * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
     */

    private quizzes = [];
    public quizzes$ = new BehaviorSubject(this.quizzes);

    private themes = [];
    public themes$ = new BehaviorSubject(this.themes);

    private dataURL = new URL("http://localhost:9428/");
    public user: User;

    constructor(private http: HttpClient, public userService: UserService, private router: Router)
    {
        this.getQuizzes();
        this.getThemes();
        this.userService.currentUser.subscribe((user) => this.user = user);
    }

    addQuiz(quiz: Quiz): void
    {
        this.quizzes.push(quiz);
        // You need here to update the list of quiz and then update our observable (Subject) with the new list
        // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    }

    deleteQuiz(quiz: Quiz): void
    {
        const index = this.quizzes.findIndex((element) => element === quiz);
        this.quizzes.splice(index, 1);
    }

    getQuizzes(): void
    {
        this.http.get<Quiz[]>(this.dataURL.toString() + "quizzes").subscribe((tickets) =>
        {
            this.quizzes = tickets;
            this.quizzes$.next(tickets);
        });
    }

    getQuiz(id: number): Quiz
    {
        return this.quizzes.find(quiz => quiz.id === id);
        // return this.http.get<Quiz>(this.dataURL + "/" + id).pipe();
    }

    getQuizById(id: number): Observable<Quiz>
    {
        return this.http.get<Quiz>(this.dataURL + "quizzes" + "/" + id);
    }

    getQuizSub(id: string): BehaviorSubject<Quiz>
    {
        return new BehaviorSubject<Quiz>(this.quizzes.find(quiz => quiz.id === id));
    }

    updateQuiz(quizGiven: Quiz): void
    {
        const quizToUpdate = this.getQuiz(quizGiven.id);
        quizToUpdate.theme = quizGiven.theme;
        quizToUpdate.name = quizGiven.name;
    }

    getThemes(): void
    {
        this.http.get<Quiz[]>(this.dataURL.toString() + "themes").subscribe((tickets) =>
        {
            this.themes = tickets;
            this.themes$.next(tickets);
        });
    }

    addQuestionToQuiz(question: Question, quiz: Quiz): void
    {
        quiz.questions.push(question);
    }

    deleteQuestion(question: Question, quiz: Quiz): void
    {
        const indexQues = quiz.questions.findIndex((element) => element === question);
        const indexQuiz = this.quizzes.findIndex((element) => element === quiz);
        this.quizzes[indexQuiz].questions.splice(indexQues, 1);
    }
}
