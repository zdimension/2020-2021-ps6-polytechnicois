import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import fonts from "../fonts";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent
{
    title = "starter-quiz";
    fontSizes = ['22px', '25px', '28px'];
    public fontSize: string;
    public font: string;
    constructor(private userService: UserService)
    {
    }

    ngOnInit(){
        this.userService.currentUser
            .subscribe(user =>
            {
                this.fontSize = this.fontSizes[user?.fontSize ?? 1];
                this.font = user?.font ?? "Arial";

                document.querySelector('html').style.fontSize = this.fontSize;
            });
    }

    setFont() {
        return {'font-family': this.font};
    }
}
