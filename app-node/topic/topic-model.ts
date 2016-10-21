"use strict";

import * as mongoose from "mongoose";

/**
 * Topic Schema
 */
export interface ITopic {
  title: string,
  programmingLanguage: String,
  authorId: mongoose.Types.ObjectId,
  items: [{
    sortOrder: Number,
    title: String,
    description: String,
    exercise: String,
    solution: String
  }]
}

interface ITopicModel extends ITopic, mongoose.Document { }

const TopicSchema = new mongoose.Schema({
  title: String,
  programmingLanguage: String,
  authorId: mongoose.Schema.Types.ObjectId,
  items: [{
    sortOrder: Number,
    title: String,
    description: String,
    exercise: String,
    solution: String
  }]
});

/**
 * Expose
 */
export const Topic = mongoose.model<ITopicModel>("Topic", TopicSchema);

