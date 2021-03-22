import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { User } from "../../../models/user.model";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit
{

    @Input()
    user: User;

    @Output()
    userSelected = new EventEmitter<boolean>();

    @Output()
    userDeleted = new EventEmitter<User>();


    constructor()
    {
    }

    ngOnInit(): void
    {
    }

    selectUser(): void
    {
        this.userSelected.emit(true);
    }

    deleteUser(): void
    {
        this.userDeleted.emit(this.user);
    }


}
