///<reference path="../../typings/tsd.d.ts" />

/* global describe, beforeEach, it, expect, inject, module */
module core {
  "use strict";
  describe("SearchParamsService", () => {
    var service:SearchParamsService;

    beforeEach(angular.mock.module("core"));

    beforeEach(inject((SearchParamsService) => {
      service = SearchParamsService;
    }));

    afterEach(()=> {
      service.clear();
    });

    it("should return an empty query, if nothing is set", () => {
      expect(service.getSearchParam()).toEqual({});
    });

    it("should return a query with author, if an author is set", () => {
      var testId = "testId";
      service.setAuthorId(testId);
      expect(service.getSearchParam().authorId).toEqual(testId);
    });

    it("should return a query with a search text, if an searchText is set", () => {
      var testSearch = "mySearch";
      service.setSearchText(testSearch);
      expect(service.getSearchParam().search).toEqual(testSearch);
    });

  });
}
