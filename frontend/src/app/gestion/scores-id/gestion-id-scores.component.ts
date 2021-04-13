import { Component, HostBinding, OnInit } from "@angular/core";
import { QuizService } from "../../../services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/user.service";

@Component({
    selector: "app-gestion-id-scores",
    templateUrl: "./gestion-id-scores.component.html"/*,
    styleUrls: ["./play.component.scss"]*/
})
export class GestionIdScoresComponent implements OnInit
{

    constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router, private userService: UserService)
    {
    }
    ngOnInit(): void
    {
    }

}
