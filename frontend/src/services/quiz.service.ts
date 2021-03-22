import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {HttpClient} from '@angular/common/http';
import {Question} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  private dataURL: URL = new URL('http://localhost:9428/api/quizzes');

  constructor(private http: HttpClient) {
    this.getQuizzes();
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }

  deleteQuiz(quiz: Quiz): void {
    let index = this.quizzes.findIndex((element) => element === quiz);
    this.quizzes.splice(index,1);
  }

  getQuizzes(){
    this.http.get<Quiz[]>(this.dataURL.toString()).subscribe((tickets) => {
      this.quizzes = tickets;
      this.quizzes$.next(tickets);
    });
  }

  getQuiz(id: string): Quiz {
    return this.quizzes.find(quiz => quiz.id === id);
  }

  getQuizSub(id: string): BehaviorSubject<Quiz>{
    return new BehaviorSubject<Quiz>( this.quizzes.find(quiz => quiz.id === id));
  }

  updateQuiz(quizGiven: Quiz){
    const quizToUpdate: Quiz = this.getQuiz(quizGiven.id);
    quizToUpdate.theme = quizGiven.theme;
    quizToUpdate.name = quizGiven.name;
  }

  addQuestionToQuiz(question: Question, quiz: Quiz){
    quiz.questions.push(question);
  }

  deleteQuestion(question: Question, quiz: Quiz) {
    let indexQues = quiz.questions.findIndex((element) => element === question);
    let indexQuiz = this.quizzes.findIndex((element) => element === quiz);
    this.quizzes[indexQuiz].questions.splice(indexQues,1);
  }

  getFirstUnusedId(): string {
    if(this.quizzes.length == 0)
      return "0";
    Math.max.apply(Math, this.quizzes.map(function(o){return o.id + 1}));
  }


}
