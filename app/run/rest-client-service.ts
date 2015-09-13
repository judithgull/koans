///<reference path='../../typings/tsd.d.ts' />
///<reference path='../data/task.ts' />
///<reference path='../data/topic.ts' />
module RestClient {
  'use strict';

  export interface IRestClient {
    getTopic(): Data.ITopic;
    loadTopic(id:number): ng.IPromise<Data.ITopic>;
    getExercise(id:number):Data.ITask;
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

    loadTopic(id:number):ng.IPromise<Data.ITopic> {
      var deferred = this.$q.defer();

      if (!this.topicData) {
        this.$http.get('/data/newData.json').then(response => {
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

    getExercise(id:number):Data.ITask {
      return this.topicData.items[id-1];
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
