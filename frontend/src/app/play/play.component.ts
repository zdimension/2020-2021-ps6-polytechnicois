import { Component, HostBinding, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz.model";
import { QuizService } from "../../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
    selector: "app-play",
    templateUrl: "./play.component.html",
    styleUrls: ["./play.component.scss"]
})
export class PlayComponent implements OnInit
{

    quiz: Quiz;
    public numquestion = 0; //the current question's number
    public firstStage = true;
    public answersDisplayed: string[]; //the current question's answers
    public quizname: string;
    @HostBinding("style.--rating") //Binds the TS variable `quizdifficulty` to the scss variable `--rating`
    public quizdifficulty: number;
    public questionlabel: string;
    public questionCount = 0;
    public correctAnswer = 0;
    public displayedMessage = "Séléctionnez la bonne réponse";
    public quizTermine = false;
    public urlImage: string = null;
    public trainMode: boolean = false;
    public displayedInTrainMode: boolean[] = [];
    private user: User=null;
    private id: number=1;
    private history;

    constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router, private userService: UserService)
    {
    }

    /**
     * Gather user's infos and check if we are in train mode
     */
    ngOnInit(): void
    {
        this.userService.currentUser.subscribe(user => {
            if(user === null) {
                return;
            }
            this.user=user;
            if(this.user.ignoredQuestions===null) {
                this.user.ignoredQuestions=[];
            }
            this.getQuiz();
        });
        this.route.queryParams.subscribe(params =>
        {
            this.trainMode = params.hasOwnProperty("trainmode");
        });
    }

    /**
     * Loads the quiz into the component and displays
     * the first question
     */
    getQuiz(): void
    {
        this.id = +this.route.snapshot.paramMap.get("id");
        this.quizService.getQuizById(this.id)
            .subscribe(quiz =>
            {
                if(quiz === null) {
                    return;
                }
                this.quiz = quiz;
                this.quizname = this.quiz.name;
                this.quizdifficulty = this.quiz.difficulty;
                this.questionCount = this.quiz.questions.length;
                while(this.numquestion < this.questionCount && this.user.ignoredQuestions.includes(this.quiz.questions[this.numquestion].id))
                {
                    this.history[this.numquestion]=-1;
                    this.numquestion++;
                }
                this.answersDisplayed = this.quiz.questions[this.numquestion].answers;
                this.questionlabel = this.quiz.questions[this.numquestion].label;
                this.correctAnswer = this.quiz.questions[this.numquestion].correctAnswer;
                this.urlImage = this.quiz.questions[this.numquestion].image;
                this.updateDisplayedInTrainMode();
            });
        this.history={};
    }

    /**
     * Callback function called whenever the user
     * clicks on an answer
     *
     * @param n: the answer's number
     */
    reponseCliquee(n): void
    {
        if (this.quizTermine)
        {
            return;
        }
        this.questionlabel = this.quiz.questions[this.numquestion].label;
        if (this.firstStage)
        {
            this.history[(this.numquestion).toString()]= n;
            if (this.quiz.questions[this.numquestion].correctAnswer == n)
            {
                console.log("Correct");
            }
            else
            {
                console.log("Incorrect");
            }
            this.displayedMessage = "Cliquez sur la bonne réponse";
        }
        else
        {
            this.numquestion++;
            while(this.numquestion < this.questionCount && this.user.ignoredQuestions.includes(this.quiz.questions[this.numquestion].id))
            {
                this.history[this.numquestion]=-1;
                this.numquestion++;
            }
            if (this.numquestion >= this.questionCount)
            {
                console.log("Quiz termine");
                this.displayedMessage = "Quiz terminé";
                this.quizTermine = true;
                console.log(this.history);
                if(!this.trainMode) { // Doesn't upload results in train mode
                    this.quizService.uploadAttempt(this.id, this.history);
                }
                this.numquestion = this.questionCount-1;
                if(this.user !== null && this.user.role===1 && this.user.forceRecap) {
                    this.router.navigate(['recap/'+this.id]);
                }
                return;
            }
            this.answersDisplayed = this.quiz.questions[this.numquestion].answers;
            this.questionlabel = this.quiz.questions[this.numquestion].label;
            this.correctAnswer = this.quiz.questions[this.numquestion].correctAnswer;
            this.urlImage = this.quiz.questions[this.numquestion].image;
            this.displayedMessage = "Séléctionnez la bonne réponse";
            this.updateDisplayedInTrainMode();
        }
        this.firstStage = !this.firstStage;
    }

    /**
     * Returns a random floating number
     * between min an max (min inclusive, max exclusive)
     *
     * @param min: minimum value (inclusive)
     * @param max: maximum vale (exclusive)
     */
    public getRandom(min: number, max: number): number
    {
        if (min > max)
        {
            let tmp = min;
            min = max;
            max = tmp;
        }
        return min + Math.round(Math.random() * (max - min));
    }

    /**
     * On "S'entrainer" button triggered
     */
    public goToTrain(): void
    {
        this.trainMode = true;
        this.numquestion = 0;
        this.quizTermine = false;
        this.getQuiz();
        this.firstStage = true;
        this.displayedMessage = "Selectionnez la bonne reponse";
        this.router.navigate([this.router.url.split("?")[0]], {
            skipLocationChange: false,
            replaceUrl: true,
            queryParams: { "trainmode": true }
        });
    }

    /**
     * Set disabled choices in train mode
     * @private
     */
    private updateDisplayedInTrainMode(): void
    {
        this.displayedInTrainMode = [];
        let randomBoolean: boolean[]=[true, false, false];
        randomBoolean.sort(() => Math.random() - 0.5);
        for (let i = 0; i < this.questionCount; i++)
        {
            if(i == this.correctAnswer) {
                this.displayedInTrainMode.push(true);
            } else {
                this.displayedInTrainMode.push(randomBoolean.pop());
            }
            //this.displayedInTrainMode.push(i != this.correctAnswer && this.getRandom(0, 1) === 1);
        }
    }

}
