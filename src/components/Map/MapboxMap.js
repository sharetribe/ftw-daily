export { default as DynamicMap } from './DynamicMapboxMap';
export { default as StaticMap } from './StaticMapboxMap';

export const isMapsLibLoaded = () => {
  return typeof window !== 'undefined' && window.mapboxgl;
};
