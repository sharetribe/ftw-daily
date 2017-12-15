import React from 'react';
import { LinkTabNavHorizontal, ButtonTabNavHorizontal } from './TabNavHorizontal';

const selfLinkProps = {
  name: 'StyleguideComponent',
  params: { component: 'TabNavHorizontal' },
};

const linkTabs = [
  { text: 'Normal', linkProps: selfLinkProps },
  { text: 'Selected', linkProps: selfLinkProps, selected: true },
];

const noop = () => null;

const buttonTabs = [
  { text: 'Normal', onClick: noop },
  { text: 'Selected', onClick: noop, selected: true },
];

const TabNavHorizontalComponent = () => {
  return (
    <div>
      <h3>Horizontal link tab navigation with light skin</h3>
      <LinkTabNavHorizontal tabs={linkTabs} />

      <h3>Horizontal link tab navigation with dark skin</h3>
      <LinkTabNavHorizontal tabs={linkTabs} skin="dark" />

      <h3>Horizontal button tab navigation with light skin</h3>
      <ButtonTabNavHorizontal tabs={buttonTabs} />

      <h3>Horizontal button tab navigation with dark skin</h3>
      <ButtonTabNavHorizontal tabs={buttonTabs} skin="dark" />
    </div>
  );
};

export const TabNavHorizontal = {
  component: TabNavHorizontalComponent,
  group: 'navigation',
};
