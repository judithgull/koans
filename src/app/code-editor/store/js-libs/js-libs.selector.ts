import { createSelector, createFeatureSelector } from '@ngrx/store';
import { JsLibsEntities } from './js-libs.reducer';

/**
 * libs feature selector
 */
export const getLibs = createFeatureSelector<JsLibsEntities>('codeEditor');

/**
 * Get libs as entities object
 */
export const getLibsEntities = createSelector(getLibs, state => {
  return state && state['jsLibs'] && state['jsLibs']['entities'];
});

export const getLib = (path: string) => {
  return createSelector(
    getLibsEntities,
    entities => entities && entities[path]
  );
};
