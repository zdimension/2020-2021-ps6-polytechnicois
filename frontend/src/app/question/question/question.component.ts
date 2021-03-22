import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Question } from "../../../models/question.model";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "../../../services/quiz.service";

@Component({
    selector: "app-question",
    templateUrl: "./question.component.html",
    styleUrls: ["./question.component.scss"]
})
export class QuestionsComponent implements OnInit
{

    @Input()
    question: Question;

    @Output()
    questionDeleted = new EventEmitter<Question>();


    constructor(public route: ActivatedRoute, public quizService: QuizService)
    {
    }

    ngOnInit(): void
    {
    }


    deleteQuestion(): void
    {
        this.questionDeleted.emit(this.question);
    }
}
