import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { QuizTheme } from "../../models/quiztheme.model";
import { QuizService } from "../../services/quiz.service";

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
    creerTheme: boolean=false;

    constructor(public formBuilder: FormBuilder, public quizService: QuizService)
    {
        this.creationQuizFirstStepForm=this.formBuilder.group({
            nomquiz: new FormControl(),
            difficulte: new FormControl(0),
            theme: new FormControl(0),
            nomnouveautheme: new FormControl()
        });
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
