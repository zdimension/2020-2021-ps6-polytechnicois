import { Action, Interceptor, InterceptorInterface } from "routing-controllers";

@Interceptor()
export class JSONInterceptor implements InterceptorInterface
{
    intercept(action: Action, content: any)
    {
        return typeof content === "object" && content !== null ? JSON.stringify(content) : content;
    }
}
