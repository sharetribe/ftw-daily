import React from 'react';
import { bool, func, number, object, string } from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Field, Form as FinalForm, FormSpy } from 'react-final-form';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';

import { Form, RangeSlider } from '../../components';
import css from './RangeFilterForm.css';

const DEBOUNCE_WAIT_TIME = 400;

// Helper function to parse value for min handle
// Value needs to be between slider's minimum value and current maximum value
const parseMin = (min, currentMax) => value => {
  const parsedValue = Number.parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return '';
  }
  return parsedValue < min ? min : parsedValue > currentMax ? currentMax : parsedValue;
};

// Helper function to parse value for max handle
// Value needs to be between slider's max value and current minimum value
const parseMax = (max, currentMin) => value => {
  const parsedValue = Number.parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return '';
  }
  return parsedValue < currentMin ? currentMin : parsedValue > max ? max : parsedValue;
};

// RangeFilterForm component
const RangeFilterFormComponent = props => {
  const {
    liveEdit,
    onChange,
    onSubmit,
    onCancel,
    onClear,
    rangeFilterFormLabelId,
    ...rest
  } = props;

  if (liveEdit && !onChange) {
    throw new Error('RangeFilterForm: if liveEdit is true you need to provide onChange function');
  }

  if (!liveEdit && !(onCancel && onClear && onSubmit)) {
    throw new Error(
      'RangeFilterForm: if liveEdit is false you need to provide onCancel, onClear, and onSubmit functions'
    );
  }

  const handleChange = debounce(
    formState => {
      if (formState.dirty) {
        const { minValue, maxValue, ...restValues } = formState.values;
        onChange({
          minValue: minValue === '' ? rest.min : minValue,
          maxValue: maxValue === '' ? rest.max : maxValue,
          ...restValues,
        });
      }
    },
    DEBOUNCE_WAIT_TIME,
    { leading: false, trailing: true }
  );

  const handleSubmit = values => {
    const { minValue, maxValue, ...restValues } = values;
    return onSubmit({
      minValue: minValue === '' ? rest.min : minValue,
      maxValue: maxValue === '' ? rest.max : maxValue,
      ...restValues,
    });
  };

  const formCallbacks = liveEdit
    ? { onSubmit: () => null }
    : { onSubmit: handleSubmit, onCancel, onClear };
  return (
    <FinalForm
      {...rest}
      {...formCallbacks}
      render={formRenderProps => {
        const {
          form,
          handleSubmit,
          id,
          showAsPopup,
          onClear,
          onCancel,
          isOpen,
          contentRef,
          style,
          intl,
          values,
          min,
          max,
          step,
        } = formRenderProps;
        const { minValue: minValueRaw, maxValue: maxValueRaw } = values;
        const minValue = typeof minValueRaw !== 'string' ? minValueRaw : min;
        const maxValue = typeof maxValueRaw !== 'string' ? maxValueRaw : max;

        const handleCancel = () => {
          // reset the final form to initialValues
          form.reset();
          onCancel();
        };

        const clear = intl.formatMessage({ id: 'FilterForm.clear' });
        const cancel = intl.formatMessage({ id: 'FilterForm.cancel' });
        const submit = intl.formatMessage({ id: 'FilterForm.submit' });

        const classes = classNames(css.root, {
          [css.popup]: showAsPopup,
          [css.isOpenAsPopup]: showAsPopup && isOpen,
          [css.plain]: !showAsPopup,
          [css.isOpen]: !showAsPopup && isOpen,
        });

        return (
          <Form
            className={classes}
            onSubmit={handleSubmit}
            tabIndex="0"
            contentRef={contentRef}
            style={{ minWidth: '300px', ...style }}
          >
            <div className={css.contentWrapper}>
              <span className={css.label}>
                <FormattedMessage id={rangeFilterFormLabelId} />
              </span>
              <div className={css.inputsWrapper}>
                <Field
                  className={css.minValue}
                  id={`${id}.minValue`}
                  name="minValue"
                  component="input"
                  type="number"
                  placeholder={min}
                  min={min}
                  max={max}
                  step={step}
                  parse={parseMin(min, maxValue)}
                />
                <span className={css.rangeSeparator}>-</span>
                <Field
                  className={css.maxValue}
                  id={`${id}.maxValue`}
                  name="maxValue"
                  component="input"
                  type="number"
                  placeholder={max}
                  min={min}
                  max={max}
                  step={step}
                  parse={parseMax(max, minValue)}
                />
              </div>
            </div>

            <div className={css.sliderWrapper}>
              <RangeSlider
                min={min}
                max={max}
                step={step}
                handles={[minValue, maxValue]}
                onChange={handles => {
                  form.change('minValue', handles[0]);
                  form.change('maxValue', handles[1]);
                }}
              />
            </div>

            {liveEdit ? (
              <FormSpy onChange={handleChange} subscription={{ values: true, dirty: true }} />
            ) : (
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
            )}
          </Form>
        );
      }}
    />
  );
};

RangeFilterFormComponent.defaultProps = {
  liveEdit: false,
  showAsPopup: false,
  isOpen: false,
  contentRef: null,
  style: null,
  min: 0,
  step: 1,
  onCancel: null,
  onChange: null,
  onClear: null,
  onSubmit: null,
};

RangeFilterFormComponent.propTypes = {
  id: string.isRequired,
  liveEdit: bool,
  showAsPopup: bool,
  onCancel: func,
  onChange: func,
  onClear: func,
  onSubmit: func,
  isOpen: bool,
  contentRef: func,
  style: object,
  min: number.isRequired,
  max: number.isRequired,
  step: number,
  rangeFilterFormLabelId: string.isRequired,

  // form injectIntl
  intl: intlShape.isRequired,
};

const RangeFilterForm = injectIntl(RangeFilterFormComponent);

export default RangeFilterForm;
