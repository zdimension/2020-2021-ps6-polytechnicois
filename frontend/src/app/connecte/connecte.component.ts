import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-connecte",
    templateUrl: "./connecte.component.html",
    styleUrls: ["./connecte.component.scss"]
})
export class ConnecteComponent implements OnInit
{

    public user: User;
    constructor(public userService: UserService, private router: Router)
    {
        this.userService.user$.subscribe((user) =>
        {
            this.user = user;
            console.log("connecte"+user);
            if(this.user == null) {
                this.router.navigate(['/accueil']);
            }
            return;
        });
    }

    ngOnInit(): void
    {
    }
}
