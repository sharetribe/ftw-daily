import React from 'react';
import PropTypes from 'prop-types';
import { Discussion } from '../../components';

const OrderDiscussionPanel = props => {
  const { className } = props;

  const messages = [
    {
      id: 1,
      date: new Date(Date.UTC(2017, 1, 26)),
      author: 'John',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac tellus ornare, tempor lacus quis, imperdiet lectus. Morbi suscipit semper nisl at lacinia. Vestibulum malesuada mattis nisl, et venenatis enim volutpat sit amet. Nulla laoreet feugiat gravida. Fusce ultricies nisl quis aliquet ullamcorper. Nulla congue risus metus.',
    },
  ];

  return <Discussion className={className} messages={messages} />;
};

OrderDiscussionPanel.defaultProps = { className: null };

const { string } = PropTypes;

OrderDiscussionPanel.propTypes = { className: string };

export default OrderDiscussionPanel;
