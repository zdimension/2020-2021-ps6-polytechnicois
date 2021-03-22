import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormArray} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Question} from '../../../models/question.model';

@Component({
	selector: 'app-question-form',
	templateUrl: './question-form.component.html',
	styleUrls: ['./question-form.component.scss']
})
export class QuestionForm implements OnInit {

	public questionForm: FormGroup;

	constructor(public route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService) {
		this.questionForm = this.formBuilder.group({
			label: [''],
			answers: this.formBuilder.array([])
		});
	}

	ngOnInit() {
	}

	addQuestionToQuiz() {
		const questionToCreate: Question = this.questionForm.getRawValue() as Question;
		console.log('add question: ' + questionToCreate);
		this.quizService.addQuestionToQuiz(questionToCreate, this.quizService.getQuiz(this.route.snapshot.paramMap.get('id')));
	}

	private createAnswer(){
		return this.formBuilder.group({
			value: '',
			isCorrect: false
		});
	}

	addAnswer() {
		this.answers.push(this.createAnswer());
	}

	get answers() {
		return this.questionForm.get('answers') as FormArray;
	}
}
