///<reference path='../../typings/tsd.d.ts' />
module RestClient {
  'use strict';

  export interface IRestClient {
    loadKoan() : ng.IPromise<any>;
    getKoan(callback:Function):any;
  }

  class RestClient {
    public static $inject = ['$http', '$q'];
    koanData:any;

    constructor(private $http:ng.IHttpService, private $q : ng.IQService) {
    }

    get(): string {
      return 'RestClient';
    }

    loadKoan() : ng.IPromise<any> {
      var deferred = this.$q.defer();

      if (!this.koanData) {

      } else {
        deferred.resolve(this.koanData);
      }
      return deferred.promise;
    }

    getKoan(callback:Function):any {
      this.$http.get('/data/data.json').then((data) => {
        this.koanData = data.data;
        console.log("koan data")
        console.log(this.koanData.exercise);
        callback(this.koanData);
      });
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
