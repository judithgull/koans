// /* global describe, beforeEach, it, expect, inject, module */
// module server.user {
//   "use strict";
//   var sinon:SinonStatic = require("sinon");
//   var assert = require("assert");
//   var userCtrlModule = require("./user-controller");
//
//   describe("UserController", () => {
//     var userCtrl;
//     beforeEach(() => {
//       var mockBcrypt = {
//         hash: (payload, x, y, callback) => {
//           callback(null, "testHash");
//         }
//       };
//       userCtrl = new userCtrlModule.UserController(mockBcrypt);
//     });
//
//     it("should save a user", () => {
//       var mockSave = sinon.spy();
//
//       var mockUser = {
//         name: "",
//         email: "",
//         password: "",
//         save: mockSave
//       };
//
//       userCtrl.saveUser("testname", "testemail", "testpass", mockUser);
//       assert(mockUser.name === "testname");
//       assert(mockUser.email === "testemail");
//       assert(mockUser.password === "testHash");
//       sinon.assert.calledOnce(mockSave);
//
//     });
//   });
// }
