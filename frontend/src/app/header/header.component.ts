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
        this.userService.user$.subscribe((user) =>
        {
            this.user = user;
            return;
        });
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
    }

}
