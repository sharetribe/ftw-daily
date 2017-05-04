/* eslint-disable no-console */
import SearchForm from './SearchForm';

export const Empty = {
  component: SearchForm,
  props: {
    onSubmit(values) {
      console.log('submit search query:', values);
    },
  },
};
