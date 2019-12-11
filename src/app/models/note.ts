export class Note{

	constructor(
        public _id: string,
        public title: string,
		public text: string,
		public file: string,
		public created_at: string,
		public user: string
		){}
}

