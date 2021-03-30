import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "../../../services/quiz.service";
import { Quiz } from "../../../models/quiz.model";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: "app-quiz-edit",
    templateUrl: "./edit-quiz.component.html",
    styleUrls: ["./edit-quiz.component.scss"]
})
export class EditQuizComponent implements OnInit
{

    public quizEdit: Quiz;
    public quizForm: FormGroup;
    public id: number;
    public THEME_LIST = ["Actor", "Sport", "Book", "Other"];

    constructor(public formBuilder: FormBuilder, public route: ActivatedRoute, public quizService: QuizService)
    {
        this.getQuiz();
        this.quizForm = this.formBuilder.group({
            id: [this.quizEdit.id],
            name: [this.quizEdit.name],
            theme: [this.quizEdit.theme],
            questions: [this.quizEdit.questions]
        });
    }

    ngOnInit(): void
    {
    }

    getQuiz(): void
    {
        this.id = parseInt(this.route.snapshot.paramMap.get("id"), 10);
        this.quizEdit = this.quizService.getQuiz(this.id);
        console.log(this.quizEdit);
    }


    updateQuiz(): void
    {
        const quizToUpdate = this.quizForm.getRawValue() as Quiz;
        if (this.quizEdit.createdAt !== undefined)
        {
            quizToUpdate.createdAt = this.quizEdit.createdAt;
        }
        this.quizService.updateQuiz(quizToUpdate);
    }

}
