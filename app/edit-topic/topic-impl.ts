module editTopic {

  export class Topic implements Data.ITopic {
    _id:number;
    items:Array<Data.IExercise> = [];

    constructor(public title:string = "",
                public programmingLanguage:string = "typescript") {
      this.items.push(new Exercise());
    }
  }

  export class Exercise implements Data.IExercise {
    _id:number;

    constructor(public sortOrder:number = 1,
                public title:string = "",
                public description:string = "",
                public exercise:string = "",
                public solution:string = "") {
    }
  }
}
