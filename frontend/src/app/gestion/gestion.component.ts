import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
    selector: "app-gestion",
    templateUrl: "./gestion.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class GestionComponent implements OnInit
{

    public users: User[] = [];
    public userRoleStr: string[]= ["Autonome", "Non autonome", "Administrateur"];

    constructor(private userService: UserService)
    {
    }

    ngOnInit(): void
    {
        this.userService.getAllUsers().subscribe(users => {
            this.users = users;
        });
    }
}
