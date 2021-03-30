import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-creationcompte",
    templateUrl: "./creationcompte.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class CreationCompteComponent implements OnInit
{
    public createAccountForm: FormGroup;

    typeQuestions: string[] = ["Toutes", "Textuelles seulement", "Textuelles seulement"];

    constructor(public formBuilder: FormBuilder)
    {
        this.createAccountForm = this.formBuilder.group({
            login: [""],
            pass: [""],
            pass2: [""],
            typequiz: new FormControl(this.typeQuestions[0])
        });
    }

    ngOnInit(): void
    {
    }

    createAccount(): void {
        console.log("Create account");
    }
}
