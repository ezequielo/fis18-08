import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { TokenService } from './token.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';


@Injectable({
  providedIn: 'root'
})
export class NeedAuthService {

  constructor(private tokenService: TokenService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.tokenService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }

}
