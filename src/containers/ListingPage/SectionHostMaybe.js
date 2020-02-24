import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { UserCard, Modal } from '../../components';
import { EnquiryForm } from '../../forms';

import css from './ListingPage.css';

const SectionHostMaybe = props => {
  const {
    title,
    listing,
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

  if (!listing.author) {
    return null;
  }

  return (
    <div id="host" className={css.sectionHost}>
      <h2 className={css.yourHostHeading}>
        <FormattedMessage id="ListingPage.yourHostHeading" />
      </h2>
      <UserCard user={listing.author} currentUser={currentUser} onContactUser={onContactUser} />
      <Modal
        id="ListingPage.enquiry"
        contentClassName={css.enquiryModalContent}
        isOpen={isEnquiryModalOpen}
        onClose={onCloseEnquiryModal}
        usePortal
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

export default SectionHostMaybe;
