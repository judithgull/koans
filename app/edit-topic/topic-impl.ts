module editTopic {

  export class Topic implements core.ITopic {
    _id:number;
    items:Array<core.IExercise> = [];

    constructor(public title:string = "",
                public programmingLanguage:string = "typescript") {
      this.items.push(new Exercise());
    }
  }

  export class Exercise implements core.IExercise {
    _id:number;

    constructor(public sortOrder:number = 1,
                public title:string = "",
                public description:string = "",
                public exercise:string = "",
                public solution:string = "") {
    }
  }
}
