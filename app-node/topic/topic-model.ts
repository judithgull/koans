"use strict";

/**
 * Module dependencies.
 */
import {Schema, model} from "mongoose";


/**
 * Topic Schema
 */
const TopicSchema = new Schema({
  title: String,
  programmingLanguage: String,
  authorId: Schema.Types.ObjectId,
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
export const topicModel = model("Topic", TopicSchema);
