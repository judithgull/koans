import {IExercise} from "../../../core/topic";
import * as angular from "angular";

export class SolutionCtrl {

    content:string;

    public static $inject = ["exData"];

    constructor(exData:IExercise) {
      this.content = exData.solution;
    }

  }
