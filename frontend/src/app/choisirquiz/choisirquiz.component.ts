import { Component, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz.model";
import { QuizService } from "../../services/quiz.service";

@Component({
    selector: "app-choisirquiz",
    templateUrl: "./choisirquiz.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class ChoisirQuizComponent implements OnInit
{

    public quizList: Quiz[] = [];

    constructor(public quizService: QuizService)
    {
        this.quizService.quizzes$.subscribe((quiz) =>
        {
            return this.quizList = quiz;
        });
    }

    ngOnInit(): void
    {
    }
}
