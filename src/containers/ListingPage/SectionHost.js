import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NamedLink, UserCard, Modal } from '../../components';
import { EnquiryForm } from '../../forms';

import css from './ListingPage.css';

const SectionHost = props => {
  const {
    title,
    listing,
    isOwnListing,
    authorDisplayName,
    onContactUser,
    isEnquiryModalOpen,
    onCloseEnquiryModal,
    sendEnquiryError,
    sendEnquiryInProgress,
    onSubmitEnquiry,
    currentUser,
    onManageDisableScrolling,
  } = props;
  return (
    <div id="host" className={css.sectionHost}>
      <h2 className={css.yourHostHeading}>
        <FormattedMessage id="ListingPage.yourHostHeading" />
      </h2>
      {isOwnListing ? (
        <NamedLink className={css.editProfileLink} name="ProfileSettingsPage">
          <FormattedMessage id="ListingPage.editProfileLink" />
        </NamedLink>
      ) : null}
      <UserCard user={listing.author} currentUser={currentUser} onContactUser={onContactUser} />
      <Modal
        id="ListingPage.enquiry"
        contentClassName={css.enquiryModalContent}
        isOpen={isEnquiryModalOpen}
        onClose={onCloseEnquiryModal}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <EnquiryForm
          className={css.enquiryForm}
          submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
          listingTitle={title}
          authorDisplayName={authorDisplayName}
          sendEnquiryError={sendEnquiryError}
          onSubmit={onSubmitEnquiry}
          inProgress={sendEnquiryInProgress}
        />
      </Modal>
    </div>
  );
};

export default SectionHost;
