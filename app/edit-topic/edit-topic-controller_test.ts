///<reference path='../../typings/tsd.d.ts' />
module editTopic {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('EditTopicCtrl', function () {
    var ctrl: IEditTopicModel;
    var testTopic: Data.ITopic;
    var topic;

    beforeEach(angular.mock.module('editTopic'));

    beforeEach(inject(function ($rootScope, $controller) {
      var rc = {
        createTopic: (topic:Data.ITopic) => {
          testTopic = topic
        }
      };

      ctrl = $controller('EditTopicCtrl', {'RestClient': rc});
      topic = ctrl.topic;

    }));

    it('should have typescript as initial language', function () {
      expect(topic.language).toEqual('typescript');
    });

    it('should have 1 item initially', () => {
      expect(topic.items.length).toBe(1);
    });

    it('should add a new exercise on addExercise', ()=> {
      ctrl.addExercise();
      expect(topic.items.length).toBe(2);
    });

    it('should remove an exercise on removeExercise', ()=> {
      ctrl.removeExercise(0);
      expect(topic.items.length).toBe(0);
    });

    it('should only remove one exercise', ()=> {
      ctrl.addExercise();
      ctrl.removeExercise(0);
      expect(topic.items.length).toBe(1);
    });

    it('should call createTopic with the correct arguments', () => {
      const testTitle = 'testTitle';
      const testLanguage = 'javascript';

      topic.title = testTitle;
      topic.language = testLanguage;

      ctrl.submit();

      expect(testTopic.language).toEqual(testLanguage);
      expect(testTopic.title).toEqual(testTitle);
    });

  });
}
