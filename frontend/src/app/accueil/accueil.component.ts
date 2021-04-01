import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-accueil",
    templateUrl: "./accueil.component.html",
    styleUrls: ["./accueil.component.scss"]
})
export class AccueilComponent implements OnInit
{

    public loginForm: FormGroup;
    public user: User=null;

    constructor(public formBuilder: FormBuilder, public userService: UserService, private router: Router)
    {
        this.loginForm = this.formBuilder.group({
            login: [""],
            pass: [""],
            souvenir: new FormControl(true)
        });

        this.userService.user$.subscribe((user) =>
        {
            this.user = user;
            if(this.user != null) {
                this.router.navigate(['/connecte']);
            }
            return;
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
