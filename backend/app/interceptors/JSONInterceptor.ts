import { Action, Interceptor, InterceptorInterface } from "routing-controllers";

@Interceptor()
export class JSONInterceptor implements InterceptorInterface
{
    intercept(action: Action, content: any)
    {
        return JSON.stringify(content);
    }
}
