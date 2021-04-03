import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
    selector: "app-gestion-id",
    templateUrl: "./gestion-id.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class GestionIdComponent implements OnInit
{
    constructor(private userService: UserService)
    {
    }

    ngOnInit(): void
    {
    }
}
