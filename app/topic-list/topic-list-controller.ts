import {IUser} from "../core/user";
import {ITopic} from "../core/topic";
import {SearchParamsService} from "../core/search-param-service";
import {IRestClient, RestClient} from "../core/rest-client-service";
import {IAuthService} from "../auth/auth-service";
import * as toastr from "toastr";
import * as angular from "angular";

export interface ITopicListCtrl {
    topics: ITopic[];
    deleteTopic: any;
    equalsUser: any;
}


export class TopicListCtrl implements ITopicListCtrl {
    errorMessage:string = null;
    user:IUser;
    isShowAll:boolean;
    isLoggedIn:boolean;
    topics:ITopic[] = [];
    searchText:string;

    public static $inject = [
      "RestClient",
      "AuthService",
      "SearchParamsService"
    ];

    constructor(private RestClient:IRestClient,
                private authService:IAuthService,
                private searchParamsService:SearchParamsService) {

      this.isLoggedIn = authService.isLoggedIn();
      this.user = this.authService.getLoggedInUser();
      this.searchText = this.searchParamsService.getSearchText();
      this.reload();
      (toastr as Toastr).clear();
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
      const queryParams = this.searchParamsService.getSearchParam();
      this.RestClient.getTopics(queryParams).then((topics) => {
        this.topics = topics;
      });
    }
  }
