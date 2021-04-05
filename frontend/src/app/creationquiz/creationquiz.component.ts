import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { QuizTheme } from "../../models/quiztheme.model";
import { QuizService } from "../../services/quiz.service";
import { Question } from "../../models/question.model";

@Component({
    selector: "app-creationquiz",
    templateUrl: "./creationquiz.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class CreationQuizComponent implements OnInit
{

    public creationQuizFirstStepForm: FormGroup;
    public listDifficulte: number[]=[1, 2, 3, 4, 5];
    public listThemes: QuizTheme[]=[];
    public creerTheme: boolean=false;
    public questions: Question[]=[];

    constructor(public formBuilder: FormBuilder, public quizService: QuizService)
    {
        this.creationQuizFirstStepForm=this.formBuilder.group({
            nomquiz: new FormControl(),
            difficulte: new FormControl(0),
            theme: new FormControl(0),
            nomnouveautheme: new FormControl()
        });
        //let q: Question={id: 0, label: "", difficulty: 1, answers: [], correctAnswer: 0};
        this.questions.push()
    }

    ngOnInit(): void
    {
        this.quizService.themes$.subscribe((themes) =>
        {
            return this.listThemes = themes;
        });
    }

    ajouterTheme(): void
    {
        //
    }
}
