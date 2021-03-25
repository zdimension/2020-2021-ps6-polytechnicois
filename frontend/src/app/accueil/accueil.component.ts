import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-accueil",
    templateUrl: "./accueil.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class AccueilComponent implements OnInit
{

    public loginForm: FormGroup;

    constructor(public formBuilder: FormBuilder)
    {
        this.loginForm = this.formBuilder.group({
            login: [""],
            pass: [""],
            souvenir: new FormControl(true)
        });
    }

    ngOnInit(): void
    {
    }

    connexion(): void {
        console.log("Try to connect");
    }
}
