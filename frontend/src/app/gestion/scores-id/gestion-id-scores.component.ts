import { Component, HostBinding, OnInit } from "@angular/core";
import { QuizService } from "../../../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { Quiz } from "../../../models/quiz.model";
import { User } from "../../../models/user.model";

@Component({
    selector: "app-gestion-id-scores",
    templateUrl: "./gestion-id-scores.component.html"/*,
    styleUrls: ["./play.component.scss"]*/
})
export class GestionIdScoresComponent implements OnInit
{

    public quiz: Quiz=null;
    public quizList: Quiz[]=[];
    public user: User=null;
    private userId: number=1;

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
        this.quizService.getQuizById(idQuiz).subscribe(q => {
            this.quiz=q;
        });
    }

    resetQuiz(): void {
        this.quiz=null;
    }

    returnToParams(): void {
        this.router.navigate(['gestion/'+this.userId]);
    }

}
