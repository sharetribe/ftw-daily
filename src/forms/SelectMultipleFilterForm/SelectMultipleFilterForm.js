import React from 'react';
import { arrayOf, bool, func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import { injectIntl, intlShape } from 'react-intl';
import arrayMutators from 'final-form-arrays';

import { FieldCheckboxGroup, Form } from '../../components';
import css from './SelectMultipleFilterForm.css';

const SelectMultipleFilterFormComponent = props => {
  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          form,
          handleSubmit,
          id,
          name,
          onClear,
          onCancel,
          options,
          isOpen,
          contentRef,
          style,
          intl,
        } = formRenderProps;
        const classes = classNames(css.root, { [css.isOpen]: isOpen });

        const handleCancel = () => {
          // reset the final form to initialValues
          form.reset();
          onCancel();
        };

        const clear = intl.formatMessage({ id: 'SelectMultipleFilterForm.clear' });
        const cancel = intl.formatMessage({ id: 'SelectMultipleFilterForm.cancel' });
        const submit = intl.formatMessage({ id: 'SelectMultipleFilterForm.submit' });
        return (
          <Form
            className={classes}
            onSubmit={handleSubmit}
            tabIndex="0"
            contentRef={contentRef}
            style={style}
          >
            <FieldCheckboxGroup
              className={css.fieldGroup}
              name={name}
              id={`${id}-checkbox-group`}
              options={options}
            />
            <div className={css.buttonsWrapper}>
              <button className={css.clearButton} type="button" onClick={onClear}>
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
      }}
    />
  );
};

SelectMultipleFilterFormComponent.defaultProps = {
  contentRef: null,
  style: null,
};

SelectMultipleFilterFormComponent.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
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

const SelectMultipleFilterForm = injectIntl(SelectMultipleFilterFormComponent);

export default SelectMultipleFilterForm;
