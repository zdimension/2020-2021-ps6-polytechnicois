import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { Inject } from "@angular/core";
import { strict } from "assert";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent
{
    title = "starter-quiz";
    fontSizes = ['16px', '20px', '24px'];
    public fontSize: string;
    public font: string;
    constructor(private userService: UserService)
    {
    }

    ngOnInit(){
        this.userService.currentUser
            .subscribe(user =>
            {
                this.fontSize = this.fontSizes[user.fontSize];
                this.font = user.font;
                document.querySelector('html').style.fontSize = this.fontSize;
                document.querySelector('html').style.fontFamily = this.font;
            });
    }
}
