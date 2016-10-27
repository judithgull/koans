"use strict";

import * as mongoose from "mongoose";

/**
 * Topic Schema
 */
export interface ITopic {
  title: string,
  programmingLanguage: String,
  authorId: String,
  items: ITopicItem[]
};

interface ITopicItem{
  sortOrder: Number,
  title: String,
  description: String,
  exercise: String,
  solution: String
};

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

