import React from 'react';
import { bool, func, number, object, string } from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Field, Form as FinalForm, FormSpy } from 'react-final-form';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { RangeSlider } from '../../components';
import css from './TimePickerForm.css';

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

// TimePickerForm component
const TimePickerFormComponent = props => {
  const { liveEdit, onChange, onSubmit, onCancel, onClear, ...rest } = props;

  const handleChange = debounce(
    formState => {
      if (formState.dirty) {
        const { minHour, maxHour, ...restValues } = formState.values;
        onChange({
          minHour: minHour === '' ? rest.min : minHour,
          maxHour: maxHour === '' ? rest.max : maxHour,
          ...restValues,
        });
      }
    },
    DEBOUNCE_WAIT_TIME,
    { leading: false, trailing: true }
  );

  const handleSubmit = values => {
    const { minHour, maxHour, ...restValues } = values;
    return onSubmit({
      minHour: minHour === '' ? rest.min : minHour,
      maxHour: maxHour === '' ? rest.max : maxHour,
      ...restValues,
    });
  };

  const formCallbacks = liveEdit
    ? { onSubmit: () => null }
    : { onSubmit: handleSubmit, onCancel, onClear };
  console.log('props',props);
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
        const { minHour: minTimeRaw, maxHour: maxTimeRaw } = values;
        const minHour = typeof minTimeRaw !== 'string' ? minTimeRaw : min;
        const maxHour = typeof maxTimeRaw !== 'string' ? maxTimeRaw : max;

        const handleCancel = () => {
          // reset the final form to initialValues
          form.reset();
          onCancel();
        };

        const clear = intl.formatMessage({ id: 'TimePickerForm.clear' });
        const cancel = intl.formatMessage({ id: 'TimePickerForm.cancel' });
        const submit = intl.formatMessage({ id: 'TimePickerForm.submit' });

        const classes = classNames(css.root, {
          [css.popup]: showAsPopup,
          [css.isOpenAsPopup]: showAsPopup && isOpen,
          [css.plain]: !showAsPopup,
          [css.isOpen]: !showAsPopup && isOpen,
        });

        return (
          <div
            className={classes}
            style={{ minWidth: '300px', ...style }}
          >
            <div className={css.contentWrapper}>
              <span className={css.label}>
                <FormattedMessage id="TimePickerForm.label" />
              </span>
              <div className={css.inputsWrapper}>
                <Field
                  className={css.minHour}
                  id={`${id}.minHour`}
                  name="minHour"
                  component="input"
                  type="number"
                  placeholder={min}
                  min={min}
                  max={max}
                  step={step}
                  parse={parseMin(min, maxHour)}
                />
                <span className={css.priceSeparator}>-</span>
                <Field
                  className={css.maxHour}
                  id={`${id}.maxHour`}
                  name="maxHour"
                  component="input"
                  type="number"
                  placeholder={max}
                  min={min}
                  max={max}
                  step={step}
                  parse={parseMax(max, minHour)}
                />
              </div>
            </div>

            <div className={css.sliderWrapper}>
              <RangeSlider
                min={min}
                max={max}
                step={step}
                handles={[minHour, maxHour]}
                onChange={handles => {
                  form.change('minHour', handles[0]);
                  form.change('maxHour', handles[1]);
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
          </div>
        );
      }}
    />
  );
};

TimePickerFormComponent.defaultProps = {
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

TimePickerFormComponent.propTypes = {
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

  // form injectIntl
  intl: intlShape.isRequired,
};

const TimePickerForm = injectIntl(TimePickerFormComponent);

export default TimePickerForm;
