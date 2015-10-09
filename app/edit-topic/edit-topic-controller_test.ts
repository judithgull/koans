///<reference path='../../typings/tsd.d.ts' />
module editTopic {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('EditTopicCtrl', function () {
    var ctrl: IEditTopicModel;
    var testTopic:Data.ITopic;

    beforeEach(angular.mock.module('editTopic'));

    beforeEach(inject(function ($rootScope, $controller) {
      var rc = {
        createTopic: (topic:Data.ITopic) => {
          testTopic = topic
        }
      };

      ctrl = $controller('EditTopicCtrl', {'RestClient': rc});
    }));

    it('should have typescript as initial language', function () {
      expect(ctrl.language).toEqual('typescript');
    });

    it('should have 1 item initially', () => {
      expect(ctrl.items.length).toBe(1);
    });

    it('should add a new exercise on addExercise', ()=> {
      ctrl.addExercise();
      expect(ctrl.items.length).toBe(2);
    });

    it('should call createTopic with the correct arguments', () => {
      const testTitle = 'testTitle';
      const testLanguage = 'javascript';

      ctrl.title = testTitle;
      ctrl.language = testLanguage;

      ctrl.submit();

      expect(testTopic.language).toEqual(testLanguage);
      expect(testTopic.title).toEqual(testTitle);
    });

  });
}
