"use strict";

import * as mongoose from "mongoose";

const SEARCH_LIMIT = 100;

/**
 * Topic Schema
 */
export interface ITopic {
  title: string,
  programmingLanguage: String,
  authorId: String,
  items: ITopicItem[]
}

interface ITopicItem{
  sortOrder: Number,
  title: String,
  description: String,
  exercise: String,
  solution: String
}

interface ITopicModel extends ITopic, mongoose.Document { }

const TopicSchema = new mongoose.Schema({
  title: String,
  programmingLanguage: String,
  authorId:String,
  items: [{
    sortOrder: Number,
    title: String,
    description: String,
    exercise: String,
    solution: String
  }]
});


export const get = (id: string):mongoose.Promise<ITopicModel> => {
    return Topic.findById(id).exec();
};

export const create = (t:ITopic):mongoose.Promise<ITopicModel> => {
  return Topic.create(t);
};

export const remove = (id: string):mongoose.Promise<ITopicModel> => {
  return Topic.remove({_id: id}).exec();
};

export const find = (authorId?:string, searchText?:string): mongoose.Promise<ITopicModel[]> => {
  const query:any = {};
  if(authorId){
    query.authorId = authorId;
  }
  if(searchText){
    query.$text = {$search: searchText};
  }

  return Topic
    .find(query)
    .limit(SEARCH_LIMIT)
    .sort({_id: -1})
    .exec();
};

/**
 * Clear collection
 */
export const clear = ():mongoose.Promise<{}> => {
  return Topic.remove({}).exec();
};

/**
 * Expose
 */
export const Topic = mongoose.model<ITopicModel>("Topic", TopicSchema);

