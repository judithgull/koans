/**
 * Programming language specific functionality  appart from built-in worker
 * */
module codeEditor {
  'use strict';

  export interface IWorkerExtension {

    /**
     * Add libraries to ace editor
     * */
    addLibs(session:AceAjax.IEditSession, libs:Array<Data.ILibrary>);

    /**
     * Adds a listener to start running the code
     * */
    addRunEventListener(session:AceAjax.IEditSession, cb:(string) => void);

  }

  export class TsWorkerExt implements IWorkerExtension {

    addLibs(session:AceAjax.IEditSession, libs:Array<Data.ILibrary>) {
      libs.forEach(
        lib => {
          (<any>session).$worker.emit('addLibrary', {data: lib});
        }
      );
    }

    addRunEventListener(session:AceAjax.IEditSession, cb:(string) => void) {
      session.on("compiled", (e) => cb(e.data));
    }
  }

  export class JsWorkerExt implements IWorkerExtension {

    addLibs(session:AceAjax.IEditSession, libs:Array<Data.ILibrary>) {
      //nop
    }

    addRunEventListener(session:AceAjax.IEditSession, cb:(string) => void) {
      session.on("changeAnnotation", () => {
        if (session.getAnnotations().length === 0) {
          cb(session.getValue());
        }
      });
    }

  }

}
