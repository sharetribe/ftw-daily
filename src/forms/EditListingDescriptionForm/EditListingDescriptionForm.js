import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';
import CustomBrancheSelectFieldMaybe from './CustomBrancheSelectFieldMaybe';
import CustomLandSelectFieldMaybe from './CustomCountryCodeSelectFieldMaybe';

import css from './EditListingDescriptionForm.module.css';

const TITLE_MAX_LENGTH = 110;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        categories,
        branches,
        laender,
        kontaktanreden,
        //firmenwortlaut,
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
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const firmenwortlautMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.firmenwortlaut' });
      const firmenwortlautPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.firmenwortlautPlaceholder',
      });
      const firmenwortlautRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const firmenwortlautmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const plzMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.plz' });
      const plzPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.plzPlaceholder',
      });
      const plzRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.plzRequired',
      });
      const plzmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const stadtMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.stadt' });
      const stadtPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.stadtPlaceholder',
      });
      const stadtRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.stadtRequired',
      });
      const stadtmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const strasseMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.strasse' });
      const strassePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.strassePlaceholder',
      });
      const strasseRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.strasseRequired',
      });
      const strassemaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const landMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.land' });
      const landPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.landPlaceholder',
      });
      const landRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.stadtRequired',
      });
      const landmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const laendervorwahlMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.laendervorwahl' });
      const laendervorwahlPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.laendervorwahlPlaceholder',
      });
      const laendervorwahlRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.laendervorwahlRequired',
      });
      const laendervorwahlmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const vorwahlMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.vorwahl' });
      const vorwahlPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.vorwahlPlaceholder',
      });
      const vorwahlRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.vorwahlRequired',
      });
      const vorwahlmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const telefonnummerMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.telefonnummer' });
      const telefonnummerPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.telefonnummerPlaceholder',
      });
      const telefonnummerRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.telefonnummerRequired',
      });
      const telefonnummermaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const emailMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.email' });
      const emailPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.emailRequired',
      });
      const emailmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const firmenbuchnummerMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.firmenbuchnummer' });
      const firmenbuchnummerPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.firmenbuchnummerPlaceholder',
      });
      const firmenbuchnummerRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.firmenbuchnummerRequired',
      });
      const firmenbuchnummermaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const uidnummerMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.uidnummer' });
      const uidnummerPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.uidnummerPlaceholder',
      });
      const uidnummerRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.uidnummerRequired',
      });
      const uidnummermaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const websiteurlMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.websiteurl' });
      const websiteurlPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.websiteurlPlaceholder',
      });
      const websiteurlRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.websiteurlRequired',
      });
      const websiteurlmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      // Ansprechpartner Persönliche Daten 


      const kontaktanredeMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.kontaktanrede' });
      const kontaktanredePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktanredePlaceholder',
      });
      const kontaktanredeRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktanredeRequired',
      });
      const kontaktanredemaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const kontaktvornameMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.kontaktvorname' });
      const kontaktvornamePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktvornamePlaceholder',
      });
      const kontaktvornameRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktvornameRequired',
      });
      const kontaktvornamemaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const kontaktnachnameMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.kontaktnachname' });
      const kontaktnachnamePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktnachnamePlaceholder',
      });
      const kontaktnachnameRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktnachnameRequired',
      });
      const kontaktnachnamemaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const kontaktfunktionMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.kontaktfunktion' });
      const kontaktfunktionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktfunktionPlaceholder',
      });
      const kontaktfunktionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktfunktionRequired',
      });
      const kontaktfunktionmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const kontakttelefonMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.kontakttelefon' });
      const kontakttelefonPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontakttelefonPlaceholder',
      });
      const kontakttelefonRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontakttelefonRequired',
      });
      const kontakttelefonmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const kontaktemailMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.kontaktemail' });
      const kontaktemailPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktemailPlaceholder',
      });
      const kontaktemailRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.kontaktemailRequired',
      });
      const kontaktemailmaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const nachrichtMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.nachricht',
      });
      const nachrichtPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.nachrichtPlaceholder',
      });
      const nachrichtRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.nachrichtRequired',
      });



      // Tätigkeitsberiche angeben 

      const brancheMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.branche' });
      const branchePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.branchePlaceholder',
      });
      const brancheRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.brancheRequired',
      });
      const branchemaxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          <h3 className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.einleitung" />
          </h3>

          <h4 className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.einleitungtext" />
          </h4>

          <h5 className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.einleitungzusatz" />
          </h5>

          <p></p>

          <h3 className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.firmenadressdaten" />
          </h3>
          <p></p>
      

          <FieldTextInput
            id="title"
            name="title"
            className={css.description}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldTextInput
            id="firmenwortlaut"
            name="firmenwortlaut"
            className={css.description}
            type="text"
            label={firmenwortlautMessage}
            placeholder={firmenwortlautPlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(firmenwortlautRequiredMessage), maxLength60Message)}
            
          />
          
          <div className={css.nameContainer}>
          
            <FieldTextInput
              id="strasse"
              name="strasse"
              className={css.lastName}
              type="text"
              label={strasseMessage}
              placeholder={strassePlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(strasseRequiredMessage), maxLength60Message)}
              
            />

            <FieldTextInput
              id="plz"
              name="plz"
              className={css.firstName}
              type="text"
              label={plzMessage}
              placeholder={plzPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(plzRequiredMessage), maxLength60Message)}
              
            />

            

          </div>
          

          <div className={css.nameContainer}>

            <FieldTextInput
              id="stadt"
              name="stadt"
              className={css.lastName}
              type="text"
              label={stadtMessage}
              placeholder={stadtPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(stadtRequiredMessage), maxLength60Message)}
              
            />

            <CustomLandSelectFieldMaybe
              id="land"
              name="land"
              label={landMessage}
              placeholder={landPlaceholderMessage}
              laender={laender}
              intl={intl}
              //maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(landRequiredMessage), maxLength60Message)}
              
            />          

          </div>

          <div className={css.nameContainer}>
          

            <FieldTextInput
              id="laendervorwahl"
              name="laendervorwahl"
              className={css.teilklein}
              type="text"
              label={laendervorwahlMessage}
              placeholder={laendervorwahlPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(laendervorwahlRequiredMessage), maxLength60Message)}
              
            />


            <FieldTextInput
              id="vorwahl"
              name="vorwahl"
              className={css.teilmittel}
              type="text"
              label={vorwahlMessage}
              placeholder={vorwahlPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(vorwahlRequiredMessage), maxLength60Message)}
              
            />

            <FieldTextInput
              id="telefonnummer"
              name="telefonnummer"
              className={css.teilgross}
              type="text"
              label={telefonnummerMessage}
              placeholder={telefonnummerPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(telefonnummerRequiredMessage), maxLength60Message)}
              
            />

          </div>

          

            <FieldTextInput
              id="email"
              name="email"
              className={css.description}
              type="text"
              label={emailMessage}
              placeholder={emailPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(emailRequiredMessage), maxLength60Message)}
              
            />

          <div className={css.nameContainer}>
            <FieldTextInput
              id="firmenbuchnummer"
              name="firmenbuchnummer"
              className={css.halb}
              type="text"
              label={firmenbuchnummerMessage}
              placeholder={firmenbuchnummerPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              
              
            />

            <FieldTextInput
              id="uidnummer"
              name="uidnummer"
              className={css.halb}
              type="text"
              label={uidnummerMessage}
              placeholder={uidnummerPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              
            />
          </div>
          

          <FieldTextInput
            id="websiteurl"
            name="websiteurl"
            className={css.description}
            type="text"
            label={websiteurlMessage}
            placeholder={websiteurlPlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            
          />

          <p></p>

          <h3 className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.taetigkeit" />
          </h3>
          <p></p>

          <CustomBrancheSelectFieldMaybe

            id="branche"
            name="branche"
            className={css.branche}
            label={brancheMessage}
            branches={branches}
            intl={intl}
            //className={css.description}
            //type="text"
            //label={brancheMessage}
            //placeholder={branchePlaceholderMessage}
            //maxLength={TITLE_MAX_LENGTH}
            //validate={composeValidators(required(brancheRequiredMessage), maxLength60Message)}
            
          />

          <p></p>
        

          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <CustomCategorySelectFieldMaybe
            id="category"
            name="category"
            categories={categories}
            intl={intl}
          />

          <p></p>

          <h3 className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.kontaktperson" />
          </h3>
          <p></p>


          <div className={css.nameContainer}>

    
          

            <FieldTextInput
              id="kontaktvorname"
              name="kontaktvorname"
              className={css.halb}
              type="text"
              label={kontaktvornameMessage}
              placeholder={kontaktvornamePlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(kontaktvornameRequiredMessage), maxLength60Message)}
              
            />

            <FieldTextInput
              id="kontaktnachname"
              name="kontaktnachname"
              className={css.halb}
              type="text"
              label={kontaktnachnameMessage}
              placeholder={kontaktnachnamePlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(kontaktnachnameRequiredMessage), maxLength60Message)}
              
            />
          
          </div>

          <FieldTextInput
            id="kontaktfunktion"
            name="kontaktfunktion"
            className={css.description}
            type="text"
            label={kontaktfunktionMessage}
            placeholder={kontaktfunktionPlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(kontaktfunktionRequiredMessage), maxLength60Message)}
            
          />

          <div className={css.nameContainer}>   

            <FieldTextInput
              id="kontakttelefon"
              name="kontakttelefon"
              className={css.firstName}
              type="text"
              label={kontakttelefonMessage}
              placeholder={kontakttelefonPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(kontakttelefonRequiredMessage), maxLength60Message)}
              
            />

            <FieldTextInput
              id="kontaktemail"
              name="kontaktemail"
              className={css.lastName}
              type="text"
              label={kontaktemailMessage}
              placeholder={kontaktemailPlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(kontaktemailRequiredMessage), maxLength60Message)}
              
            />

          </div>


          <FieldTextInput
            id="nachricht"
            name="nachricht"
            className={css.description}
            type="textarea"
            label={nachrichtMessage}
            placeholder={nachrichtPlaceholderMessage}
            
          />


          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>


          <p></p>

          <h5 className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.footerkontaktperson" />
          </h5>
          <p></p>


        </Form>
      );
    }}
  />
);

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),

  branches: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),

  laender: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  


};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
