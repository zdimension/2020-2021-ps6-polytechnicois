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
            this.quizHistory.sort((a, b) => (b.stats.correct / b.stats.total) - (a.stats.correct / a.stats.total));
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

    changeScoresDisplayedDateHours(): void
    {
        this.attemptsDisplayed = this.attempts;
        this.recapsDisplayed = this.recaps;
        let dates: Date[] = [];
        let hours: number[][] = [];
        dates.push(this.changeFilterScores.get("scoresformdatedebut").value);
        dates.push(this.changeFilterScores.get("scoresformdatefin").value);
        if (this.changeFilterScores.get("scoresformheuredebut").value !== null)
        {
            let hm = this.changeFilterScores.get("scoresformheuredebut").value.split(":");
            hours.push([Number(hm[0]), Number(hm[1])]);
        }
        else
        {
            hours.push([0, 0]);
        }
        if (this.changeFilterScores.get("scoresformheurefin").value !== null)
        {
            let hm = this.changeFilterScores.get("scoresformheurefin").value.split(":");
            hours.push([Number(hm[0]), Number(hm[1])]);
        }
        else
        {
            hours.push([0, 0]);
        }
        if (dates[0] !== null)
        {
            this.attemptsDisplayed = this.attemptsDisplayed.filter(a => a.createdAt >= dates[0]);
        }
        if (dates[1] !== null)
        {
            this.attemptsDisplayed = this.attemptsDisplayed.filter(a => a.createdAt <= dates[1]);
        }
        if (hours[0][0] !== 0 && hours[0][1] !== 0)
        {
            console.log("here");
            this.attemptsDisplayed = this.attemptsDisplayed.filter(a =>
            {
                let creationDate: Date = new Date(a.createdAt);
                return creationDate.getMinutes() + (creationDate.getHours() * 60) >= hours[0][1] + (hours[0][0] * 60);
            });
        }
        if (hours[1][0] !== 0 && hours[1][1] !== 0)
        {
            this.attemptsDisplayed = this.attemptsDisplayed.filter(a =>
            {
                let creationDate: Date = new Date(a.createdAt);
                return creationDate.getMinutes() + (creationDate.getHours() * 60) <= hours[1][1] + (hours[1][0] * 60);
            });
        }

    }

    reset(form: FormGroup): void
    {
        form.reset();
        this.changeScoresDisplayedDateHours();
    }

    goToScores(): void
    {
        this.router.navigate(["gestion/scores/" + this.userId]);
    }
}
