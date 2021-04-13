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
        }
        else
        {
            this.favoriteFont = new FormControl(fonts[0]);
        }
    }

    /**
     * On font changed
     * @param event triggering event
     */
    changeFont(event: any): void
    {
        let font = event.target.value;
        this.userService.changeFont(font);
    }

    /**
     * On font size changed
     * @param p True if + button, false otherwise
     */
    changeFontSize(p: boolean): void
    {
        this.userService.changeFontSize(p);
    }

    /**
     * On disconnect button triggered
     */
    deconnexion(): void
    {
        this.userService.logout();
        this.router.navigate(["/connexion"]);
    }

    /**
     * On "Retour a l'accueil" button triggered
     */
    accueil(): void
    {
        this.router.navigate(["/"]);
    }

    /**
     * Display or hide visual params
     */
    toggleParams(): void
    {
        this.paramsShow = !this.paramsShow;
    }
}
