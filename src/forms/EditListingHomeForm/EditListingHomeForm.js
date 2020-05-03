import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required } from '../../util/validators';
import { Button, FieldCheckboxGroup, Form, CategoryField } from '../../components';

import css from './EditListingHomeForm.css';
import css_des from '../EditListingDescriptionForm/EditListingDescriptionForm.css';

export class EditListingHomeFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            handleSubmit,
            intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            locations,
            equipments,
            name_equipments,
            name_locations,
            user_type,
            info,
          } = fieldRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingHomeForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = updated && pristine;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;

          var number = [];
          for (var i = 1; i < 5; i++) {
            number.push({ key: i, label: i });
          }

          const categoryBedroomLabel = intl.formatMessage({
            id: 'EditListingHomeForm.category.bedroom.label',
            // values: {animal},
          });
          const categoryBedroomPlaceholder = intl.formatMessage({
            id: 'EditListingHomeForm.category.bedroom.placeholder',
            // values: {animal},
          });
          const categoryBedroomRequired = required(
            intl.formatMessage({
              id: 'EditListingHomeForm.category.bedroom.required',
              // values: {animal},
            })
          );

          const categoryBathroomLabel = intl.formatMessage({
            id: 'EditListingHomeForm.category.bathroom.label',
            // values: {animal},
          });
          const categoryBathroomPlaceholder = intl.formatMessage({
            id: 'EditListingHomeForm.category.bathroom.placeholder',
            // values: {animal},
          });
          const categoryBathroomRequired = required(
            intl.formatMessage({
              id: 'EditListingHomeForm.category.bathroom.required',
              // values: {animal},
            })
          );

          const user_name = user_type === 0 ? 'owner' : user_type === 1 ? 'sitter' : 'service';
          const homeTitle = intl.formatMessage({
            id: 'EditListingHomeForm.homeTitle.' + user_name,
          });

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <h3>{homeTitle}</h3>

              {user_type === 0 ? (
                <div>
                  <FieldCheckboxGroup
                    className={css_des.features}
                    id={name_equipments}
                    name={name_equipments}
                    options={equipments}
                  />
                  <br />
                  <FieldCheckboxGroup
                    className={css_des.features}
                    id={name_locations}
                    name={name_locations}
                    options={locations}
                  />
                  <br />
                  <CategoryField
                    id="bedroom"
                    name="bedroom"
                    className={css.category}
                    categories={number}
                    intl={intl}
                    categoryLabel={categoryBedroomLabel}
                    categoryPlaceholder={categoryBedroomPlaceholder}
                    categoryRequired={categoryBedroomRequired}
                  />

                  <CategoryField
                    id="bathroom"
                    name="bathroom"
                    className={css.category}
                    categories={number}
                    intl={intl}
                    categoryLabel={categoryBathroomLabel}
                    categoryPlaceholder={categoryBathroomPlaceholder}
                    categoryRequired={categoryBathroomRequired}
                  />
                </div>
              ) : (
                <FieldCheckboxGroup
                  className={css_des.features}
                  id="info"
                  name="info"
                  options={info}
                />
              )}

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingHomeFormComponent.defaultProps = {
  updateError: null,
};

EditListingHomeFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

export default compose(injectIntl)(EditListingHomeFormComponent);
