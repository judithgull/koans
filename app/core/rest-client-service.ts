import {ILibrary, IExercise,  ITopic} from "./topic";
import * as angular from "angular";

  export const TOPICS_URL = "/topics/";

  export interface IRestClient {
    getTopic(id:number): ng.IPromise<ITopic>;
    getExercise(topicId:number, exerciseId:number):ng.IPromise<IExercise>;
    getDefaultLibs():ng.IPromise<Array<ILibrary>>;
    getLib(name:string):ng.IPromise<ILibrary>;
    getLibs(names:string[]):ng.IPromise<Array<ILibrary>>;
    getTopics(queryParams?):ng.IPromise<Array<ITopic>>;
    createTopic(topic:ITopic):ng.IPromise<any>;
    updateTopic(topic:ITopic):ng.IPromise<any>;
    deleteTopic(id:number): ng.IPromise<ITopic>;
    clearCachedTopic():void;
  }

  export class RestClient implements IRestClient {

    topicData:ITopic;

    public static $inject = [
      "$http",
      "$q"
    ];

    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService) {
    }

    private getGlobals = (libName:string) => {
      if (libName === "typescripts/chai/index.d.ts") {
        return "chai.should();var expect = chai.expect;var assert = chai.assert;";
      }
      return "";
    };

    clearCachedTopic = () => {
      this.topicData = null;
    };

    getTopics(queryParams?):ng.IPromise<Array<ITopic>> {
      return this.$http({
        url: TOPICS_URL,
        method: "GET",
        params: queryParams
      }).then(
        (response) => {
          return response.data;
        }
      ) as ng.IPromise<Array<ITopic>>;
    }

    getTopic(id:number):ng.IPromise<ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData || this.topicData._id !== id) {
        this.$http.get(TOPICS_URL + id).then(response => {
          this.topicData = <ITopic> response.data;
          deferred.resolve(this.topicData);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise as ng.IPromise<ITopic>;
    }

    createTopic(topic:ITopic):ng.IPromise<any> {
      return this.$http.post(TOPICS_URL, topic);
    }

    updateTopic(topic:ITopic):ng.IPromise<any> {
      return this.$http.put(TOPICS_URL + topic._id, topic);
    }

    deleteTopic(id:number):ng.IPromise<ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData || this.topicData._id !== id) {
        this.$http.delete(TOPICS_URL + id).then(response => {
          this.topicData = <ITopic> response.data;
          deferred.resolve(this.topicData);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise as ng.IPromise<ITopic>;
    }

    getExercise(topicId:number, exerciseId:number):ng.IPromise<IExercise> {
      return this.getTopic(topicId).then(() => this.topicData.items[exerciseId - 1]);
    }

    /**
     * return the default libraries
     * */
    getDefaultLibs():ng.IPromise<Array<ILibrary>> {
      return this.getLibs(["typescripts/lib.d.ts", "typescripts/chai/index.d.ts", "typescripts/angular/index.d.ts"]);
    }

    getLibs(names:string[]):ng.IPromise<Array<ILibrary>> {
      return this.$q.all(names.map(name => this.getLib(name)));
    }

    getLib(libName:string):ng.IPromise<ILibrary> {
      return this.$http.get(libName).then(
        (response) => {
          return {
            name: libName,
            content: response.data + this.getGlobals(libName)
          };
        }
      );
    }

}
