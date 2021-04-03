import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
    selector: "app-creationcompte",
    templateUrl: "./creationcompte.component.html"/*,
    styleUrls: ["./user.component.scss"]*/
})
export class CreationCompteComponent implements OnInit
{
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = "";

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute)
    {
        if (this.userService.currentUserValue)
        {
            this.router.navigate(["/"]);
        }
    }

    get f()
    {
        return this.registerForm.controls;
    }

    ngOnInit(): void
    {
        this.registerForm = this.formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
            password2: ["", Validators.required],
            autonomous: new FormControl(true)
        });

        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    onSubmit(): void
    {
        this.submitted = true;

        if (this.registerForm.invalid)
        {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data =>
                {
                    this.router.navigate([this.returnUrl]);
                },
                error =>
                {
                    this.error = error;
                    this.loading = false;
                });
    }
}
