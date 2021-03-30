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
            this.quizList = quiz;
            this.parseQuizList();
            return;
        });
    }

    ngOnInit(): void
    {
    }

    parseQuizList(): void
    {
        for (const quiz of this.quizList)
        {
            this.quizService.getQuizById(quiz.id).subscribe(q => {
                quiz.questions = q.questions;
                console.log(q);
            });
        }
    }
}
