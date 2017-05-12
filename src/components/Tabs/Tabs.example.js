import React from 'react';
import Tabs from './Tabs';

const TestPanel = props => {
  return <div>{props.children}</div>;
};

TestPanel.propTypes = {
  children: React.PropTypes.node.isRequired,
};

const selfLinkProps = {
  name: 'StyleguideComponent',
  params: { component: 'Tabs' },
};

const TabsWrapper = () => {
  return (
    <Tabs>
      <TestPanel tabLabel="Description" tabLinkProps={selfLinkProps}>
        Description form stuff
      </TestPanel>
      <TestPanel selected tabLabel="Location" tabLinkProps={selfLinkProps}>
        Location form stuff
      </TestPanel>
      <TestPanel tabLabel="Price" tabLinkProps={selfLinkProps} disabled>
        Price form stuff
      </TestPanel>
    </Tabs>
  );
};

export const Example = {
  component: TabsWrapper,
  props: {},
};
