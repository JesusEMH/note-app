import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Note } from '../models/note';
import {UserService} from '../services/user.service';

@Injectable()
export class NoteService {
	public url: string;
	public token;

	constructor(
		public _http: HttpClient,
		private _userService: UserService
		){
		this.url = GLOBAL.url;
	}

	addNote(token, note): Observable<any>{
		let params = JSON.stringify(note);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', token);		
		return this._http.post(this.url+'note',params, {headers: headers});

	}

	getNotes(token, page = 1): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', token);	
		return this._http.get(this.url+"notes/"+page, {headers: headers});
	}

	deleteNote(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', token);	
		return this._http.delete(this.url+"note/"+id, {headers: headers});
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != 'undefined'){
			this.token = token;
		}else{  
			this.token = null;
		}
		return this.token;
	}

	updateNote(noteUpdated: Note): Observable<any>{
		let params = JSON.stringify(noteUpdated);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', this.getToken());
		return this._http.put(this.url+"update-note/"+noteUpdated._id, params, {headers: headers});
	}

}