/* eslint-disable import/prefer-default-export */

export const createSlug = (str) =>
encodeURIComponent(str.toLowerCase().split(' ').join('-'))
