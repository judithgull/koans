module Data {
  'use strict';

  export interface ITopic {
    id: number;
    title: string;
    language: string;
    items: Array<Data.IExercise>;
  }

  export interface IExercise {
    id: number;
    title: string;
    description: string;
    exercise: string;
    solution: string;
  }

  export interface ILibrary {
    name:string;
    content:any;
  }
}
