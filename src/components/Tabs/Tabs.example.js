import React from 'react';
import PropTypes from 'prop-types';
import Tabs from './Tabs';

const TestPanel = props => {
  return <div>{props.children}</div>;
};

const { node } = PropTypes;

TestPanel.propTypes = {
  children: node.isRequired,
};

const selfLinkProps = {
  name: 'StyleguideComponent',
  params: { component: 'Tabs' },
};

const TabsWrapper = () => {
  return (
    <Tabs>
      <TestPanel tabId="Description" tabLabel="Description" tabLinkProps={selfLinkProps}>
        Description form stuff
      </TestPanel>
      <TestPanel selected tabId="Location" tabLabel="Location" tabLinkProps={selfLinkProps}>
        Location form stuff
      </TestPanel>
      <TestPanel tabId="Price" tabLabel="Price" tabLinkProps={selfLinkProps} disabled>
        Price form stuff
      </TestPanel>
    </Tabs>
  );
};

export const Example = {
  component: TabsWrapper,
  props: {},
  group: 'navigation',
};
