import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Service for loading monaco editor and extra libraries
 */
@Injectable()
export class MonacoLoaderService implements OnDestroy {
  isMonacoLoaded = new BehaviorSubject<boolean>(false);

  private _monacoPath = 'assets/monaco-editor/vs';
  private _extraLib: monaco.IDisposable;

  constructor(ngZone: NgZone) {
    const onGotAmdLoader = () => {
      this.loadMonacoEditor(() =>
        ngZone.run(() => this.isMonacoLoaded.next(true))
      );
    };

    if (!(<any>window).require) {
      this.loadAMDLoader(onGotAmdLoader);
    } else {
      onGotAmdLoader();
    }
  }

  private loadAMDLoader(done: () => void) {
    const loaderScript = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = `${this._monacoPath}/loader.js`;
    loaderScript.addEventListener('load', done);
    document.body.appendChild(loaderScript);
  }

  private loadMonacoEditor(done: () => void) {
    if (!(<any>window).monaco) {
      (<any>window).require.config({ paths: { vs: this._monacoPath } });
      (<any>window).require(['vs/editor/editor.main'], () => {
        this.addExtraLibs();
        done();
      });
    } else {
      done();
    }
  }

  /**
   * Add global type definitions
   */
  private addExtraLibs() {
    if (!this._extraLib) {
      this._extraLib = monaco.languages.typescript.typescriptDefaults.addExtraLib(
        'declare const expect:any;',
        'testlib.d.ts'
      );
    }
  }
  public ngOnDestroy(): void {
    if (this._extraLib) {
      this._extraLib.dispose();
    }
  }
}
