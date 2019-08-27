import SendMessageForm from './SendMessageForm';

export const Empty = {
  component: SendMessageForm,
  props: {
    formId: 'SendMessageForm.Empty.Form',
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
    formId: 'SendMessageForm.InProgress.Form',
    messagePlaceholder: 'Send message to Juho…',
    inProgress: true,
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'forms',
};

export const Error = {
  component: SendMessageForm,
  props: {
    formId: 'SendMessageForm.Error.Form',
    messagePlaceholder: 'Send message to Juho…',
    sendMessageError: { type: 'error', name: 'ExampleError' },
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'forms',
};
