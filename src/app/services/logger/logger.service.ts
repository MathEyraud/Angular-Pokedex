import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(){}

  log(message:string, obj?:unknown){
    if(!environment.production) {
      console.log(message, obj);
    }
  }

  error(message:string, obj?:unknown){
    if(!environment.production) {
      console.error(message, obj);
    }
  }

}
