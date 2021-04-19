import { Component, OnInit } from "@angular/core";
import { QuizService } from "../../../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { Quiz } from "../../../models/quiz.model";
import { User } from "../../../models/user.model";
import { AttemptResult } from "../../../models/attemptresult.model";
import { RecapResult } from "../../../models/recapresult.model";
import { QuizHistory } from "../../../models/quizhistory.model";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
    selector: "app-gestion-id-suivi",
    templateUrl: "./gestion-id-suivi.component.html",
    styleUrls: ["./gestion-id-suivi.component.scss"]
})
export class GestionIdSuiviComponent implements OnInit
{

    /**
     * If null, all quizzes will be displayed.
     * Else, the questions of selected quiz will be displayed
     */
    public quiz: Quiz = null;
    public quizList: Quiz[] = [];
    public user: User = null;
    public attemptsDisplayed: AttemptResult[] = [];
    public recapsDisplayed: RecapResult[] = [];
    public resultsDisplayed: boolean[] = [];
    public changeFilterScores: FormGroup;
    public allAttempts: { [quizId: number]: AttemptResult[] } = {};
    public headElements = ["Question", "Échecs/ tentatives", "Échecs/tentatives récap", ""];
    private userId: number = 1;
    private recaps: RecapResult[] = [];
    private attempts: AttemptResult[] = [];
    public quizHistory: QuizHistory[] = [];

    constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router, private userService: UserService, private formBuilder: FormBuilder)
    {
    }

    /**
     * Get userId by URL
     * Get all quizzes
     * Get user
     */
    ngOnInit(): void
    {
        this.userId = +this.route.snapshot.paramMap.get("id");
        this.quizService.quizzes$.subscribe((quizzes) =>
        {
            this.quizList = quizzes;
        });
        this.userService.getUserById(this.userId).subscribe(u =>
        {
            this.user = u;
            /** Prevent accessing attribute of null Object */
            if (this.user.ignoredQuestions === null)
            {
                this.user.ignoredQuestions = [];
            }
        });
        this.userService.getAllAttempts(this.userId).subscribe(a =>
        {
            this.quizHistory = a;
            this.quizHistory.sort((a, b) => ((b.stats.total-b.stats.correct) / b.stats.total) - ((a.stats.total-a.stats.correct) / a.stats.total));
        });
    }

    /**
     * Enable or disable a question for the user
     * @param questionId
     * @param enabled
     */
    enableDisableQuestion(questionId: number, enabled: boolean): void
    {
        this.userService.enableQuestionForUser(questionId, this.user.id, enabled);
        if (this.user.ignoredQuestions === null)
        {
            this.user.ignoredQuestions = [];
        }
        if (enabled)
        {
            this.user.ignoredQuestions = this.user.ignoredQuestions.filter(q => q !== questionId);
        }
        else
        {
            this.user.ignoredQuestions.push(questionId);
        }
    }

    goToGeneral(): void
    {
        this.router.navigate(["gestion/" + this.userId]);
    }

    goToScores(): void
    {
        this.router.navigate(["gestion/scores/" + this.userId]);
    }


}
