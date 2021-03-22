import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

	/**
	 * UserForm: Object which manages the form in our component.
	 * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
	 */
	public userForm: FormGroup;


	constructor(public formBuilder: FormBuilder, public userService: UserService) {
		// Form creation
		this.userForm = this.formBuilder.group({
			name: ['']
		});
		// You can also add validators to your inputs such as required, maxlength or even create your own validator!
		// More information: https://angular.io/guide/reactive-forms#simple-form-validation
		// Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
	}

	ngOnInit() {
	}

	addUser() {
		// We retrieve here the user object from the userForm and we cast the type "as User".
		const userToCreate: User = this.userForm.getRawValue() as User;
		userToCreate.creationDate = new Date(Date.now());
		userToCreate.id = this.userService.getFirstUnusedId();

		// Do you need to log your object here in your class? Uncomment the code below
		// and open your console in your browser by pressing F12 and choose the tab "Console".
		// You will see your user object when you click on the create button.
		console.log('Add user: ', userToCreate);

		// Now, add your user in the list!
		this.userService.addUser(userToCreate);
	}
}
