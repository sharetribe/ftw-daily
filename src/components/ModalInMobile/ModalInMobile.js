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
import { intlShape, injectIntl } from 'react-intl';
import { Button } from '../../components';
import css from './ModalInMobile.css';

export class ModalInMobileComponent extends Component {
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
    const { togglePageClassNames } = this.props;
    togglePageClassNames(css.modalInMobileOpen, isOpen);
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
      intl,
      onClose,
      showAsModalMaxWidth,
      title,
    } = this.props;

    const isMobileLayout = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(`(max-width: ${showAsModalMaxWidth}px)`).matches
      : false;
    const isOpenInMobile = this.state.isOpen;
    const isClosedInMobile = isMobileLayout && !isOpenInMobile;

    const closeModalMessage = intl.formatMessage({ id: 'ModalInMobile.closeModal' });
    const modalTitle = title ? <h2 className={css.title}>{title}</h2> : null;
    const closeBtn = onClose && isOpenInMobile
      ? <Button onClick={this.handleClose} className={css.close} title={closeModalMessage}>
          ✖
        </Button>
      : null;
    const header = isOpenInMobile && (closeBtn || modalTitle)
      ? <div className={css.header}>
          {closeBtn}
          {modalTitle}
        </div>
      : null;

    // We have 3 view states:
    // - default desktop layout (just an extra wrapper)
    // - mobile layout: content visible inside modal popup
    // - mobile layout: content hidden
    const classes = classNames(
      { [css.modal]: isOpenInMobile, [css.modalHidden]: isClosedInMobile },
      className
    );

    return (
      <div className={classes}>
        {header}
        {children}
      </div>
    );
  }
}

ModalInMobileComponent.defaultProps = {
  children: null,
  className: '',
  onClose: null,
  showAsModalMaxWidth: 0,
  title: null,
};

const { bool, func, node, number, string } = PropTypes;

ModalInMobileComponent.propTypes = {
  children: node,
  className: string,
  intl: intlShape.isRequired,
  isModalOpenOnMobile: bool.isRequired,
  onClose: func,
  showAsModalMaxWidth: number,
  title: string,
  // eslint-disable-next-line react/no-unused-prop-types
  togglePageClassNames: func.isRequired,
};

export default injectIntl(ModalInMobileComponent);
