import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs/Rx";
import { DEFAULT_FONT_SIZE, fonts, MAX_FONT_SIZE } from "../fonts";

@Injectable({
    providedIn: "root"
})

export class UserService
{
    public currentUser: Observable<User>;

    /*private handleError(error: HttpErrorResponse)
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
    }*/


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

    /*updateUser(): void
    {
        this.http.patch(`${this.dataURL}/me/`, this.user).subscribe();
    }*/

    /*logout(): void
    {
        localStorage.removeItem("token");
        this.user=null;
        this.user$.next(this.user);
    }*/

    /*changeFont(p: boolean): void
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
    }*/
    /*public user: User=null;
    public errorConnect: boolean = false;

    public user$ = new BehaviorSubject(this.user);
    public errorConnect$ = new BehaviorSubject(this.errorConnect);*/
    private dataURL = new URL("http://localhost:9428/auth");
    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient)
    {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get user(): User
    {
        return this.currentUserSubject.value;
    }

    public get currentUserValue(): User
    {
        return this.currentUserSubject.value;
    }

    changeFontSize(p: boolean): void
    {
        if (this.user == null)
        {
            return;
        }

        if (p)
        {
            if (this.user.fontSize >= MAX_FONT_SIZE)
            {
                return;
            }
            this.user.fontSize++;
        }
        else
        {
        if (this.user.fontSize <= DEFAULT_FONT_SIZE)
            {
                return;
            }
            this.user.fontSize--;
        }
        this.currentUserSubject.next(this.user);
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        this.http.patch(`${this.dataURL}/me/`, { fontSize: this.user.fontSize }).subscribe();
    }

    changeFont(fontName: string): void {
        if (this.user == null) {
            return;
        }
        if (fonts.includes(fontName)) {
            if (this.user.font != fontName) {
                this.user.font = fontName;
            }
        }
        else {
            return;
        }
        this.currentUserSubject.next(this.user);
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        this.http.patch(`${this.dataURL}/me/`, { font: this.user.font }).subscribe();
    }

    changeHighContrast(highContrast: boolean): void {
        if (this.user == null) {
            return;
        }
        this.user.highContrast=highContrast;
        this.currentUserSubject.next(this.user);
        this.currentUser = this.currentUserSubject.asObservable();
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        this.http.patch(`${this.dataURL}/me/`, { highContrast: this.user.highContrast }).subscribe();
    }

    login(username: string, password: string)
    {
        return this.http.post<User>(`${this.dataURL}/login`, { username, password })
            .pipe(map(user =>
            {
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(user: { username: string; password: string, password2: string, autonomous: boolean })
    {
        return this.http.post<User>(`${this.dataURL}/register`, user)
            .pipe(map(user =>
            {
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    getAllUsers(): Observable<User[]>
    {
        return this.http.get<User[]>(`${this.dataURL}/users`);
    }

    getUserById(id: number): Observable<User>
    {
        return this.http.get<User>(`${this.dataURL}/users/${id}`);
    }

    changeUserById(id: number, data): void
    {
        this.http.patch(`${this.dataURL}/users/${id}`, data).subscribe();
    }

    logout()
    {
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }
}
