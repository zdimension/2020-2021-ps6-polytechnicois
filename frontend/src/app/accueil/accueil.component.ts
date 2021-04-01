import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
    selector: "app-accueil",
    templateUrl: "./accueil.component.html"/*,
    styleUrls: ["./accueil.component.scss"]*/
})
export class AccueilComponent implements OnInit
{

    public loginForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public userService: UserService)
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
        let login=this.loginForm.get('login').value;
        let pass=this.loginForm.get('pass').value;
        this.userService.connexion(login, pass);
    }
}