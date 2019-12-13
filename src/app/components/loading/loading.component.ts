import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
	selector: 'login',
	templateUrl: './loading.component.html',
	providers: []
})

export class LoadingComponent implements OnInit{



    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ){
 
    }

    ngOnInit(){
        console.log("componente cargado");
        this._router.navigate(['/notas']);
    }


}