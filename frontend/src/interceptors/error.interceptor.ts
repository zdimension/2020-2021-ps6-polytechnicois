import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Observable } from "rxjs/Rx";
import { UserService } from "../services/user.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    constructor(private userService: UserService)
    {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(request).pipe(catchError(err =>
        {
            if (err.status === 401)
            {
                this.userService.logout();
                location.reload();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
