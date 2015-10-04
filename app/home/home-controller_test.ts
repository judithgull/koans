/*global describe, beforeEach, it, expect, inject, module*/
//'use strict';

describe('Home Controller', () =>  {
  var topics = test.MockData.getTopics();
  var ctrl: HomeCtrl.IHomeCtrl;
  var rs;

  beforeEach(()=> module('home'));

  beforeEach(inject(($rootScope, $controller, $q) => {
    rs = $rootScope;

    var ds = {
      getTopics: function(){
        return $q.when(topics);
      }
    };

    ctrl = $controller('HomeCtrl', {RestClient: ds});
  }));

  it('should be defined', () => {
    expect(ctrl).toBeDefined();
  });

  it('should have an empty topics array before data is resolved', ()  => {
    expect(ctrl.topics.length).toEqual(0);
  });

  describe("data loaded", () => {

    it("should have topics after data is loaded", () => {
      rs.$apply();
      expect(ctrl.topics.length).toBe(topics.length);
    });


  })



});

