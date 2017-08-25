import TabNavHorizontal from './TabNavHorizontal';

const selfLinkProps = {
  name: 'StyleguideComponent',
  params: { component: 'TabNavHorizontal' },
};

export const Empty = {
  component: TabNavHorizontal,
  props: {
    tabs: [
      { text: 'Normal', linkProps: selfLinkProps },
      { text: 'Selected', linkProps: selfLinkProps, selected: true },
    ],
  },
  group: 'navigation',
};
