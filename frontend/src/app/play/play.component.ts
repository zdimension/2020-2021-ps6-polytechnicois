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

    public numquestion=1;

    ngOnInit(): void {
        this.getQuiz();
    }

    getQuiz(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.quizService.getQuizById(id)
            .subscribe(quiz => this.quiz = quiz);
    }

    reponseCliquee(n): void
    {
        if(this.quiz.questions[0].correctAnswer == n) {
            console.log("Correct");
        } else {
            console.log("T'es nul vieux crouton !!");
        }
        this.quiz.questions[0].answers=[this.quiz.questions[0].answers[this.quiz.questions[0].correctAnswer]];
    }
}
