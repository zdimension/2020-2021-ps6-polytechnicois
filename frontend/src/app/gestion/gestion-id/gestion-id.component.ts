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
    public listMaxQuestions: string[]=["infini", "5", "10", "15"];
    public listMaxDifficulty: string[]=["1", "2", "3", "4", "5"];

    /**
     * Gather user's infos
     * @param userService
     * @param route
     * @param router
     */
    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router)
    {
        this.userId = +this.route.snapshot.paramMap.get("id");
        this.changeUserForm=new FormGroup({
            roleUser: new FormControl(''),
            forceRecap: new FormControl(''),
            highContrast: new FormControl(''),
            maxQuestions: new FormControl(''),
            maxDifficulty: new FormControl('')
        });
    }

    /**
     * Set displayed fields to user's infos
     */
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
            this.changeUserForm.controls['forceRecap'].setValue(user.forceRecap);
            this.changeUserForm.controls['maxQuestions'].setValue(Math.round(user.maxQuestions / 5));
            this.changeUserForm.controls['maxDifficulty'].setValue(user.maxDifficulty.valueOf()-1);
        })
    }

    /**
     * When a field is changed, modify user's infos
     */
    changeUser(): void
    {
        let role=this.changeUserForm.controls['roleUser'].value;
        let highContrast=this.changeUserForm.controls['highContrast'].value;
        let forceRecap=this.changeUserForm.controls['forceRecap'].value;
        let maxQuestions=this.changeUserForm.controls['maxQuestions'].value * 5;
        let maxDifficulty=this.changeUserForm.controls['maxDifficulty'].value+1;
        this.userToModify.role=role;
        this.userToModify.highContrast=highContrast;
        this.userToModify.forceRecap=forceRecap;
        this.userToModify.maxQuestions=maxQuestions;
        this.userToModify.maxDifficulty=maxDifficulty;
        this.userService.changeUserById(this.userId, {role, highContrast, forceRecap, maxQuestions, maxDifficulty})
    }
}
