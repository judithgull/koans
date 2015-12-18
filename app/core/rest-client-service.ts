module RestClient {
  "use strict";

  export const TOPICS_URL = "/topics/";

  export interface IRestClient {
    getTopic(id:number): ng.IPromise<core.ITopic>;
    getExercise(topicId:number, exerciseId:number):ng.IPromise<core.IExercise>;
    getDefaultLibs():ng.IPromise<Array<core.ILibrary>>;
    getLib(name:string):ng.IPromise<core.ILibrary>;
    getLibs(names:string[]):ng.IPromise<Array<core.ILibrary>>;
    getTopics(queryParams?):ng.IPromise<Array<core.ITopic>>;
    createTopic(topic:core.ITopic):ng.IPromise<any>;
    updateTopic(topic:core.ITopic):ng.IPromise<any>;
    deleteTopic(id:number): ng.IPromise<core.ITopic>;
    clearCachedTopic():void;
  }

  class RestClient implements IRestClient {

    topicData:core.ITopic;

    public static $inject = [
      "$http",
      "$q"
    ];

    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService) {
    }

    clearCachedTopic = () => {
      this.topicData = null;
    };

    getTopics(queryParams?):ng.IPromise<Array<core.ITopic>> {
      return this.$http({
        url: TOPICS_URL,
        method: "GET",
        params: queryParams
      }).then(
        (response) => {
          return response.data;
        }
      );
    }

    getTopic(id:number):ng.IPromise<core.ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData || this.topicData._id !== id) {
        this.$http.get(TOPICS_URL + id).then(response => {
          this.topicData = <core.ITopic> response.data;
          deferred.resolve(this.topicData);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise;
    }

    createTopic(topic:core.ITopic):ng.IPromise<any> {
      return this.$http.post(TOPICS_URL, topic);
    }

    updateTopic(topic:core.ITopic):ng.IPromise<any> {
      return this.$http.put(TOPICS_URL + topic._id, topic);
    }

    deleteTopic(id:number):ng.IPromise<core.ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData || this.topicData._id !== id) {
        this.$http.delete(TOPICS_URL + id).then(response => {
          this.topicData = <core.ITopic> response.data;
          deferred.resolve(this.topicData);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise;
    }

    getExercise(topicId:number, exerciseId:number):ng.IPromise<core.IExercise> {
      return this.getTopic(topicId).then(() => this.topicData.items[exerciseId - 1]);
    }

    /**
     * return the default libraries
     * */
    getDefaultLibs():ng.IPromise<Array<core.ILibrary>> {
      return this.getLibs(["typescripts/lib.d.ts", "typescripts/chai/chai.d.ts", "typescripts/angularjs/angular.d.ts"]);
    }

    getLibs(names:string[]):ng.IPromise<Array<core.ILibrary>> {
      return this.$q.all(names.map(name => this.getLib(name)));
    }

    getLib(libName:string):ng.IPromise<core.ILibrary> {
      return this.$http.get(libName).then(
        (response) => {
          return {
            name: libName,
            content: response.data
          };
        }
      );
    }

  }

  /**
   * @ngdoc service
   * @name exercise.service:RestClient
   *
   * @description
   *
   */
  angular
    .module("core")
    .service("RestClient", RestClient);
}
