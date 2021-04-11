import { Component, OnInit } from "@angular/core";
import { QuizService } from "../../services/quiz.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-recap",
    templateUrl: "./recap.component.html"/*,
    styleUrls: ["./recap.component.scss"]*/
})
export class RecapComponent implements OnInit
{

    constructor(public quizService: QuizService, public formBuilder: FormBuilder, public userService: UserService, private router: Router)
    {
    }

    ngOnInit(): void
    {
    }
}
