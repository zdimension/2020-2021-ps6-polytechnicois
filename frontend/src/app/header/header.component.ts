import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import {fonts} from "../../fonts";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit
{
    public user: User;

    favoriteFont: FormControl;
    fonts;
    paramsShow: boolean;

    constructor(public userService: UserService, private router: Router)
    {
        this.userService.currentUser.subscribe((user) => this.user = user);
        this.fonts = fonts;
        this.paramsShow = false;
    }

    ngOnInit(): void
    {
        if (this.user.font)
        {
            this.favoriteFont = new FormControl(this.user.font);
            console.log(this.user.font);
        }
        else
        {
            this.favoriteFont = new FormControl(fonts[0]);
            console.log("default");
        }
    }

    changeFont(event: any): void
    {
        let font = event.target.value;
        this.userService.changeFont(font);
    }

    changeFontSize(p: boolean): void
    {
        this.userService.changeFontSize(p);
    }

    deconnexion(): void
    {
        this.userService.logout();
        this.router.navigate(["/connexion"]);
    }

    accueil(): void
    {
        this.router.navigate(["/"]);
    }

    toggleParams(): void
    {
        this.paramsShow = !this.paramsShow;
    }
}
