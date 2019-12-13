import {Component, OnInit, DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {NoteService} from '../../services/note.service';
import {User} from '../../models/user';
import {Note} from '../../models/note';
import {GLOBAL} from '../../services/global';

@Component({
	selector: 'notes',
	templateUrl: './notes.component.html',
	providers: [NoteService]
})

export class NotesComponent implements OnInit, DoCheck{
	public title: string;	
	public url;
	public identity;
	public token;
	public stats;
	public status: string;
	public statusok: string;
	public note: Note;
	public noteUpdated: Note;
	public page;
	public total;
	public pages;
	public notas: Note[];
	public itemsPerPage;
	public showForm;
	public statusDelete;
	public editForm;
	public statusUpdate;
	
	public editTitle;
	public editText;
	public editId;

	constructor(
		private _noteService: NoteService,
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
		){
			this.url = GLOBAL.url;
			this.identity = this._userService.getIdentity();
			this.token = this._userService.getToken();
			this.stats = this._userService.getStats();
			this.page = 1;
			this.note = new Note("","","","","",this.identity._id);
			this.noteUpdated = new Note("","","","","",this.identity._id);
			this.showForm = false;

	}

	ngOnInit(){
		console.log("componente Notes cargado");
		this.getNotes(this.page);
		this.noteUpdated = new Note("","","","","",this.identity._id);
	}
	ngDoCheck(){
		//this.getNotes(this.page);
		//this.notas;
		//console.log(this.editId);
		//console.log(this.noteUpdated);
	}

	onSubmit(form){
		console.log(this.note);

		this._noteService.addNote(this.token, this.note).subscribe(
			response => {
				console.log(response);
				if(response.nota){
					//this.note = response.nota;
					this.status = 'success';
					form.reset();
					this._router.navigate(['/loading']);
				}else{
					this.status = 'error';
					form.reset();
				}

			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}

	alert(){
		this.status = null;
	}
	
	getNotes(page, adding = false){
		console.log("componente getnotes cargado");
		this._noteService.getNotes(this.token, page).subscribe(
			response => {
				console.log("response si existe");
				if(response.notes){
					console.log("response entro en el if");
					this.total = response.total_items;
					this.pages = response.pages;
					this.itemsPerPage = response.items_Per_Page;
					//this.notas = response.notes;
					this.statusok = 'success';
					
					if(!adding){
						this.notas = response.notes;
					}else{
						var arrayA = this.notas;
						var arrayB = response.notes;
						this.notas = arrayA.concat(arrayB);
					}

					if(page > this.pages){
						this._router.navigate(['/loading']);
						
						
					}
				}else{
					this.statusok = "error";
				}



			},
			error =>{
				console.log("response no existe");
				var errorMessage = <any>error;
				console.log(errorMessage);
				if(errorMessage != null){
					this.statusok = 'error';
				}

			}

		);
	}

	public noMore = false;
	viewMore(){
		if(this.notas.length == this.total){
			this.noMore = true;

		}else{
			this.page += 1;
		}
		this.getNotes(this.page, true);
	}

	viewForm(){
		
		this.showForm = true;
		
	}
	hideForm(){
		this.showForm = false;
	}

	refresh(page, adding){
		this.getNotes(page, adding=false);
	}

	clickDelete(){
		this.statusDelete = false;
	}

	deleteNote(id){
		this._noteService.deleteNote(this.token, id).subscribe(
			response =>{
				this.refresh(1,false);
				this.statusDelete = true;
			},error =>{
				console.log(<any>error);
			}
		);
	}
	editNote(id, title, text){
		this.showForm = false;
		this.editForm = true;

		this.editTitle = title;
		this.editText = text;
		this.editId = id;
		this.noteUpdated = new Note(this.editId,"","","","",this.identity._id);

	}


	updateNote(form){
		console.log(this.editId);
		console.log(this.noteUpdated);
		this._noteService.updateNote(this.noteUpdated).subscribe(
			response =>{
				console.log(response);

				if(response.note){
					//this.note = response.nota;
					this.statusUpdate;
					
					this.refresh(1,false);
				}else{
					this.statusUpdate = null;
					
				}
			},error =>{
				console.log(<any>error);
			}
		);
	}

	hideEditForm(){
		this.editForm = false;
		this.editText = null;
		this.editTitle = null;
		this.editId = null;
	}
}






