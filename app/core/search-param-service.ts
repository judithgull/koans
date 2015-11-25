///<reference path='../../typings/tsd.d.ts' />
module core {
  'use strict';

  export interface ISearchParam{
    authorId?:string
    search?:string
  }


  export class SearchParamsService {
    private AUTHOR_ID_KEY = 'queryAuthorId';
    private SEARCH_TEXT_KEY = 'querySearchText';

    setAuthorId = (authorId:string) => {
      localStorage.setItem(this.AUTHOR_ID_KEY,authorId);
    };

    getAuthorId = ():string => {
      return localStorage.getItem(this.AUTHOR_ID_KEY);
    };

    removeAuthorId = () => {
      localStorage.removeItem(this.AUTHOR_ID_KEY);
    };

    setSearchText = (searchText:string) => {
      localStorage.setItem(this.SEARCH_TEXT_KEY,searchText);
    };

    removeSearchText = () => {
      localStorage.removeItem(this.SEARCH_TEXT_KEY);
    };

    getSearchText = ():string => {
      return localStorage.getItem(this.SEARCH_TEXT_KEY);
    };

    clear = () => {
      this.removeAuthorId();
      this.removeSearchText();
    };

    getSearchParam = ():ISearchParam => {
      var authorId = this.getAuthorId();
      var query:ISearchParam = {};
      if(authorId){
        query.authorId = authorId;
      }
      var search = this.getSearchText();
      if(search){
        query.search = search;
      }
      return query;
    }

  }

  /**
   * @ngdoc service
   * @name core.service:TopicQueryParams
   *
   * @description
   *
   */
  angular
    .module('core')
    .service('SearchParamsService', SearchParamsService);
}
