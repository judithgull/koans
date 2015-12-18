module Data {
  'use strict';

  export interface ITopic {
    _id: number;
    title: string;
    programmingLanguage: string;
    items: Array<Data.IExercise>;
  }

  export interface IExercise {
    _id: number;
    sortOrder: number;
    title: string;
    description: string;
    exercise: string;
    userSolution?:string;
    solution: string;
    solved?:boolean;
    solutionRequested?:boolean;
  }

  export interface ILibrary {
    name:string;
    content:any;
  }

  export enum taskType {
    validate = 2,
    compile = 0,
    run = 1
  }

  export interface IError {
    message:string;
    line:number;
  }

  export interface IStatus {
    success:boolean;
    errors:Array<IError>;
    running:boolean;
    type:taskType
  }

  export class SuccessStatus implements IStatus {
    constructor(public type:taskType,
                public running = false,
                public success = true,
                public errors = []) {
    }
  }

  export class ErrorStatus implements IStatus {
    constructor(public type:taskType,
                public errors,
                public success = false,
                public running = false) {
    }
  }

  export class PendingStatus implements IStatus {
    constructor(public type:taskType,
                public errors = [],
                public success = false,
                public running = true) {
    }
  }


}
