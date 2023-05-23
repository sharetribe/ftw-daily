import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import { contact_us } from '../../util/api';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import ContactUsForm from './contactUsForm';
import css from './ContactForm.module.css';

function ContactUsPage() {
  const [error2, SetError] = useState(false);

  const handleSubmit = values => {
    const { email, message } = values;
    const data = {
      data: {
        email: email,
        message: message,
      },
    };
    contact_us(data);
    SetError(true);
  };

  const handleChange = e => {
    // SetError("")
  };

  return (
    <Page>
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="InvitePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.contactPageWrapper}>
            <div className={css.contactContent}>
              <div className={css.leftContact}>
                {/* <h1>Contact Us</h1>
                <p>hello@byborrow.com</p> */}
                {/* <div className={css.socialIcons}>
                <IconCollection name="INSTAGRAM_CONTACT"/>
                <IconCollection name="MESSAGE_CONTACT"/>
                
                </div> */}
              </div>
              <div>
                {/* {error2 == true ? <p>Email sent</p> : null} */}
                <ContactUsForm
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  error2={error2 ? error2 : null}
                />
              </div>
            </div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
}

export default ContactUsPage;