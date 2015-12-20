module topicList {
  "use strict";

  export interface ITopicListCtrl {
    topics: Array<core.ITopic>;
    deleteTopic: Function;
    equalsUser: Function;
  }


  class TopicListCtrl implements ITopicListCtrl {
    errorMessage:string = null;
    user:core.IUser;
    isShowAll:boolean;
    isLoggedIn:boolean;
    topics:Array<core.ITopic> = [];
    searchText:string;

    public static $inject = [
      "RestClient",
      "AuthService",
      "SearchParamsService"
    ];

    constructor(private RestClient:core.IRestClient,
                private authService:auth.IAuthService,
                private searchParamsService:core.SearchParamsService) {

      this.isLoggedIn = authService.isLoggedIn();
      this.user = this.authService.getLoggedInUser();
      this.searchText = this.searchParamsService.getSearchText();
      this.reload();
      (<Toastr>toastr).clear();
    }

    deleteTopic = (id:number, index:number) => {
      this.RestClient.deleteTopic(id).then(
        ()=> {
          this.topics.splice(index, 1);
        },
        (error)=> {
          if (error.status && error.status === 404) {
            this.reload();
            toastr.error("This topic does not exist anymore");
          } else {
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
   * @name topicList.controller:TopicListCtrl
   *
   * @description Controller for list of topics
   *
   */
  angular
    .module("topicList")
    .controller("TopicListCtrl", TopicListCtrl);
}
