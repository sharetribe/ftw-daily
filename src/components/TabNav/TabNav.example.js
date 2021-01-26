import TabNav from './TabNav';

const selfLinkProps = {
  name: 'StyleguideComponent',
  params: { component: 'TabNav' },
};

export const Empty = {
  component: TabNav,
  props: {
    tabs: [
      { text: 'Normal', linkProps: selfLinkProps },
      { text: 'Selected', linkProps: selfLinkProps, selected: true },
    ],
  },
  group: 'navigation',
};
