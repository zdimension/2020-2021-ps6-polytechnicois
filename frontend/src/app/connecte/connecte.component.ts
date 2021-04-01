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
    public autonomous: boolean=true;

    constructor(public userService: UserService, private router: Router)
    {
        this.userService.user$.subscribe((user) =>
        {
            this.user = user;
            this.autonomous = this.user.role != 1;
            if(this.user == null) {
                this.router.navigate(['/accueil']);
                return;
            }
            console.log(this.user.fontSize);
            return;
        });
    }

    ngOnInit(): void
    {
    }
}
