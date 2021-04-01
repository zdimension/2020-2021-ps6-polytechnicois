import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Quiz } from "../models/quiz.model";
import { catchError } from "rxjs/operators";
import { BaseModel } from "../models/base.model";


@Injectable({
    providedIn: "root"
})

export class UserService
{
    public user: User=null;

    public user$ = new BehaviorSubject(this.user);
    private dataURL = new URL("http://localhost:9428/auth/");


    constructor(private http: HttpClient)
    {
    }

    private handleError(error: HttpErrorResponse)
    {
        this.user=null;
        this.user$.next(this.user);
        return throwError("Can't finish operation");
    }


    connexion(name: string, password: string): void
    {
        this.http.post<UserToken>(this.dataURL.toString() + "login", {name, password}).pipe(
            catchError((e)=>this.handleError(e))
        ).subscribe((tickets) =>
        {
            this.user = tickets.user;
            if(this.user == undefined) {
                this.user=null;
            }
            this.user$.next(this.user);
        });
    }

    deconnexion(): void
    {
        this.user=null;
        this.user$.next(this.user);
    }
}

export interface UserToken extends BaseModel
{
    token: string;
    user: User;
}