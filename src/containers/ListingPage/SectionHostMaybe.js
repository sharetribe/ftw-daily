import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { UserCard, Modal } from '../../components';
import { EnquiryForm } from '../../forms';

import css from './ListingPage.module.css';

const SectionHostMaybe = props => {
  const {
    title,
    listing,
    id,
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

  var data = title
  var patchId = id

  var url = "https://share.hsforms.com/1Zq6xDjz7RCG8gjdC1vBbgA57edm?patch_name=" + encodeURIComponent(JSON.stringify(data)) + "&patch_url=https://www.hotpatch.com/l/" + encodeURIComponent(patchId);

  return (
    <div id="host" className={css.sectionHost}>
      <h2 className={css.yourHostHeading}>
        <FormattedMessage id="ListingPage.yourHostHeading" />
      </h2>
      <UserCard 
        user={listing.author} 
        currentUser={currentUser} 
        onContactUser={onContactUser} 
        url={url}
        />
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
