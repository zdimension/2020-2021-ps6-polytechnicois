import { Component, HostBinding, OnInit } from "@angular/core";
import { QuizService } from "../../../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { Quiz } from "../../../models/quiz.model";
import { User } from "../../../models/user.model";
import { AttemptResult } from "../../../models/attemptresult.model";
import { RecapResult } from "../../../models/recapresult.model";

@Component({
    selector: "app-gestion-id-scores",
    templateUrl: "./gestion-id-scores.component.html",
    styleUrls: ["./gestion-id-scores.component.scss"]
})
export class GestionIdScoresComponent implements OnInit
{

    public quiz: Quiz=null;
    public quizList: Quiz[]=[];
    public user: User=null;
    private userId: number=1;
    public attempts: AttemptResult[]=[];
    public recaps: RecapResult[]=[];
    public resultsDisplayed: boolean[]=[];

    constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router, private userService: UserService)
    {
    }

    ngOnInit(): void
    {
        this.userId = +this.route.snapshot.paramMap.get("id");
        this.quizService.quizzes$.subscribe((quizzes) => {
            this.quizList=quizzes;
        });
        this.userService.getUserById(this.userId).subscribe(u => {
            this.user=u;
        });
    }

    setQuiz(idQuiz: number): void {
        this.resultsDisplayed=[];
        this.quizService.getQuizById(idQuiz).subscribe(q => {
            this.quiz=q;
            this.quizService.getAttempts(idQuiz, this.userId).subscribe(a => {
                this.attempts=a;
            });
            this.quizService.getRecaps(idQuiz, this.userId).subscribe(r => {
                this.recaps=r;
            });
            this.quiz.questions.forEach(q => {
                this.resultsDisplayed.push(false);
            });
        });
    }

    resetQuiz(): void {
        this.quiz=null;
        this.attempts=[];
        this.recaps=[];
    }

    returnToParams(): void {
        this.router.navigate(['gestion/'+this.userId]);
    }
}
