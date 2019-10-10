// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { FormattedMessage } from '../../util/reactIntl';
//
// import { LISTING_STATE_DRAFT } from '../../util/types';
// import { ensureListing } from '../../util/data';
// import { EditListingEventsForm } from '../../forms';
// import { ListingLink } from '../../components';
//
// import css from './EditListingEventsPanel.css';
//
// const EVENTS_NAME = 'events';
//
// const EditListingEventsPanel = props => {
//   const {
//     rootClassName,
//     className,
//     listing,
//     onSubmit,
//     onChange,
//     submitButtonText,
//     panelUpdated,
//     updateInProgress,
//     errors,
//   } = props;
//
//   const classes = classNames(rootClassName || css.root, className);
//   const currentListing = ensureListing(listing);
//   const { publicData } = currentListing.attributes;
//
//   const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
//   const panelTitle = isPublished ? (
//     <FormattedMessage
//       id="EditListingEventsPanel.title"
//       values={{ listingTitle: <ListingLink listing={listing} /> }}
//     />
//   ) : (
//     <FormattedMessage id="EditListingEventsPanel.createListingTitle" />
//   );
//
//   const types = publicData && publicData.types;
//   const initialValues = { types };
//
//   return (
//     <div className={classes}>
//       <h1 className={css.title}>{panelTitle}</h1>
//       <EditListingEventsForm
//         className={css.form}
//         name={EVENTS_NAME}
//         initialValues={initialValues}
//         onSubmit={values => {
//           const { types = [] } = values;
//
//           const updatedValues = {
//             publicData: { types },
//           };
//           onSubmit(updatedValues);
//         }}
//         onChange={onChange}
//         saveActionMsg={submitButtonText}
//         updated={panelUpdated}
//         updateInProgress={updateInProgress}
//         fetchErrors={errors}
//       />
//     </div>
//   );
// };
//
// EditListingEventsPanel.defaultProps = {
//   rootClassName: null,
//   className: null,
//   listing: null,
// };
//
// const { bool, func, object, string } = PropTypes;
//
// EditListingEventsPanel.propTypes = {
//   rootClassName: string,
//   className: string,
//
//   // We cannot use propTypes.listing since the listing might be a draft.
//   listing: object,
//
//   onSubmit: func.isRequired,
//   onChange: func.isRequired,
//   submitButtonText: string.isRequired,
//   panelUpdated: bool.isRequired,
//   updateInProgress: bool.isRequired,
//   errors: object.isRequired,
// };
//
// export default EditListingEventsPanel;
