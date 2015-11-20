module RestClient {
  'use strict';

  export const TOPICS_URL = '/topics/';

  export interface IRestClient {
    getTopic(id:number): ng.IPromise<Data.ITopic>;
    getExercise(topicId:number, exerciseId:number):ng.IPromise<Data.IExercise>;
    getDefaultLibs():ng.IPromise<Array<Data.ILibrary>>;
    getLib(name:string):ng.IPromise<Data.ILibrary>;
    getLibs(names:string[]):ng.IPromise<Array<Data.ILibrary>>;
    getTopics():ng.IPromise<Array<Data.ITopic>>;
    createTopic(topic: Data.ITopic);
    updateTopic(topic: Data.ITopic):ng.IPromise<any>;
    deleteTopic(id:number): ng.IPromise<Data.ITopic>;
  }

  class RestClient implements IRestClient{

    topicData: Data.ITopic;

    public static $inject = [
      '$http',
      '$q'
    ];

    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService) {
    }

    getTopics():ng.IPromise<Array<Data.ITopic>>{
      return this.$http.get(TOPICS_URL).then(
        (response) => {
          return response.data;
        }
      );
    }

    getTopic(id:number):ng.IPromise<Data.ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData || this.topicData._id != id) {
        this.$http.get(TOPICS_URL + id).then(response => {
          this.topicData = <Data.ITopic> response.data;
          deferred.resolve(this.topicData);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise;
    }

    createTopic(topic: Data.ITopic) {
      this.$http.post(TOPICS_URL,topic)
        .error(e => console.log(e));
    }

    updateTopic(topic: Data.ITopic):ng.IPromise<any> {
      return this.$http.put(TOPICS_URL + topic._id,topic);
    }

    deleteTopic(id:number):ng.IPromise<Data.ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData || this.topicData._id != id) {
        this.$http.delete(TOPICS_URL + id).then(response => {
          this.topicData = <Data.ITopic> response.data;
          deferred.resolve(this.topicData);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise;
    }

    getExercise(topicId:number, exerciseId:number):ng.IPromise<Data.IExercise> {
      return this.getTopic(topicId).then(() => this.topicData.items[exerciseId - 1]);
    }

    /**
     * return the default libraries
     * */
    getDefaultLibs():ng.IPromise<Array<Data.ILibrary>>{
      return this.getLibs(["typescripts/lib.d.ts", "typescripts/chai/chai.d.ts", "typescripts/angularjs/angular.d.ts"]);
    }

    getLibs(names:string[]):ng.IPromise<Array<Data.ILibrary>>{
      return this.$q.all(names.map(name => this.getLib(name)));
    }

    getLib(libName:string):ng.IPromise<Data.ILibrary> {
      return this.$http.get(libName).then(
        (response) => {
          return {
            name:libName,
            content:response.data
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
    .module('core')
    .service('RestClient', RestClient);
}
