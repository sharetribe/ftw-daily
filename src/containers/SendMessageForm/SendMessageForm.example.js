import SendMessageForm from './SendMessageForm';

export const Empty = {
  component: SendMessageForm,
  props: {
    form: 'Styleguide_SendMessageForm_Empty',
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

export const InProgress = {
  component: SendMessageForm,
  props: {
    form: 'Styleguide_SendMessageForm_InProgress',
    messagePlaceholder: 'Send message to Juho…',
    inProgress: true,
  },
  group: 'forms',
};

export const Error = {
  component: SendMessageForm,
  props: {
    form: 'Styleguide_SendMessageForm_Error',
    messagePlaceholder: 'Send message to Juho…',
    sendMessageError: { type: 'error', name: 'ExampleError' },
  },
  group: 'forms',
};
