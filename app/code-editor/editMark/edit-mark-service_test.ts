import {} from "jasmine";
import * as angular from "angular";
import "angular-mocks";
import {EditMark, CustomAnnotation} from "./edit-mark-service";


module codeEditor.editMark {
  "use strict";

  describe("EditMark", function() {
    var service:EditMark;
    const testText = "Please replace ??? with the correct answer!";

    beforeEach(angular.mock.module("codeEditor"));

    beforeEach(inject(function(EditMark) {
      service = EditMark;
    }));

    it("empty text should not contain a mark", () => {
      expect(service.containsMark("")).toBe(false);
    });

    it("text with mark should contain a mark", () => {
      expect(service.containsMark(service.mark)).toBe(true);
    });

    it("null text should not contain a mark", () => {
      expect(service.containsMark(null)).toBe(false);
    });

    describe("Has only mark changed:", () => {

      it("should be valid, if no mark is available", () => {
        expect(service.hasOnlyMarkChanged("", "")).toBe(true);
      });

      it("should return true, if nothing has changed", () => {
        expect(service.hasOnlyMarkChanged("???", "???")).toBe(true);
      });

      it("should return true when mark changed", () => {
        expect(service.hasOnlyMarkChanged("???", "")).toBe(true);
        expect(service.hasOnlyMarkChanged("???", "??")).toBe(true);
        expect(service.hasOnlyMarkChanged("code ???", "code ??")).toBe(true);
        expect(service.hasOnlyMarkChanged("code ??? aaa", "code ?? aaa")).toBe(true);
        expect(service.hasOnlyMarkChanged("code ??? aa\na", "code ?\n? aa\na")).toBe(true);
      });

      it("should return false when original text changed", () => {
        expect(service.hasOnlyMarkChanged("code ???", "codxe ??")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "codxe ??? code")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "code ??? codxe")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "code ??")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "code ?? code xxx")).toBe(false);
      });


      it("should return true for multiple marks when only marks have changed", () => {
        expect(service.hasOnlyMarkChanged("??? a ???", ". a xx")).toBe(true);
      });


      it("should return false when original text changed for multiple marks", () => {
        expect(service.hasOnlyMarkChanged("a ??? a ???", "a b")).toBe(false);
      });

      it("should return true when white space of original text changed", () => {
        expect(service.hasOnlyMarkChanged("a ??? a", "aba")).toBe(true);
        expect(service.hasOnlyMarkChanged("a ??? a ???", "aba b")).toBe(true);
        expect(service.hasOnlyMarkChanged("a \n??? a ???", "aba b")).toBe(true);
        expect(service.hasOnlyMarkChanged("a \n??? a ???", "aba b\nb")).toBe(true);
      });

      it("should return false when white space of original text is removed", () => {
        expect(service.hasOnlyMarkChanged("a a \n??? a ???", "aa b a b\nb")).toBe(false);
      });

      it("should be valid for special characters as well", () => {
        expect(service.hasOnlyMarkChanged("(1 * 1).should.equal(???);", "(1 * 1).should.equal(1);")).toBe(true);
      });

    });

    describe("Annotation arrays", () => {

      it("should not be equal, for different lengths", () => {
        const a1 = [new CustomAnnotation(0, 0, testText)];
        const a2 = [];
        expect(service.equals(a1, a2)).toBe(false);
      });

      it("should be equal, for the same annotations ", () => {
        const a1 = [new CustomAnnotation(0, 0, testText)];
        const a2 = [new CustomAnnotation(0, 0, testText)];
        expect(service.equals(a1, a2)).toBe(true);
      });

      it("should not be equal, for one different annotation ", () => {
        const a1 = [new CustomAnnotation(0, 0, testText)];
        const a2 = [new CustomAnnotation(0, 1, testText)];
        expect(service.equals(a1, a2)).toBe(false);
      });

      it("should not be equal, for one different annotation (multiple values)", () => {
        const a1 = [new CustomAnnotation(0, 0, testText), new CustomAnnotation(0, 0, testText)];
        const a2 = [new CustomAnnotation(0, 0, testText), new CustomAnnotation(1, 0, testText)];
        expect(service.equals(a1, a2)).toBe(false);
      });


    });

    describe("getEditMarks", ()=> {

      it("should return an empty array for an empty, null or undefined text", () => {
        expect(service.getEditMarks(undefined)).toEqual([]);
        expect(service.getEditMarks(null)).toEqual([]);
        expect(service.getEditMarks("")).toEqual([]);
      });

      it("should find a mark on a single line", () => {
        expect(service.getEditMarks("???")).toEqual([{row: 0, column: 0}]);
        expect(service.getEditMarks("aa???")).toEqual([{row: 0, column: 2}]);
        expect(service.getEditMarks("aa???aa")).toEqual([{row: 0, column: 2}]);
        expect(service.getEditMarks("aa???aa???")).toEqual([{row: 0, column: 2}]);
      });

      it("should not return a result, if no edit mark is found", () => {
        expect(service.getEditMarks("a")).toEqual([]);
      });

      it("should return one occurrence per line for multiple lines", () => {
        expect(service.getEditMarks("\n???")).toEqual([{row: 1, column: 0}]);
      });

    });

    describe("split visible", () => {
      it("should not split, if there is no hidden marker", () => {
        expect(service.splitVisible("")).toEqual({visible: "", hidden: ""});
        expect(service.splitVisible("a")).toEqual({visible: "a", hidden: ""});
        expect(service.splitVisible("a\nb")).toEqual({visible: "a\nb", hidden: ""});
      });

      it("should split on the first hidden marker", () => {
        expect(service.splitVisible("//hidden\nabc")).toEqual({visible: "", hidden: "abc"});
        expect(service.splitVisible("a\n//hidden\nb")).toEqual({visible: "a", hidden: "b"});
        expect(service.splitVisible("a\n//hidden\nb\nc")).toEqual({visible: "a", hidden: "b\nc"});
        expect(service.splitVisible("a\nb\n//hidden\nb\nc")).toEqual({visible: "a\nb", hidden: "b\nc"});
        expect(service.splitVisible("a\nb\n//hidden aaa\nb\nc")).toEqual({visible: "a\nb", hidden: "b\nc"});
      });

    });

  });

}
