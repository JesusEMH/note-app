import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Note } from '../models/note';

@Injectable()
export class NoteService {
	public url: string;

	constructor(
		public _http: HttpClient
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

}