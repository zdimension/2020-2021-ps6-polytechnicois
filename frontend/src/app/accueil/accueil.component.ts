import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-connecte",
    templateUrl: "./accueil.component.html",
    styleUrls: ["./accueil.component.scss"]
})
export class AccueilComponent implements OnInit
{
    public user: User;

    constructor(public userService: UserService, private router: Router)
    {
    }

    ngOnInit(): void
    {
        this.userService.currentUser.subscribe((user) => {
            if(user === null) {
                return;
            }
            this.user = user;
            if(this.user.role.valueOf() === 1 && this.router.url==="/") {
                this.router.navigate(['choisirquiz']);
            }
        });
    }
}
