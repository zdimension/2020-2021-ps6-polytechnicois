import { Component, HostBinding, OnInit } from "@angular/core";
import { QuizService } from "../../services/quiz.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from "../../models/quiz.model";
import { Question } from "../../models/question.model";

@Component({
    selector: "app-recap",
    templateUrl: "./recap.component.html",
    styleUrls: ["./recap.component.scss"]
})
export class RecapComponent implements OnInit
{

    private numQuestion: number=0;
    public urlImage: string="";
    public question: string="";
    public goodAnswer: string="";
    public quiz: Quiz=null;
    private id: number=1;

    constructor(public quizService: QuizService, public userService: UserService, private router: Router, private route: ActivatedRoute)
    {
    }

    ngOnInit(): void
    {
        this.getQuiz();
        this.numQuestion=0;
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
                this.quiz=quiz;
                this.showQuestion();
            });
    }

    /**
     * Update displayed question with corresponding quizz question
     * @private
     */
    private showQuestion(): void {
        if(this.quiz === null) {
            return;
        }
        let question: Question = this.quiz.questions[this.numQuestion];
        this.question=question.label;
        this.urlImage=question.image;
        if(this.urlImage === undefined) {
            this.urlImage=null;
        }
        this.goodAnswer=question.answers[question.correctAnswer];
    }

    /**
     * Switch to next question.
     * Then call showQuestion() to change displayed question.
     * If we finish the recap, set class field quiz to null, indicating we have to display the ending message.
     */
    nextQestion(): void {
        this.numQuestion++;
        if(this.numQuestion >= this.quiz.questions.length) {
            console.log("here")
            this.quiz=null;
            return;
        }
        this.showQuestion();
    }

    /**
     * On "S'entrainer" button triggered
     */
    goToTrain(): void {
        this.router.navigate(['play/'+this.id], {
            skipLocationChange: false,
            replaceUrl: true,
            queryParams: { "trainmode": true }
        });
    }

    @HostBinding("style.--rating") //Binds the TS variable `quizdifficulty` to the scss variable `--rating`
    getDifficulty(): number {
        return this.quiz.difficulty;
    }
}
