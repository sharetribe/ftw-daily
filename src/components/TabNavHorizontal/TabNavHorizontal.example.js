import TabNavHorizontal from './TabNavHorizontal';
import { TAB_TYPE_BUTTON, TAB_TYPE_LINK } from './TabNavHorizontal';

const selfLinkProps = {
  name: 'StyleguideComponent',
  params: { component: 'TabNavHorizontal' },
};

export const LinkTabs = {
  component: TabNavHorizontal,
  props: {
    tabs: [
      { text: 'Normal', linkProps: selfLinkProps },
      { text: 'Selected', linkProps: selfLinkProps, selected: true },
    ],
    type: TAB_TYPE_LINK,
  },
  group: 'navigation',
};

const noop = () => null;

export const ButtonTabs = {
  component: TabNavHorizontal,
  props: {
    tabs: [{ text: 'Normal', onClick: noop }, { text: 'Selected', onClick: noop, selected: true }],
    type: TAB_TYPE_BUTTON,
  },
  group: 'navigation',
};
