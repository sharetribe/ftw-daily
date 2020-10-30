/* eslint-disable no-console */
import NewsletterForm from './LoginForm';

export const Empty = {
  component: NewsletterForm,
  props: {
    formId: 'NewsletterExample',
    onSubmit(values) {
      console.log('newsletter form with form values:', values);
    },
  },
  group: 'forms',
};
