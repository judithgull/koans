/**
 * Create an object that is mapping ids to entities from an array of entities
 * @param a array of entities
 * @param extractIdFn function to extract if of an entity
 * @param initialEntities initial entity object
 */
export function createEntities<T>(
  a: T[],
  extractIdFn: (T) => string,
  initialEntities: { [id: string]: T } = {}
): { [id: string]: T } {
  return a.reduce(
    (entities: { [id: string]: T }, s: T) => {
      return {
        ...entities,
        [extractIdFn(s)]: s
      };
    },
    {
      ...initialEntities
    }
  );
}
