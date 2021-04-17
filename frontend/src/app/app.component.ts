import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { BASE_FONT_SIZE, DEFAULT_FONT_SIZE } from "../fonts";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent
{
    title = "starter-quiz";
    public fontSize: string;
    public font: string;

    constructor(private userService: UserService)
    {
    }

    toPixels(n: number): string
    {
        return n * 3 + BASE_FONT_SIZE + "px";
    }

    ngOnInit()
    {
        this.userService.currentUser
            .subscribe(user =>
            {
                this.fontSize = this.toPixels(user?.fontSize ?? DEFAULT_FONT_SIZE);
                this.font = user?.font ?? "Arial";
            });
    }

    setStyle()
    {
        return { "font-family": this.font, "font-size": this.fontSize };
    }
}
