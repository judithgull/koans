module topicList {
  'use strict';

  export interface ITopicListCtrl {
    topics: Array<Data.ITopic>;
    deleteTopic: Function;
    equalsUser: Function;
  }


  class TopicListCtrl implements ITopicListCtrl {
    errorMessage:string = null;
    user:app.IUser;
    isShowAll:boolean;
    isLoggedIn:boolean;
    topics:Array<Data.ITopic> = [];

    public static $inject = [
      'RestClient',
      'AuthService',
      'SearchParamsService'
    ];

    constructor(private RestClient:RestClient.IRestClient,
                private authService:auth.IAuthService,
                private searchParamsService:core.SearchParamsService) {

      this.isLoggedIn = authService.isLoggedIn();
      this.user = this.authService.getLoggedInUser();
      this.reload();
    }

    deleteTopic = (id:number, index:number) => {
      this.RestClient.deleteTopic(id).then(
        ()=> {
          this.topics.splice(index, 1);
        },
        (error)=> {
          this.errorMessage = error.data.message;
        }
      );
    };

    equalsUser = (authorId:string) => {
      if (this.user) {
        return authorId === this.user._id;
      } else {
        return false;
      }
    };

    loadAllTopics = () => {
      this.searchParamsService.removeAuthorId();
      this.reload();
    };

    loadOwnTopics = () => {
      this.searchParamsService.setAuthorId(this.user._id);
      this.reload();
    };

    reload = () => {
      this.isShowAll = !!this.searchParamsService.getAuthorId();
      var queryParams = this.searchParamsService.getSearchParam();
      this.RestClient.getTopics(queryParams).then(topics => {
        this.topics = topics;
      });
    }
  }


  /**
   * @ngdoc object
   * @name topic-list.controller:TopicListCtrl
   *
   * @description
   *
   */
  angular
    .module('topicList')
    .controller('TopicListCtrl', TopicListCtrl);
}
