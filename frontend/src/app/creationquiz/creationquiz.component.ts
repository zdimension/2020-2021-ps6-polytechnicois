import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-creationquiz",
    templateUrl: "./creationquiz.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class CreationQuizComponent implements OnInit
{

    public creationQuizFirstStepForm: FormGroup;
    public listdifficulte: number[];

    constructor()
    {
    }

    ngOnInit(): void
    {
    }
}
