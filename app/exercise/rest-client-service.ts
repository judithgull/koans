module RestClient {
  'use strict';

  export interface IRestClient {
    getTopic(id:number): ng.IPromise<Data.ITopic>;
    getExercise(topicId:number, exerciseId:number):ng.IPromise<Data.IExercise>;
    getTSLibrary():ng.IPromise<any>;
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

    getTopic(id:number):ng.IPromise<Data.ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData) {
        this.$http.get('/data/sampleData.json').then(response => {
          this.topicData = <Data.ITopic> response.data[id];
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


    getTSLibrary():ng.IPromise<any> {
      var deferred = this.$q.defer();

      this.$http.get('/typescripts/lib.d.ts').then(response => {
        deferred.resolve(response.data);
      }).catch(reason => {
        deferred.reject(reason);
      });

      return deferred.promise;
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
    .module('exercise')
    .service('RestClient', RestClient);
}
