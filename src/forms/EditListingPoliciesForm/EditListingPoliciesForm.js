import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldTextInput, FieldCheckbox } from '../../components';

import css from './EditListingPoliciesForm.module.css';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';

export const EditListingPoliciesFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
        filterConfig,
      } = formRenderProps;

      console.log('values', values)
      const rulesLabelMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesLabel',
      });
      const rulesPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesPlaceholder',
      });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress ;


      const housingConditions = findOptionsForSelectFilter('housingConditions', filterConfig);

      const petInHome = findOptionsForSelectFilter('petInHome', filterConfig);

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

         
<div>
  <p>Housing Conditions</p>

  {
            housingConditions.map((st)=>{
              return(
               <FieldCheckbox className={css.features} id={st.key} name={"housingConditions"} value={st.key} label={st.label} />
              )
            })
          }
          
</div>


<div>
  <p>Pets in the home</p>

  {
            petInHome.map((st)=>{
              return(
               <FieldCheckbox className={css.features} id={st.key} name={"petInHome"} value={st.key} label={st.label} />
              )
            })
          }
          
</div>
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

EditListingPoliciesFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
  filterConfig: config.custom.filters,
  
};
EditListingPoliciesFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

export default compose(injectIntl)(EditListingPoliciesFormComponent);
