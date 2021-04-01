import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Quiz } from "../models/quiz.model";
import { catchError, map } from "rxjs/operators";
import { BaseModel } from "../models/base.model";
import { Observable } from "rxjs/Rx";


@Injectable({
    providedIn: "root"
})

export class UserService
{
    public user: User=null;
    public errorConnect: boolean = false;

    public user$ = new BehaviorSubject(this.user);
    public errorConnect$ = new BehaviorSubject(this.errorConnect);
    private dataURL = new URL("http://localhost:9428/auth");

    private handleError(error: HttpErrorResponse)
    {
        this.user=null;
        this.user$.next(this.user);
        this.errorConnect=true;
        this.errorConnect$.next(this.errorConnect);
        return throwError("Can't finish operation");
    }

    loggedIn(): boolean
    {
        return localStorage.getItem("token") !== null;
    }


    /*login(name: string, password: string): void
    {
        this.errorConnect=false;
        this.errorConnect$.next(this.errorConnect);
        this.http.post<UserToken>(this.dataURL.toString() + "login", {name, password}).pipe(
            catchError((e)=>this.handleError(e))
        ).subscribe((tickets) =>
        {
            localStorage.setItem("token", tickets.token);
            this.user = tickets.user;
            if(this.user == undefined) {
                this.user=null;
            }
            this.user$.next(this.user);
        });
    }*/

    updateUser(): void
    {
        this.http.patch(`${this.dataURL}/me/`, this.user).subscribe();
    }

    /*logout(): void
    {
        localStorage.removeItem("token");
        this.user=null;
        this.user$.next(this.user);
    }*/

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
        this.http.patch(`${this.dataURL}/me/`, {fontSize: this.user.fontSize}).subscribe();
    }




    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient)
    {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User
    {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string)
    {
        return this.http.post<any>(`${this.dataURL}/login/`, { username, password })
            .pipe(map(user =>
            {
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout()
    {
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }
}
