///<reference path='../../typings/tsd.d.ts' />
///<reference path='../data/task.ts' />
///<reference path='../data/topic.ts' />
module RestClient {
  'use strict';

  export interface IRestClient {
    getKoan(): ng.IPromise<Data.ITask>;
    getTopic(): ng.IPromise<Data.ITopic>;
  }

  class RestClient {

    public static $inject = [
      '$http',
      '$q'
    ];

    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService) {
    }

    getKoan():ng.IPromise<Data.ITask> {
      var deferred = this.$q.defer();
      this.$http.get('/data/data.json').then(response => {
        deferred.resolve(response.data);
      }).catch(reason => {
        deferred.reject(reason);
      });
      return deferred.promise;
    }

    getTopic():ng.IPromise<Data.ITopic> {
      var deferred = this.$q.defer();
      this.$http.get('/data/newData.json').then(response => {
        deferred.resolve(response.data);
      }).catch(reason => {
        deferred.reject(reason);
      });
      return deferred.promise;
    }

  }

  /**
   * @ngdoc service
   * @name run.service:RestClient
   *
   * @description
   *
   */
  angular
    .module('run')
    .service('RestClient', RestClient);
}
