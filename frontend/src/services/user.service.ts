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
    public errorConnect: boolean = false;

    public user$ = new BehaviorSubject(this.user);
    public errorConnect$ = new BehaviorSubject(this.errorConnect);
    private dataURL = new URL("http://localhost:9428/auth/");


    constructor(private http: HttpClient)
    {
    }

    private handleError(error: HttpErrorResponse)
    {
        this.user=null;
        this.user$.next(this.user);
        this.errorConnect=true;
        this.errorConnect$.next(this.errorConnect);
        return throwError("Can't finish operation");
    }


    connexion(name: string, password: string): void
    {
        this.errorConnect=false;
        this.errorConnect$.next(this.errorConnect);
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

    changeFont(p: boolean): void
    {
        if(this.user == null) {
            return;
        }
        if(p) {
            if(this.user.fontSize >= 10) {
                return;
            }
            this.user.fontSize++;
        } else {
            if(this.user.fontSize <= 1) {
                return;
            }
            this.user.fontSize--;
        }
        this.user$.next(this.user);
    }
}

export interface UserToken extends BaseModel
{
    token: string;
    user: User;
}