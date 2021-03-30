import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "../../../services/quiz.service";
import { Question } from "../../../models/question.model";

@Component({
    selector: "app-question-form",
    templateUrl: "./question-form.component.html",
    styleUrls: ["./question-form.component.scss"]
})
export class QuestionForm implements OnInit
{

    public questionForm: FormGroup;

    constructor(public route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService)
    {
        this.questionForm = this.formBuilder.group({
            label: [""],
            answers: this.formBuilder.array([])
        });
    }

    get answers(): FormArray
    {
        return this.questionForm.get("answers") as FormArray;
    }

    ngOnInit(): void
    {
    }

    addQuestionToQuiz(): void
    {
        const questionToCreate = this.questionForm.getRawValue() as Question;
        console.log("add question: " + questionToCreate);
        this.quizService.addQuestionToQuiz(questionToCreate, this.quizService.getQuiz(parseInt(this.route.snapshot.paramMap.get("id"), 10)));
    }

    addAnswer(): void
    {
        this.answers.push(this.createAnswer());
    }

    private createAnswer(): FormGroup
    {
        return this.formBuilder.group({
            value: "",
            isCorrect: false
        });
    }
}
