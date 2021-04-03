import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit
{
    public user: User;

    constructor(public userService: UserService, private router: Router)
    {
        this.userService.currentUser.subscribe((user) => this.user = user);
    }

    ngOnInit(): void
    {
    }

    changeFont(p: boolean): void
    {
        this.userService.changeFont(p);
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
}
