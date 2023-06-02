import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingExtrasForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingExtrasPanel.module.css';

const FEATURES_NAME = 'extras';

const EditListingExtrasPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingExtrasPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingExtrasPanel.createListingTitle" />
  );

  
  const extras = publicData && publicData.extras;
  /*const reparatur = publicData && publicData.reparatur;
  const fehleranalyse = publicData && publicData.fehleranalyse;
  const sonstiges = publicData && publicData.sonstiges;
  const reifen = publicData && publicData.reifen;
  const reifenwechsel = publicData && publicData.reifenwechsel;
  const reifenwuchten = publicData && publicData.reifenwuchten;
  const reinfeneinlagerung = publicData && publicData.reinfeneinlagerung;
  const reifenwaesche = publicData && publicData.reifenwaesche;
  const reifenmontage = publicData && publicData.reifenmontage;
  const reifenkauf = publicData && publicData.reifenkauf;
  const pickerl = publicData && publicData.pickerl;
  const klima = publicData && publicData.klima;
  const inspektion = publicData && publicData.inspektion;
  const oelwechsel = publicData && publicData.oelwechsel;
  const urlaubscheck = publicData && publicData.urlaubscheck;
  const wintercheck = publicData && publicData.wintercheck;
  const fruehjahrscheck = publicData && publicData.fruehjahrscheck;
  const sicherheitscheck = publicData && publicData.sicherheitscheck;
  const mobilitaetscheck = publicData && publicData.mobilitaetscheck;
  const lichttest = publicData && publicData.lichttest;
  const fehlerdiagnose = publicData && publicData.fehlerdiagnose;
  const elektrik = publicData && publicData.elektrik;
  const lichtmaschine = publicData && publicData.lichtmaschine;
  const achsvermessung = publicData && publicData.achsvermessung;
  const zahnriemen = publicData && publicData.zahnriemen;
  const bremsenservice = publicData && publicData.bremsenservice;
  const bremsbelaege = publicData && publicData.bremsbelaege;
  const bremsfluessigkeitswechsel = publicData && publicData.bremsfluessigkeitswechsel;
  const abgasuntersuchung = publicData && publicData.abgasuntersuchung;
  const autobatterie = publicData && publicData.autobatterie;
  const auspuff = publicData && publicData.auspuff;
  const anlasser = publicData && publicData.anlasser;
  const fahrwerk = publicData && publicData.fahrwerk;
  const getriebe = publicData && publicData.getriebe;
  const glasreparatur = publicData && publicData.glasreparatur;
  const felgenaufbereitung = publicData && publicData.felgenaufbereitung;
  const dachbox = publicData && publicData.dachbox;
  const reinigung = publicData && publicData.reinigung;
  const reinigunginterieur = publicData && publicData.reinigunginterieur;
  const reinigungexterieur = publicData && publicData.reinigungexterieur;
  const kratzerentfernen = publicData && publicData.kratzerentfernen;
  const kratzerlackieren = publicData && publicData.kratzerlackieren;
  const pflege = publicData && publicData.pflege;
  const lackierarbeiten = publicData && publicData.lackierarbeiten;
  const spenglerarbeiten = publicData && publicData.spenglerarbeiten;
  const unfallschaden = publicData && publicData.unfallschaden;
  const abschlepphilfe = publicData && publicData.abschlepphilfe;
  const radio = publicData && publicData.radio;
  const altfahrzeugankauf = publicData && publicData.altfahrzeugankauf;
  const tuningauspuff = publicData && publicData.tuningauspuff;
  const tuningbremsen = publicData && publicData.tuningbremsen;
  const tuningfahrwerk = publicData && publicData.tuningfahrwerk;
  const tuningfelgen = publicData && publicData.tuningfelgen;
  const tuninginterieurexterieur = publicData && publicData.tuninginterieurexterieur;
  const tuningzubehoer = publicData && publicData.tuningzubehoer;
  const tuningchiptuning = publicData && publicData.tuningchiptuning;
  const expresstermin = publicData && publicData.expresstermin;
  const holservice = publicData && publicData.holservice;
  const nachtannahme = publicData && publicData.nachtannahme;
  const ersatzfahrzeug = publicData && publicData.ersatzfahrzeug;
  const waschstraße = publicData && publicData.waschstraße;
  const bankomat = publicData && publicData.bankomat;
  const zubehoer = publicData && publicData.zubehoer;
  const versicherungsberatung = publicData && publicData.versicherungsberatung;
  const finanzierungsberatung = publicData && publicData.finanzierungsberatung;
  const oeffentlicherverkehr = publicData && publicData.oeffentlicherverkehr;
  const dellentechniker = publicData && publicData.dellentechniker;
  const karosseriefachbetrieb = publicData && publicData.karosseriefachbetrieb;
  const meisterbetrieb = publicData && publicData.meisterbetrieb;
  const pruefstelle = publicData && publicData.pruefstelle;
  const allemarken = publicData && publicData.allemarken;
  const marken = publicData && publicData.marken;  */


  const initialValues = { extras };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingExtrasForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { extras = [] } = values;

          const updatedValues = {
            publicData: { extras },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingExtrasPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingExtrasPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingExtrasPanel;
