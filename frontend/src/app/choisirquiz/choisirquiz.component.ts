import { Component, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz.model";
import { QuizService } from "../../services/quiz.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { QuizTheme } from "../../models/quiztheme.model";

@Component({
    selector: "app-choisirquiz",
    templateUrl: "./choisirquiz.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class ChoisirQuizComponent implements OnInit
{

    public quizList: Quiz[] = [];
    public choisirQuizForm: FormGroup;
    public listdejafait: string[] = ["Peu importe", "Oui", "Non"];
    public listdifficulte: string[] = ["Peu importe", ">=1", ">=2", ">=3", ">=4", ">=5"];
    public listnbquestions: string[] = ["Peu importe", "Peu", "Moyen", "Beaucoup"];
    public listThemes: QuizTheme[];

    constructor(public quizService: QuizService, public formBuilder: FormBuilder)
    {
        this.quizService.quizzes$.subscribe((quiz) =>
        {
            this.quizList = quiz;
            this.parseQuizList();
            return;
        });
        this.choisirQuizForm=this.formBuilder.group({
            theme: new FormControl(null),
            dejafait: new FormControl(this.listdejafait[0]),
            difficulte: new FormControl(this.listdifficulte[0]),
            nbquestions: new FormControl(this.listnbquestions[0]),
            trierauhasard: new FormControl(false)
        });
        this.quizService.themes$.subscribe((themes) => {
            return this.listThemes = themes;
        });
    }

    ngOnInit(): void
    {
    }

    parseQuizList(): void
    {
        for (const quiz of this.quizList)
        {
            this.quizService.getQuizById(quiz.id).subscribe(q => {
                quiz.questions = q.questions;
                console.log(q);
            });
        }
    }
}
