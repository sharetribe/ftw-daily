/* eslint-disable no-console, import/prefer-default-export */
import HeroSearchForm from './HeroSearchForm';

export const Empty = {
  component: HeroSearchForm,
  props: {
    onSubmit(values) {
      console.log('submit search query:', values);
    },
  },
};
