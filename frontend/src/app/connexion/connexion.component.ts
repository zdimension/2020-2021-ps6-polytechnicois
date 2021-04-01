import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
    selector: "app-connexion",
    templateUrl: "./connexion.component.html"
})
export class ConnexionComponent implements OnInit
{
    loginForm: FormGroup;
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

    ngOnInit(): void
    {
        this.loginForm = this.formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
            remember: new FormControl(true)
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit(): void
    {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
