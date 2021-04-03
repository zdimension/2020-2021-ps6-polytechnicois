import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate
{
    constructor(
        private router: Router,
        private userService: UserService
    )
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        const currentUser = this.userService.currentUserValue;
        //console.log("here: " + state.url);
        if (currentUser)
        {
            if(state.url === "/gestion" && currentUser.role !== 2)
            {
                this.router.navigate(["/"], { queryParams: { returnUrl: state.url } });
                return false;
            }
            return true;
        }

        this.router.navigate(["/connexion"], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
