import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit
{
    public user: User;

    constructor(public userService: UserService)
    {
        this.userService.user$.subscribe((user) =>
        {
            this.user = user;
            console.log(this.user);
            return;
        });
    }

    ngOnInit(): void
    {
    }

    changeFont(p: boolean): void
    {
        //
    }

    deconnexion(): void
    {
        this.userService.deconnexion();
    }

}
