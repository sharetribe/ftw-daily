import React from 'react'
import css from './ContactForm.module.css';

function ContactForm() {
    return (
        <div>
            <div className={css.mainContactWrap}>
                <div className={css.contactBox}>
                    <div className={css.headingBox}>
                        <h1>Contact Us</h1>
                        <h3>Get in touch with real people</h3>
                        <p>We will respond to you by email or you can provide us with a phone number if you prefer.</p>
                    </div>
                    <div className={css.contactFields}>
                        <div className={css.inputForm}>
                            <label>Email Address</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Enter your email'
                                value='email'
                            />
                        </div>
                        <div className={css.inputForm}>
                            <label>Message</label>
                            <input
                                type='textarea'
                                name='message'
                                placeholder='Enter your message..'
                                value='message'
                            />
                        </div>
                        <div className={css.submitButton}>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm