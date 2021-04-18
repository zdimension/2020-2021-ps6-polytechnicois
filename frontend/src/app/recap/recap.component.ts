import { Component, HostBinding, OnInit } from "@angular/core";
import { QuizService } from "../../services/quiz.service";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from "../../models/quiz.model";
import { Question } from "../../models/question.model";
import { User } from "../../models/user.model";

@Component({
    selector: "app-recap",
    templateUrl: "./recap.component.html",
    styleUrls: ["./recap.component.scss"]
})
export class RecapComponent implements OnInit
{

    public urlImage: string = "";
    public question: string = "";
    public goodAnswer: string = "";
    public quiz: Quiz = null;
    private numQuestion: number = 0;
    private id: number = 1;
    private history = {};
    private questionCount: number = 0;
    private user: User = null;

    constructor(public quizService: QuizService, public userService: UserService, private router: Router, private route: ActivatedRoute)
    {
    }

    ngOnInit(): void
    {
        this.userService.currentUser.subscribe(user =>
        {
            if (user === null)
            {
                return;
            }
            this.user = user;
            if (this.user.ignoredQuestions === null)
            {
                this.user.ignoredQuestions = [];
            }
            this.getQuiz();
        });
        //this.getQuiz();
        this.numQuestion = 0;
        this.history = {};
    }

    /**
     * Get the quiz corresponding at the id given on the URL
     */
    getQuiz(): void
    {
        this.id = +this.route.snapshot.paramMap.get("id");
        this.quizService.getQuizById(this.id)
            .subscribe(quiz =>
            {
                this.quiz = quiz;
                this.questionCount = this.quiz.questions.length;
                while (this.numQuestion < this.questionCount && this.user.ignoredQuestions.includes(this.quiz.questions[this.numQuestion].id))
                {
                    this.numQuestion++;
                }
                this.showQuestion();
            });
    }

    /**
     * Switch to next question.
     * Then call showQuestion() to change displayed question.
     * If we finish the recap, set class field quiz to null, indicating we have to display the ending message.
     */
    nextQestion(compris: boolean): void
    {
        this.numQuestion++;
        while (this.numQuestion < this.questionCount && this.user.ignoredQuestions.includes(this.quiz.questions[this.numQuestion].id))
        {
            this.numQuestion++;
        }
        this.history[(this.numQuestion - 1).toString()] = compris;
        if (this.numQuestion >= this.quiz.questions.length)
        {
            console.log("here");
            this.quiz = null;
            this.quizService.uploadRecap(this.id, this.history);
            return;
        }
        this.showQuestion();
    }

    /**
     * On "S'entrainer" button triggered
     */
    goToTrain(): void
    {
        this.router.navigate(["play/" + this.id], {
            skipLocationChange: false,
            replaceUrl: true,
            queryParams: { "trainmode": true }
        });
    }

    @HostBinding("style.--rating") //Binds the TS variable `quizdifficulty` to the scss variable `--rating`
    getDifficulty(): number
    {
        return this.quiz.difficulty;
    }

    /**
     * Update displayed question with corresponding quizz question
     * @private
     */
    private showQuestion(): void
    {
        if (this.quiz === null)
        {
            return;
        }
        let question: Question = this.quiz.questions[this.numQuestion];
        this.question = question.label;
        this.urlImage = question.image;
        if (this.urlImage === undefined)
        {
            this.urlImage = null;
        }
        this.goodAnswer = question.answers[question.correctAnswer];
    }
}
