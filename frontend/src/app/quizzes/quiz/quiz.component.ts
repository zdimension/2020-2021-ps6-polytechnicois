import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Quiz } from "../../../models/quiz.model";

@Component({
    selector: "app-quiz",
    templateUrl: "./quiz.component.html",
    styleUrls: ["./quiz.component.scss"]
})
export class QuizComponent implements OnInit
{

    @Input()
    quiz: Quiz;

    @Output()
    quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    @Output()
    quizEdited: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

    selectQuiz(): void
    {
        this.quizSelected.emit(true);
    }

    deleteQuiz(): void
    {
        this.quizDeleted.emit(this.quiz);
    }

    editQuiz(): void
    {
        this.quizEdited.emit(this.quiz);
    }
}
