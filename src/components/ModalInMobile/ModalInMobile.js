/**
 * ModalInMobile gives possibility separate part of existing DOM so that in mobile views that
 * fragment is shown in a separate modal layer on top of the page.
 *
 * Currently, this does not implement resize listener for window.
 *
 * Example:
 * <Parent>
 *   <ModalInMobile isModalOpenOnMobile={this.state.modalOpen} onClose={handleClose}>
 *     <FormX />
 *   </ModalInMobile>
 * </Parent>
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Modal } from '../../components';
import css from './ModalInMobile.css';

class ModalInMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.changeOpenStatus = this.changeOpenStatus.bind(this);
  }

  componentDidMount() {
    const { isModalOpenOnMobile, showAsModalMaxWidth } = this.props;

    // After Mounting, component can adapt to responsive screen size
    const shouldShowAsModal = window.matchMedia
      ? window.matchMedia(`(max-width: ${showAsModalMaxWidth}px)`).matches
      : false;
    if (shouldShowAsModal && isModalOpenOnMobile) {
      this.changeOpenStatus(isModalOpenOnMobile);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isModalOpenOnMobile, showAsModalMaxWidth } = nextProps;

    const isChanging = isModalOpenOnMobile !== this.state.isOpen;
    const shouldShowAsModal = window.matchMedia
      ? window.matchMedia(`(max-width: ${showAsModalMaxWidth}px)`).matches
      : false;
    const shouldBeClosedAsModal = !shouldShowAsModal && !isModalOpenOnMobile;

    // Handle change if status is changing on mobile layout or it is closing (on desktop layout)
    if (isChanging && (shouldShowAsModal || shouldBeClosedAsModal)) {
      this.changeOpenStatus(isModalOpenOnMobile);
    }
  }

  changeOpenStatus(isOpen) {
    this.setState({ isOpen });
  }

  handleClose(event) {
    const { onClose } = this.props;
    this.changeOpenStatus(false);
    if (onClose) {
      onClose(event);
    }
  }

  render() {
    const {
      children,
      className,
      id,
      showAsModalMaxWidth,
      onManageDisableScrolling,
    } = this.props;

    const isMobileLayout = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(`(max-width: ${showAsModalMaxWidth}px)`).matches
      : false;
    const isOpenInMobile = this.state.isOpen;
    const isClosedInMobile = isMobileLayout && !isOpenInMobile;

    // We have 3 view states:
    // - default desktop layout (just an extra wrapper)
    // - mobile layout: content visible inside modal popup
    // - mobile layout: content hidden
    const closedClassName = isClosedInMobile ? css.modalHidden : null;
    const classes = classNames({ [css.modalInMobile]: isOpenInMobile }, className);

    return (
      <Modal
        className={classes}
        id={id}
        isOpen={isOpenInMobile}
        isClosedClassName={closedClassName}
        onClose={this.handleClose}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        {children}
      </Modal>
    );
  }
}

ModalInMobile.defaultProps = {
  children: null,
  className: '',
  onClose: null,
  showAsModalMaxWidth: 0,
};

const { bool, func, node, number, string } = PropTypes;

ModalInMobile.propTypes = {
  children: node,
  className: string,
  id: string.isRequired,
  isModalOpenOnMobile: bool.isRequired,
  onClose: func,
  showAsModalMaxWidth: number,
  // eslint-disable-next-line react/no-unused-prop-types
  onManageDisableScrolling: func.isRequired,
};

export default ModalInMobile;
