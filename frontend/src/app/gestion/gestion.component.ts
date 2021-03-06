import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-gestion",
    templateUrl: "./gestion.component.html",
    styleUrls: ["./gestion.component.scss"]
})
export class GestionComponent implements OnInit
{

    public usersDisplayed: User[] = [];
    public userRoleStr: string[] = ["Autonome", "Non autonome", "Administrateur"];
    public searchUserForm: FormGroup;
    private users: User[] = [];

    constructor(private userService: UserService, private formBuilder: FormBuilder)
    {
        this.searchUserForm = this.formBuilder.group({
            searchUserField: new FormControl()
        });
    }

    /**
     * Display all users
     */
    ngOnInit(): void
    {
        this.userService.getAllUsers().subscribe(users =>
        {
            this.users = users;
            this.usersDisplayed = users;
        });
    }

    /**
     * If field "Search user" as changed
     */
    onChangeSearchUser(): void
    {
        let searchValue = this.searchUserForm.get("searchUserField").value;
        if (searchValue.toString().isEmpty)
        {
            this.usersDisplayed = this.users;
            return;
        }
        this.usersDisplayed = [];
        this.users.forEach(user =>
        {
            if (user.name.toString().toLowerCase().includes(searchValue.toLowerCase()))
            {
                this.usersDisplayed.push(user);
            }
        });
    }
}
