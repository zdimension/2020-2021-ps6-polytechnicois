import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {User} from '../models/user.model';


@Injectable({
	providedIn: 'root'
})
export class UserService {
	/**
	 * The list of quiz.
	 * The list is retrieved from the mock.
	 */
	private users: User[] = [];

	/**
	 * Observable which contains the list of the quiz.
	 * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
	 */
	public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

	constructor() {
	}

	addUser(user: User) {
		this.users.push(user);
		// You need here to update the list of quiz and then update our observable (Subject) with the new list
		// More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
	}

	deleteUser(user: User){
		let index = this.users.findIndex((element) => element === user);
		this.users.splice(index,1);
	}

	getFirstUnusedId(): string {
		if(this.users.length == 0)
			return "0";
		Math.max.apply(Math, this.users.map(function(o){return o.id + 1}));
	}
}
