module Data {
  'use strict';

  export interface ITask {
    id: number;
    language: string;
    title: string;
    description: string;
    exercise: string;
    solution: string;
  }
}
