module test {

  export class MockData {

    static getTopic():Data.ITopic {
      return {
        "_id": 1,
        "title": "Typescript Intro - Types",
        "language": "typescript",
        "items": [
          {
            "_id": 1,
            "sortOrder": 1,
            "title": "Type Declaration",
            "description": "Typescript is statically typed: Variables have a type assigned at compile time that does not change anymore.\nFor example: a variable of type boolean can only be assigned true or false.",
            "exercise": "var typeScriptIsGreat:boolean = 1; //TODO fix to make the program compile",
            "solution": "var typeScriptIsGreat:boolean = true;"
          },
          {
            "_id": 2,
            "sortOrder": 2,
            "title": "Type Inference",
            "description": "The typescript compiler infers a type, if a value is assigned and no explicit type is declared.",
            "exercise": "var typeScriptIsGreat = true;//same as var typeScriptIsGreat:boolean = true;\ntypeScriptIsGreat = 1;//TODO fix compile error",
            "solution": "var typeScriptIsGreat = true;//same as var typeScriptIsGreat:boolean = true;\ntypeScriptIsGreat = true;"
          },
          {
            "_id": 3,
            "sortOrder": 3,
            "title": "Numbers",
            "description": "Numbers are floating point values as in Javascript.",
            "exercise": "var height = 0.5;\nvar width = 2;\n(height * width).should.equal(?);//TODO replace ?",
            "solution": "var height = 0.5;\nvar width = 2;\n(height * width).should.equal(1);"
          }
        ]
      };
    }

    static getTopics():Array<Data.ITopic> {
      return [
        {
          "_id": 1,
          "title": "Typescript Intro - Types",
          "language": "typescript",
          "items": [
            {
              "_id": 1,
              "sortOrder": 1,
              "title": "Type Declaration",
              "description": "Typescript is statically typed: Variables have a type assigned at compile time that does not change anymore.\nFor example: a variable of type boolean can only be assigned true or false.",
              "exercise": "var typeScriptIsGreat:boolean = 1; //TODO fix to make the program compile",
              "solution": "var typeScriptIsGreat:boolean = true;"
            },
            {
              "_id": 2,
              "sortOrder": 2,
              "title": "Type Inference",
              "description": "The typescript compiler infers a type, if a value is assigned and no explicit type is declared.",
              "exercise": "var typeScriptIsGreat = true;//same as var typeScriptIsGreat:boolean = true;\ntypeScriptIsGreat = 1;//TODO fix compile error",
              "solution": "var typeScriptIsGreat = true;//same as var typeScriptIsGreat:boolean = true;\ntypeScriptIsGreat = true;"
            },
            {
              "_id": 3,
              "sortOrder": 3,
              "title": "Numbers",
              "description": "Numbers are floating point values as in Javascript.",
              "exercise": "var height = 0.5;\nvar width = 2;\n(height * width).should.equal(?);//TODO replace ?",
              "solution": "var height = 0.5;\nvar width = 2;\n(height * width).should.equal(1);"
            }
          ]
        },
        {
          "_id": 2,
          "title": "Substraction",
          "language": "typescript",
          "items": [
            {
              "_id": 1,
              "sortOrder": 1,
              "title": "Type Declaration",
              "description": "Typescript is strongly typed: A variable is assigned a type, that cannot be changed.",
              "exercise": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Bruno\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = 0;\n});",
              "solution": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Bruno\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = false;\n});"
            },
            {
              "_id": 2,
              "sortOrder": 2,
              "title": "Type Declaration 2",
              "description": "Typescript is strongly typed: A variable is assigned a type, that cannot be changed.",
              "exercise": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = 0;\n});",
              "solution": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = false;\n});"
            }
          ]
        }
      ];

    }
  }

}
