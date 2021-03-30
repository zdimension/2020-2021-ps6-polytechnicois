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
        console.log("here");
        for(let i = 0; i < this.quizList.length; i++)
        {
            this.quizService.getQuizById(this.quizList[i].id).subscribe(q => {
                this.quizList[i].questions = q.questions;
                console.log(q);
            });
        }
    }
}
