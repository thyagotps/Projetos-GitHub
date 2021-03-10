import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

    constructor(private route: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>
    {
        if(localStorage.getItem('token') != null)
        {
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });

            return next.handle(cloneReq).pipe(
                tap(
                    sucesso => {},
                    erro => {
                        if (erro.status == 401){
                            return this.route.navigateByUrl('/user/login');
                        }
                    }
                )
            );

        }
        else
        {
            return next.handle(req.clone());
        }
    }

}