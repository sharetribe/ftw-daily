export { default as DynamicMap } from './DynamicGoogleMap';
export { default as StaticMap } from './StaticGoogleMap';

export const isMapsLibLoaded = () => {
  return typeof window !== 'undefined' && window.google && window.google.maps;
};
