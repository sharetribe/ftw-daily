import React from 'react';
import { InlineButton, MenuContent, MenuLabel, MenuItem } from '../../components';
import Menu from './Menu';

const noop = () => null;
const style = { padding: '24px' };
const btnStyle = { whiteSpace: 'nowrap' };

const MenuWrapper = () => {
  return (
    <Menu>
      <MenuLabel>
        <span>Menu</span>
      </MenuLabel>
      <MenuContent style={style}>
        <MenuItem key="first item">
          <InlineButton onClick={noop} style={btnStyle}>Click this</InlineButton>
        </MenuItem>
        <MenuItem key="second item">
          <InlineButton onClick={noop} style={btnStyle}>Click this</InlineButton>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

const MenuOnLeft = () => {
  return <div style={{ width: '50px' }}><MenuWrapper /></div>;
};

export const MenuBasic = {
  component: MenuOnLeft,
  props: {},
  group: 'navigation',
};

const MenuOnRight = () => {
  return (
    <div style={{ width: '50px', marginLeft: 'auto', marginRight: '36px' }}>
      <MenuWrapper />
    </div>
  );
};

export const MenuBasicOnRight = {
  component: MenuOnRight,
  props: {},
  group: 'navigation',
};
