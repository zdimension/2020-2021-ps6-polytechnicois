import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";
import { QuizService } from "../../../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-gestion-id",
    templateUrl: "./gestion-id.component.html",
    styleUrls: ["./gestion-id.component.scss"]
})
export class GestionIdComponent implements OnInit
{
    public userToModify: User=null;
    public changeUserForm: FormGroup;
    public userRoleStr: string[]= ["Autonome", "Non autonome", "Administrateur"];
    public userId: number=1;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router)
    {
        this.userId = +this.route.snapshot.paramMap.get("id");
        this.changeUserForm=new FormGroup({
            roleUser: new FormControl(''),
            highContrast: new FormControl('')
        });
    }

    ngOnInit(): void
    {
        this.userService.getUserById(this.userId).subscribe(user => {
            if(user === null) {
                this.router.navigate(["gestion"]);
                return;
            }
            this.userToModify=user;
            this.changeUserForm.controls['roleUser'].setValue(user.role);
            this.changeUserForm.controls['highContrast'].setValue(user.highContrast);
        })
    }

    changeUser(): void
    {
        let role=this.changeUserForm.controls['roleUser'].value;
        let highContrast=this.changeUserForm.controls['highContrast'].value;
        this.userToModify.role=role;
        this.userToModify.highContrast=highContrast;
        this.userService.changeUserById(this.userId, {role, highContrast})
    }
}
