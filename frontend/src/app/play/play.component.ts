import { Component, HostBinding, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz.model";
import { QuizService } from "../../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-play",
    templateUrl: "./play.component.html",
    styleUrls: ["./play.component.scss"]
})
export class PlayComponent implements OnInit
{

    quiz: Quiz;
    constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router)
    {
    }

    public numquestion=1;
    private firstStage=true;
    public answersDisplayed: string[];
    public quizname: string;
    @HostBinding("style.--rating")
    public quizdifficulty: number;
    public questionlabel: string;
    public questionCount=0;
    public correctAnswer=0;
    public displayedMessage="Selectionnez la bonne reponse";
    public quizTermine=false;
    public urlImage: string=null;
    public trainMode: boolean=false;
    public displayedInTrainMode: boolean[]=[];

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.trainMode=params.hasOwnProperty('trainmode');
        });
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
                this.correctAnswer=this.quiz.questions[this.numquestion-1].correctAnswer;
                this.urlImage=this.quiz.questions[this.numquestion-1].image;
                this.updateDisplayedInTrainMode();
            });
    }

    reponseCliquee(n): void
    {
        if(this.quizTermine) {
            return;
        }
        this.questionlabel=this.quiz.questions[this.numquestion-1].label;
        if(this.firstStage)
        {
            if(this.quiz.questions[this.numquestion-1].correctAnswer == n) {
                console.log("Correct");
            } else {
                console.log("Incorrect");
            }
            this.displayedMessage="Cliquez sur la bonne réponse";
        }
        else
        {
            this.numquestion++;
            if(this.numquestion > this.questionCount) {
                console.log("Quiz termine");
                this.displayedMessage="Quiz terminé";
                this.quizTermine=true;
                this.numquestion--;
                return;
            }
            this.answersDisplayed=this.quiz.questions[this.numquestion-1].answers;
            this.questionlabel=this.quiz.questions[this.numquestion-1].label;
            this.correctAnswer=this.quiz.questions[this.numquestion-1].correctAnswer;
            this.urlImage=this.quiz.questions[this.numquestion-1].image;
            this.displayedMessage="Selectionnez la bonne reponse";
            this.updateDisplayedInTrainMode();
        }
        this.firstStage=!this.firstStage;
    }

    public getRandom(min: number, max: number): number
    {
        if(min > max) {
            let tmp=min;
            min=max;
            max=tmp;
        }
        return min+Math.round(Math.random() * (max-min));
    }

    private updateDisplayedInTrainMode(): void
    {
        this.displayedInTrainMode=[];
        for(let i=0; i < this.questionCount; i++) {
            this.displayedInTrainMode.push(i!=this.correctAnswer && this.getRandom(0, 1) === 1);
        }
    }

    public goToTrain(): void
    {
        this.trainMode=true;
        this.numquestion=1;
        this.quizTermine=false;
        this.getQuiz();
        this.router.navigate([this.router.url.split('?')[0]], {skipLocationChange: false, replaceUrl: true, queryParams: {'trainmode' :true}});
    }

}
