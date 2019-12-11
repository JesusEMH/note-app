import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	providers: [UserService]
})

export class HomeComponent implements OnInit{
	public title: string;
	public identity;
	public user: User;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.title = 'Inicia sesion para que puedas ver tus notas';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
	}

	ngOnInit(){
		console.log("componente home cargado...");
	}
}
