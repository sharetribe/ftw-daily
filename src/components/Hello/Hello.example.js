import Hello from './Hello';

export const HelloWorld = {
  component: Hello,
  description: 'Hello to world',
  props: { name: 'world' },
};

export const HelloMars = {
  component: Hello,
  description: 'Hello to mars',
  props: { name: 'mars' },
};
