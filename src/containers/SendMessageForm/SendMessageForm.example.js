import SendMessageForm from './SendMessageForm';

export const Empty = {
  component: SendMessageForm,
  props: {
    messagePlaceholder: 'Send message to Juho…',
    onChange: values => {
      console.log('values changed to:', values);
    },
    onSubmit: values => {
      console.log('submit values:', values);
    },
    onFocus: () => {
      console.log('focus on message form');
    },
    onBlur: () => {
      console.log('blur on message form');
    },
  },
  group: 'forms',
};
