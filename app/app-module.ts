///<reference path='../typings/tsd.d.ts' />
module koans {
  'use strict';

  /* @ngdoc object
   * @name koans
   * @description
   *
   */

  var app = angular.module('koans', [
    'ui.router',
    'ui.ace',
    'home',
    'run',
    'topic'
  ]);

  app.controller("TabController", function(){
    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };
    this.isSelected = function(checkTab){
      return this.tab === checkTab;
    }
  });
}
