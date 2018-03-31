import { Action } from '@ngrx/store';

// load js library actions
export const LOAD_LIB = 'LOAD LIB';
export class LoadJsLib implements Action {
  readonly type = LOAD_LIB;
  constructor(public path: string) {}
}

export const LOAD_LIB_SUCCESS = 'LOAD LIB SUCCESS';
export class LoadLibSuccess implements Action {
  readonly type = LOAD_LIB_SUCCESS;
  constructor(public path: string, public lib: string) {}
}

export const LOAD_LIB_ERROR = 'LOAD LIB ERROR';
export class LoadLibError implements Action {
  readonly type = LOAD_LIB_ERROR;
  constructor(public error: any) {}
}

export type JSLibsAction = LoadJsLib | LoadLibSuccess | LoadLibError;
