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
    searchText:string;

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
      this.searchText = this.searchParamsService.getSearchText();
      this.reload();
    }

    deleteTopic = (id:number, index:number) => {
      this.RestClient.deleteTopic(id).then(
        ()=> {
          this.topics.splice(index, 1);
        },
        (error)=> {
          if(error.status && error.status === 404){
            this.reload();
          }else {
            this.errorMessage = error.data.message;
          }
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

    search = () => {
      this.searchParamsService.setSearchText(this.searchText);
      this.reload();
    };

    loadAll = () => {
      this.searchParamsService.removeAuthorId();
      this.reload();
    };

    loadOwn = () => {
      this.searchParamsService.setAuthorId(this.user._id);
      this.reload();
    };

    private reload = () => {
      this.isShowAll = !this.searchParamsService.getAuthorId();
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
