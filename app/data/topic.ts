///<reference path='../data/task.ts' />
module Data {
  'use strict';

  export interface ITopic {
    id: number;
    title: string;
    language: string;
    items: Array<Data.ITask>;
  }
}
