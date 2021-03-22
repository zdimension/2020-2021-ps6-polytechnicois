import { Component, OnInit } from "@angular/core";
import { Question } from "../../../models/question.model";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "../../../services/quiz.service";
import { Quiz } from "../../../models/quiz.model";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-question-list",
    templateUrl: "./question-list.component.html",
    styleUrls: ["./question-list.component.scss"]
})
export class QuestionList implements OnInit
{

    public quizzId: string;
    public quiz: BehaviorSubject<Quiz>;
    public questionList: Question[] = [];

    constructor(public route: ActivatedRoute, public quizService: QuizService)
    {
        this.getQuiz();
        new BehaviorSubject(this.quizService.getQuiz(this.route.snapshot.paramMap.get("id")).questions).subscribe((question) =>
        {
            return this.questionList = question;
        });


    }

    ngOnInit(): void
    {
    }

    getQuiz(): void
    {
        this.quizzId = this.route.snapshot.paramMap.get("id");
        this.quiz = this.quizService.getQuizSub(this.quizzId);
        console.log(this.quiz);
    }

    deleteQuestion(question: Question): void
    {
        this.quizService.deleteQuestion(question, this.quiz.getValue());
    }
}
