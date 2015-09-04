///<reference path='../../typings/tsd.d.ts' />
///<reference path='../data/task.ts' />
///<reference path='../data/topic.ts' />
module RestClient {
  'use strict';

  export interface IRestClient {
    getKoan(): ng.IPromise<Data.ITask>;
    getTopic(): Data.ITopic;
    loadTopic(): void;
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

    loadTopic(){
      console.log("loading data");
      var deferred = this.$q.defer();

      if (!this.topicData) {
        this.$http.get('/data/newData.json').then(response => {
          this.topicData = <Data.ITopic> response.data;
          deferred.resolve(response.data);
        }).catch(reason => {
          deferred.reject(reason);
        });
      } else {
        deferred.resolve(this.topicData);
      }
      return deferred.promise;
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

    getTopic():Data.ITopic {
      return this.topicData;
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
