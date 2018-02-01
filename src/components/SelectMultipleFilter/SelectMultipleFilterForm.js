import React from 'react';
import { arrayOf, bool, func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';

import { FieldGroupCheckbox, Form } from '../../components';
import css from './SelectMultipleFilterForm.css';

const SelectMultipleFilterFormComponent = props => {
  const {
    form,
    destroy,
    reset,
    handleSubmit,
    onClear,
    onCancel,
    options,
    isOpen,
    contentRef,
    style,
    intl,
  } = props;
  const classes = classNames(css.root, { [css.isOpen]: isOpen });

  const handleClear = () => {
    // clear the redux form state
    destroy();
    onClear();
  };

  const handleCancel = () => {
    // reset the redux form to initialValues
    reset();
    onCancel();
  };

  const clear = intl.formatMessage({ id: 'SelectMultipleFilterMobile.clear' });
  const cancel = intl.formatMessage({ id: 'SelectMultipleFilterMobile.cancel' });
  const submit = intl.formatMessage({ id: 'SelectMultipleFilterMobile.submit' });

  return (
    <Form
      className={classes}
      onSubmit={handleSubmit}
      tabIndex="0"
      contentRef={contentRef}
      style={style}
    >
      <FieldGroupCheckbox
        className={css.fieldGroup}
        id={`${form}.amenitiesFilter`}
        options={options}
      />
      <div className={css.buttonsWrapper}>
        <button className={css.clearButton} type="button" onClick={handleClear}>
          {clear}
        </button>
        <button className={css.cancelButton} type="button" onClick={handleCancel}>
          {cancel}
        </button>
        <button className={css.submitButton} type="submit">
          {submit}
        </button>
      </div>
    </Form>
  );
};

SelectMultipleFilterFormComponent.defaultProps = {
  contentRef: null,
  style: null,
};

SelectMultipleFilterFormComponent.propTypes = {
  ...formPropTypes,
  onClear: func.isRequired,
  onCancel: func.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  isOpen: bool.isRequired,
  contentRef: func,
  style: object,

  // form injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'SelectMultipleFilterForm';

export default compose(reduxForm({ form: defaultFormName }), injectIntl)(
  SelectMultipleFilterFormComponent
);
