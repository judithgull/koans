module RestClient {
  'use strict';

  export interface IRestClient {
    getTopic(id:number): ng.IPromise<Data.ITopic>;
    getExercise(topicId:number, exerciseId:number):ng.IPromise<Data.IExercise>;
    getLib(name:string):ng.IPromise<Data.ILibrary>;
    getLibs(names:string[]):ng.IPromise<Array<Data.ILibrary>>;
    getTopics():ng.IPromise<Array<Data.ITopic>>;
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
      return this.$http.get('/topics').then(
        (response) => {
          return response.data;
        }
      );
    }

    getTopic(id:number):ng.IPromise<Data.ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData || this.topicData.id != id) {
        this.$http.get('/topics').then(response => {
          this.topicData = <Data.ITopic> response.data[id-1];
          deferred.resolve(this.topicData);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise;
    }

    getExercise(topidId:number, exerciseId:number):ng.IPromise<Data.IExercise> {
      return this.getTopic(topidId).then(() => this.topicData.items[exerciseId - 1]);
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
