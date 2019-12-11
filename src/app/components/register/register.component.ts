import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	providers: [UserService]
})

export class RegisterComponent implements OnInit{

	public title: string;
	public user: User;
	public status: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _UserService: UserService

	){
		this.title = 'registrate';
		this.user = new User(
			"",
			"",
			"",
			"",
			"",
			"",
			"ROLE_USER",
			""
			);
	}

	ngOnInit(){
		console.log("componente register cargado...");
	}

	statusChange(){
		this.status = null;
	}

	onSubmit(form){
		console.log(this.user);
		this._UserService.register(this.user).subscribe(
			response =>{
				if (response.user && response.user._id){
					console.log(response.user);

					this.status = 'success';
					form.reset();
				}else{
					this.status = 'error';
				}

			},
			error =>{
				console.log(<any>error);
			}

			);
	}

}
