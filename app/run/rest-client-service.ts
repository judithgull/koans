///<reference path='../../typings/tsd.d.ts' />
module RestClient {
  'use strict';

  export interface IRestClient {
    getKoan(): ng.IPromise<any>;
  }

  class RestClient {

    public static $inject = [
      '$http',
      '$q'
    ];

    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService) {
    }

    getKoan():ng.IPromise<any> {
      var deferred = this.$q.defer();
      this.$http.get('/data/data.json').then(response => {
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
