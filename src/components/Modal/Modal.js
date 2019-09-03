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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { Button, IconClose } from '../../components';

import css from './Modal.css';

const KEY_CODE_ESCAPE = 27;

export class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.handleBodyKeyUp = this.handleBodyKeyUp.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { id, isOpen, onManageDisableScrolling } = this.props;
    onManageDisableScrolling(id, isOpen);
    document.body.addEventListener('keyup', this.handleBodyKeyUp);
  }

  componentDidUpdate(prevProps) {
    const { id, isOpen, onManageDisableScrolling } = prevProps;
    if (this.props.isOpen !== isOpen) {
      onManageDisableScrolling(id, this.props.isOpen);
    }
  }

  componentWillUnmount() {
    const { id, onManageDisableScrolling } = this.props;
    document.body.removeEventListener('keyup', this.handleBodyKeyUp);
    onManageDisableScrolling(id, false);
  }

  handleBodyKeyUp(event) {
    const { isOpen } = this.props;
    if (event.keyCode === KEY_CODE_ESCAPE && isOpen) {
      this.handleClose(event);
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
      scrollLayerClassName,
      closeButtonMessage,
      containerClassName,
      contentClassName,
      lightCloseButton,
      intl,
      isClosedClassName,
      isOpen,
    } = this.props;

    const closeModalMessage = intl.formatMessage({ id: 'Modal.closeModal' });
    const closeButtonClasses = classNames(css.close, {
      [css.closeLight]: lightCloseButton,
    });
    const closeBtn = isOpen ? (
      <Button
        onClick={this.handleClose}
        rootClassName={closeButtonClasses}
        title={closeModalMessage}
      >
        <span className={css.closeText}>
          {closeButtonMessage || <FormattedMessage id="Modal.close" />}
        </span>
        <IconClose rootClassName={css.closeIcon} />
      </Button>
    ) : null;

    // Modal uses given styles to wrap child components.
    // If props doesn't contain isClosedClassName, styles default to css.isClosed
    // This makes it possible to create ModalInMobile on top of Modal where style modes are:
    // visible, hidden, or none (ModalInMobile's children are always visible on desktop layout.)
    const modalClass = isOpen ? css.isOpen : isClosedClassName;
    const classes = classNames(modalClass, className);
    const scrollLayerClasses = scrollLayerClassName || css.scrollLayer;
    const containerClasses = containerClassName || css.container;
    return (
      <div className={classes}>
        <div className={scrollLayerClasses}>
          <div className={containerClasses}>
            {closeBtn}
            <div className={classNames(contentClassName || css.content)}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

ModalComponent.defaultProps = {
  children: null,
  className: null,
  scrollLayerClassName: null,
  closeButtonMessage: null,
  containerClassName: null,
  contentClassName: null,
  lightCloseButton: false,
  isClosedClassName: css.isClosed,
  isOpen: false,
  onClose: null,
};

const { bool, func, node, string } = PropTypes;

ModalComponent.propTypes = {
  children: node,
  className: string,
  scrollLayerClassName: string,
  closeButtonMessage: node,
  containerClassName: string,
  contentClassName: string,
  lightCloseButton: bool,
  id: string.isRequired,
  intl: intlShape.isRequired,
  isClosedClassName: string,
  isOpen: bool,
  onClose: func.isRequired,

  // eslint-disable-next-line react/no-unused-prop-types
  onManageDisableScrolling: func.isRequired,
};

export default injectIntl(ModalComponent);
