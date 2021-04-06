import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { QuizTheme } from "../../models/quiztheme.model";
import { QuizService } from "../../services/quiz.service";
import { Question } from "../../models/question.model";

@Component({
    selector: "app-creationquiz",
    templateUrl: "./creationquiz.component.html",
    styleUrls: ["./creationquiz.component.scss"]
})
export class CreationQuizComponent implements OnInit
{

    public creationQuizFirstStepForm: FormGroup;
    public listDifficulte: number[]=[1, 2, 3, 4, 5];
    public listThemes: QuizTheme[]=[];
    public questionsToAdd: QuestionToAdd[]=[];
    public isCollapsed = true;
    public creationQuizSecondStepForm: FormGroup[]=[];

    constructor(public formBuilder: FormBuilder, public quizService: QuizService)
    {
        this.creationQuizFirstStepForm=this.formBuilder.group({
            nomquiz: new FormControl(),
            difficulte: new FormControl(0),
            theme: new FormControl(0),
            nomnouveautheme: new FormControl()
        });
        //this.questionsToAdd.push({label: "55", difficulty: 1, answers: [], correctAnswer: 0});
    }

    ngOnInit(): void
    {
        this.quizService.themes$.subscribe((themes) =>
        {
            this.listThemes = themes;
            this.creationQuizFirstStepForm.get('theme').setValue(this.listThemes.length-1);
        });
    }

    ajouterTheme(): void
    {
        let newTheme: string=this.creationQuizFirstStepForm.get('nomnouveautheme').value;
        if(newTheme === null) {
            return;
        }
        this.quizService.createTheme(newTheme);
        this.isCollapsed=true;
    }

    public addQuestion(): void
    {
        this.questionsToAdd.push({label: "", difficulty: 1, answers: [], correctAnswer: 0});
        this.creationQuizSecondStepForm.push(this.formBuilder.group({
            //
        }));
    }

    changeField(id: number, component: string, newValue, subid?: number): void
    {
        (component !== 'image' || this.questionsToAdd[id][component] !== "") ? this.questionsToAdd[id][component]=newValue : this.questionsToAdd[id][component]=null;
        console.log(this.questionsToAdd[0]);
    }

    toJSON(form): string
    {
        console.log(form);
        return JSON.stringify(form);
    }
}

export class QuestionToAdd
{
    label: string;
    image?: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    answers: string[];
    correctAnswer: 0 | 1 | 2 | 3;
}