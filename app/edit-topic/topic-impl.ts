module editTopic {

  export class Topic implements Data.ITopic {
    _id:number;
    items:Array<Data.IExercise>;

    constructor(public title:string,
                public language:string) {
    }
  }

}
