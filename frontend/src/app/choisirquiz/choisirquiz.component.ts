import { Component, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz.model";
import { QuizService } from "../../services/quiz.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { QuizTheme } from "../../models/quiztheme.model";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { User } from "../../models/user.model";

@Component({
    selector: "app-choisirquiz",
    templateUrl: "./choisirquiz.component.html",
    styleUrls: ["./choisirquiz.component.scss"]
})
export class ChoisirQuizComponent implements OnInit
{

    public quizList: Quiz[] = [];
    public quizListDisplayed = this.quizList;
    public choisirQuizForm: FormGroup;
    public listdejafait: string[] = ["Peu importe", "Oui", "Non"];
    public listdifficulte: string[] = ["Peu importe", ">=1", ">=2", ">=3", ">=4", ">=5"];
    public listnbquestions: string[] = ["Peu importe", "Peu", "Moyen", "Beaucoup"];
    public listThemes: QuizTheme[];
    //to collapse filters
    public isCollapsed = true;
    public user: User = null;

    constructor(public quizService: QuizService, public formBuilder: FormBuilder, public userService: UserService, private router: Router)
    {
        this.quizService.quizzes$.subscribe((quiz) =>
        {
            if (quiz === null)
            {
                return;
            }
            this.quizList = quiz;
            this.quizListDisplayed = this.quizList;
            this.parseQuizList();
            return;
        });
        this.choisirQuizForm = this.formBuilder.group({
            theme: new FormControl("Peu importe"),
            dejafait: new FormControl(this.listdejafait[0]),
            difficulte: new FormControl(0),
            nbquestions: new FormControl(this.listnbquestions[0]),
            trierauhasard: new FormControl(false)
        });
        this.quizService.themes$.subscribe((themes) =>
        {
            return this.listThemes = themes;
        });
        this.userService.currentUser.subscribe((user) =>
        {
            this.user = user;
            if (this.user !== null && this.user.role === 1)
            {
                this.listdifficulte = this.listdifficulte.slice(0, this.user.maxDifficulty.valueOf());
                this.parseQuizList();
            }
        });
    }

    ngOnInit(): void
    {
    }

    /**
     * For each quiz, gather questions. And remove specific user forbidden quizzes
     */
    parseQuizList(): void
    {
        for (const quiz of this.quizList)
        {
            this.quizService.getQuizById(quiz.id).subscribe(q =>
            {
                quiz.questions = q.questions;
            });
        }
        this.quizListDisplayed = this.quizList;
        if (this.user !== null && this.user.role == 1)
        {
            this.quizListDisplayed = this.quizList.filter(quiz => quiz.difficulty <= this.user.maxDifficulty.valueOf());
            this.quizListDisplayed = this.quizListDisplayed.filter(quiz => this.user.maxQuestions === null || quiz.questionCount <= this.user.maxQuestions.valueOf() || this.user.maxQuestions.valueOf() === 0);
        }
    }

    /**
     * Change displayed quizzes when filters are triggered
     */
    changeDisplay(): void
    {
        this.quizListDisplayed = this.quizList;
        if (this.choisirQuizForm.get("trierauhasard").value)
        {
            this.quizListDisplayed = this.shuffle(this.quizList);
        }
        let theme = this.choisirQuizForm.get("theme").value;
        if (theme !== "Peu importe")
        {
            this.quizListDisplayed = this.quizList.filter(quiz => quiz.theme.name === theme);
        }
        let difficulte = this.choisirQuizForm.get("difficulte").value;
        this.quizListDisplayed = this.quizListDisplayed.filter(quiz => quiz.difficulty >= difficulte);
        let nbquestions = this.choisirQuizForm.get("nbquestions").value;
        switch (nbquestions)
        {
            case "Peu":
                this.quizListDisplayed = this.quizList.filter(quiz => quiz.questionCount <= 3);
                break;
            case "Moyen":
                this.quizListDisplayed = this.quizList.filter(quiz => quiz.questionCount >= 3 && quiz.questionCount <= 7);
                break;
            case "Beaucoup":
                this.quizListDisplayed = this.quizList.filter(quiz => quiz.questionCount >= 7);
                break;
        }
        if (this.user !== null && this.user.role == 1)
        {
            this.quizListDisplayed = this.quizListDisplayed.filter(quiz => quiz.difficulty <= this.user.maxDifficulty.valueOf());
            this.quizListDisplayed = this.quizListDisplayed.filter(quiz => quiz.questionCount <= this.user.maxQuestions.valueOf() || this.user.maxQuestions.valueOf() === 0);
        }
    }

    public doRandomQuiz(): void
    {
        this.shuffle(this.quizListDisplayed);
        let quiz: Quiz = this.quizListDisplayed[0];
        this.router.navigate(["play/"+quiz.id]);
    }

    /**
     * Shuffle an array
     * @param array
     * @private
     */
    private shuffle(array)
    {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex)
        {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}
