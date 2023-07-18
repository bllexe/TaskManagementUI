import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";

export class AuthenticationInterceptor implements HttpInterceptor{

    constructor(private authenticationService:AuthenticationService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
            this.authenticationService.logout();
            location.reload();
          }
    
          const error = err.error.message || err.statusText;
          return throwError(error);
        }))
      }
    }