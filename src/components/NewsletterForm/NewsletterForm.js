import React, { Component } from 'react';
import $ from 'jquery';
import Mailchimp from 'react-mailchimp-form';
import css from './NewsletterForm.css';

class NewsletterForm extends Component {

  componentDidMount() {
     $('.'+css.NewsletterForm+' button').click(function() {

      var successtext = 'Thank you for subscribing!';

      setTimeout(function(){
        if (successtext == $('.msg-alert p').text()) {
          window.location.href = "/signup";
        }
      }, 1000);

    });
  }

  render() {
    return (
        <Mailchimp
        action='https://trustmypetsitter.us19.list-manage.com/subscribe/post?u=145dd169debb895ee85a3f842&amp;id=ca2a05fd83'
        fields={[
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
          }
        ]}
        messages = {
            {
              sending: "Sending...",
              success: "Thank you for subscribing!",
              error: "An unexpected internal error has occurred.",
              empty: "You must write an email.",
              duplicate: "This email address is already subscribed.",
              button: "Sign me up"
            }
          }
        styles = {
           {
               sendingMsg: {
                   color: '#009432'
               },
               successMsg: {
                   color: '#009432'
               },
               duplicateMsg: {
                    color: '#EE5A24'
               },
               errorMsg: {
                   color: '#ED4C67'
               }
            }
        } 
        className={css.NewsletterForm}
        />
    );
  };
};

export default NewsletterForm;