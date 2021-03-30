import { Component, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz.model";
import { QuizService } from "../../services/quiz.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-play",
    templateUrl: "./play.component.html",
    styleUrls: ["./play.component.scss"]
})
export class PlayComponent implements OnInit
{

    quiz: Quiz;
    constructor(private quizService: QuizService, private route: ActivatedRoute)
    {
    }

    ngOnInit(): void {
        this.getQuiz();
    }

    getQuiz(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.quizService.getQuizById(id)
            .subscribe(quiz => this.quiz = quiz);
    }
}
