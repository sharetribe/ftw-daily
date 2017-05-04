/**
 * Modal creates popup which on mobile layout fills the entire visible page.
 *
 * Example:
 * <Parent>
 *   <Modal isOpen={this.state.modalIsOpen} onClose={handleClose}>
 *     <FormX />
 *   </Modal>
 * </Parent>
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { intlShape, injectIntl } from 'react-intl';
import { Button } from '../../components';

import closeIcon from './images/closeIcon.svg';
import css from './Modal.css';

export class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { isOpen, togglePageClassNames } = this.props;
    togglePageClassNames(css.modalIsOpen, isOpen);
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, togglePageClassNames } = this.props;
    if (nextProps.isOpen !== isOpen) {
      togglePageClassNames(css.modalIsOpen, nextProps.isOpen);
    }
  }

  handleClose(event) {
    const { onClose, togglePageClassNames } = this.props;
    togglePageClassNames(css.modalIsOpen, false);
    onClose(event);
  }

  render() {
    const {
      children,
      className,
      intl,
      isClosedClassName,
      isOpen,
      title,
    } = this.props;

    const closeModalMessage = intl.formatMessage({ id: 'Modal.closeModal' });
    const modalTitle = title ? <h2 className={css.title}>{title}</h2> : null;
    const closeBtn = (
      <Button onClick={this.handleClose} className={css.close} title={closeModalMessage}>
        <img src={closeIcon} alt={closeModalMessage} />
      </Button>
    );

    // Header
    const header = isOpen
      ? <div className={css.header}>
          {modalTitle}
          {closeBtn}
        </div>
      : null;

    // Modal uses given styles to wrap child components.
    // If props doesn't contain isClosedClassName, styles default to css.isClosed
    // This makes it possible to create ModalInMobile on top of Modal where style modes are:
    // visible, hidden, or none (ModalInMobile's children are always visible on desktop layout.)
    const modalClass = isOpen ? css.isOpen : isClosedClassName;
    const classes = classNames(modalClass, className);
    return (
      <div className={classes}>
        {header}
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
  title: null,
};

const { bool, func, node, string } = PropTypes;

ModalComponent.propTypes = {
  children: node,
  className: string,
  intl: intlShape.isRequired,
  isClosedClassName: string,
  isOpen: bool,
  onClose: func.isRequired,
  title: string,

  // eslint-disable-next-line react/no-unused-prop-types
  togglePageClassNames: func.isRequired,
};

export default injectIntl(ModalComponent);
