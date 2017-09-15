import {ILibrary} from "../core/topic";
/**
 * Programming language specific functionality  appart from built-in worker
 * */
  export interface IWorkerExtension {

    /**
     * Add libraries to ace editor
     * */
    addLibs(session:any, libs:Array<ILibrary>);

    /**
     * Adds a listener to start running the code
     * */
    addRunEventListener(session:any, cb:(string) => void);

  }

  export class TsWorkerExt implements IWorkerExtension {

    addLibs(session:any, libs:Array<ILibrary>) {
      libs.forEach(
        lib => {
          (<any>session).$worker.emit("addLibrary", {data: lib});
        }
      );
    }

    addRunEventListener(session:any, cb:(string) => void) {
      session.on("compiled", (e) => cb(e.data));
    }
  }

  export class JsWorkerExt implements IWorkerExtension {

    addLibs(session:any, libs:Array<ILibrary>) {
      // nop
    }

    addRunEventListener(session:any, cb:(string) => void) {
      session.on("changeAnnotation", () => {
        if (session.getAnnotations().length === 0) {
          cb(session.getValue());
        }
      });
    }

  }
