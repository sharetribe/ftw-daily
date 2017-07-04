/**
 * Modal creates popup which on mobile layout fills the entire visible page.
 *
 * Example:
 * <Parent>
 *   <Modal id="UniqueIdForThisModal" isOpen={this.state.modalIsOpen} onClose={handleClose}>
 *     <FormX />
 *   </Modal>
 * </Parent>
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Button, CloseIcon } from '../../components';

import css from './Modal.css';

export class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { id, isOpen, onManageDisableScrolling } = this.props;
    onManageDisableScrolling(id, isOpen);
  }

  componentWillReceiveProps(nextProps) {
    const { id, isOpen, onManageDisableScrolling } = this.props;
    if (nextProps.isOpen !== isOpen) {
      onManageDisableScrolling(id, nextProps.isOpen);
    }
  }

  handleClose(event) {
    const { id, onClose, onManageDisableScrolling } = this.props;
    onManageDisableScrolling(id, false);
    onClose(event);
  }

  render() {
    const {
      children,
      className,
      intl,
      isClosedClassName,
      isOpen,
    } = this.props;

    const closeModalMessage = intl.formatMessage({ id: 'Modal.closeModal' });
    const closeBtn = isOpen
      ? <Button onClick={this.handleClose} rootClassName={css.close} title={closeModalMessage}>
          <span className={css.closeText}><FormattedMessage id="Modal.close" /></span>
          <CloseIcon rootClassName={css.closeIcon} />
        </Button>
      : null;

    // Modal uses given styles to wrap child components.
    // If props doesn't contain isClosedClassName, styles default to css.isClosed
    // This makes it possible to create ModalInMobile on top of Modal where style modes are:
    // visible, hidden, or none (ModalInMobile's children are always visible on desktop layout.)
    const modalClass = isOpen ? css.isOpen : isClosedClassName;
    const classes = classNames(modalClass, className);
    return (
      <div className={classes}>
        {closeBtn}
        <div className={css.content}>
          {children}
        </div>
      </div>
    );
  }
}

ModalComponent.defaultProps = {
  children: null,
  className: '',
  isClosedClassName: css.isClosed,
  isOpen: false,
  onClose: null,
};

const { bool, func, node, string } = PropTypes;

ModalComponent.propTypes = {
  children: node,
  className: string,
  id: string.isRequired,
  intl: intlShape.isRequired,
  isClosedClassName: string,
  isOpen: bool,
  onClose: func.isRequired,

  // eslint-disable-next-line react/no-unused-prop-types
  onManageDisableScrolling: func.isRequired,
};

export default injectIntl(ModalComponent);
