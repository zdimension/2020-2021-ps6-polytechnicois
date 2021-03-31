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
    private firstStage=true;
    public answersDisplayed: string[];
    public quizname: string;
    public quizdifficulty: number;
    public questionlabel: string;
    public questionCount=0;

    ngOnInit(): void {
        this.getQuiz();
    }

    getQuiz(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.quizService.getQuizById(id)
            .subscribe(quiz => {
                this.quiz = quiz
                this.quizname=this.quiz.name;
                this.answersDisplayed=this.quiz.questions[this.numquestion-1].answers;
                this.quizdifficulty=this.quiz.difficulty;
                this.questionlabel=this.quiz.questions[this.numquestion-1].label;
                this.questionCount=this.quiz.questions.length;
            });
    }

    reponseCliquee(n): void
    {
        console.log(this.firstStage);
        console.log(this.numquestion);
        this.questionlabel=this.quiz.questions[this.numquestion-1].label;
        if(this.firstStage)
        {
            if(this.quiz.questions[this.numquestion-1].correctAnswer == n) {
                console.log("Correct");
            } else {
                console.log("Incorrect");
            }
            this.answersDisplayed=[this.quiz.questions[this.numquestion-1].answers[this.quiz.questions[this.numquestion-1].correctAnswer]];
        }
        else
        {
            this.answersDisplayed=this.quiz.questions[this.numquestion-1].answers;
            this.numquestion++;
            if(this.numquestion > this.questionCount) {
                console.log("Quiz termine");
            }
        }
        this.firstStage=!this.firstStage;
    }
}
