import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {BehaviorSubject} from 'rxjs';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss']
})
export class QuestionsComponent implements OnInit {

	@Input()
	question: Question;

	@Output()
	questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();


	constructor(public route: ActivatedRoute, public quizService: QuizService) {
	}

	ngOnInit() {
	}


	deleteQuestion() {
		this.questionDeleted.emit(this.question);
	}
}
