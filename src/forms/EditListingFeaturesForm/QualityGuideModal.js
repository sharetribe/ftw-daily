import React from 'react';
import { bool, func } from 'prop-types';
import { Modal } from '../../components';

function QualityGuideModal(props) {
  const { isOpen, onClose } = props;
  // TODO: Put this content in en.json
  const content = (
    <div>
      <b>New With Tags</b> - Your item has never been worn and the original hanging tags are still
      on. For this option, you’ll need to take pictures of the tags.
      <br />
      <br />
      <b>New Without Tags</b> - Your item has never been worn (other than perhaps trying it on), but
      the tags have been removed.
      <br />
      <br />
      <b>Excellent Condition</b> - Your item has only been lightly used and has been extremely well
      maintained. There may be some small signs of wear, but nothing major.
      <br />
      <br />
      <b>Good Condition</b> - You’ve worn this item and it’s well maintained. There may be some
      quirks like a small stain, a button missing, or a thread loose, but it’s overall in good
      shape. You will need to take pictures of any quirks the item has.
    </div>
  );
  return (
    <Modal
      id="QualityGuideModal"
      isOpen={isOpen}
      onClose={onClose}
      onManageDisableScrolling={() => {}}
    >
      {content}
    </Modal>
  );
}

QualityGuideModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
};

export default QualityGuideModal;
