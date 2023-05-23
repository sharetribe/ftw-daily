const sgMail=require('@sendgrid/mail');
const { serialize } = require('../api-util/sdk');

function listingInReviewTemplate() {
    return `<!doctype html>
    <html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Email Changed</title>

  <link href="https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;700;800&display=swap" rel="stylesheet">
  <style type="text/css">
    table,
    td,
    div,
    h1,
    p {
      font-family: 'Karla', sans-serif;
    }



    @media screen and (max-width: 1920px) {
      .col-sml {
        max-width: 42% !important;
      }

      .col-lge {
        max-width: 57% !important;
      }

      .mainContainer {
        max-width: 680px;
        margin: 20px auto;
        padding: 26px 64px;
        border: 1px solid #D1D1D1;
      }

      .mainContainerInner {
        padding: 0px;
        max-width: 100%;
      }

      .headerCon {
        width: 100%;
        padding: 0px;
      }

      .buttonFullWidth {
        width: fit-content;
      }

    }

    @media screen and (max-width: 768px) {
      .col-lge {
        max-width: 100% !important;
        margin-top: 24px;
      }

      .mainContainer {
        max-width: 100%;
        width: 100%;
        margin: 0px auto;
        padding: 26px 34px 0;
        border: 0px solid;
        display: table-cell;
      }

      .headerCon {
        border: 0px solid #D1D1D1;
        border-radius: 0px;
        padding: 0px;
        width: 100%;
      }

      .buttonFullWidth {
        width: fit-content;
      }
    }

    @media screen and (max-width: 767px) {

      .col-lge {
        max-width: 100% !important;
        margin-top: 24px;
      }

      .buttonFullWidth {
        width: 100%;
      }

      .mainContainer {
        max-width: 100%;
        margin: 0;
        width: 100%;
        padding: 39px 0px 24px;
      }

      .mainContainerInner {
        max-width: 100%;
        width: 100%;
        margin: 0px auto;
        padding: 0px 20px 0px;
        border: 0px solid;
        display: table-cell;
      }

      .headerCon {
        border: 0px solid #D1D1D1;
        border-radius: 0px;
        padding: 0px;
        width: 100%;
      }

      button {
        width: 100%;
        text-align: center;
      }
    }
  </style>
</head>

<body
  style="font-size:16px;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;color:#0a0a0a;font-family: 'sofiapro';font-weight:normal;padding:0;margin:0;text-align:left;font-size:16px;line-height:19px;width:100% !important;">
  <div class="mainContainer">
    <div class="mainContainerInner">
      <header
        style="text-align:center;margin-bottom:24px;display: flex;justify-content: flex-start; flex-direction: row;align-items: center;">
        <a href="#" style="color:#0286FF;text-decoration:none;">
          <img class="logoIcon" src="./logo.png" />
        </a>
      </header>
      <div class="headerCon" style=" margin:38px 0 0 0;">
        <div>
          <h1
            style="font-family: 'Karla', sans-serif; font-style: normal;font-weight: 500;font-size: 18px;line-height: 100%; letter-spacing: -0.04em; margin:0;color: #484848;">
            Enquiry from byBorrow user
          </h1>
          <br/>
          <p
            style="font-family: 'Karla', sans-serif; font-style: normal;font-weight: 500;font-size: 16px;line-height: 100%; letter-spacing: -0.04em; margin:0;color: #484848;">
            email:&nbsp${"data.email"}
            <br/>
            message:&nbsp${"data.message"}
          </p>

          <div style="margin-top: 22px;">
          <p
            style="margin:46px 0 24px; font-family: 'Karla', sans-serif;font-style: normal;font-weight: normal;font-size: 18px;line-height: 140%;letter-spacing: -0.04em;color: #767676;">
              Thank you, <br>
              The byBorrow </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</body>

</html>
      `;
  }
module.exports = {
    // this api create or update the contact.
    contact_us: async (req, res) => {
    //    const {data}=req.body;
       const key = process.env.SENDGRID_KEY;
       console.log('key', key)
        sgMail.setApiKey(key);
        const message = {
        //   to:process.env.BYBORROW_EMAIL,
        to:"petcribtest@yopmail.com",
        //   from: process.env.SENDER_EMAIL,
        from:"hello@byborrow.com",
          subject:"Enquiry",
          text:"process.env.BYBORROW_EMAIL",
          html:listingInReviewTemplate(),
          listingStatus:"state",
        };
       await sgMail.send(message).then(
          () => {
            return res
              .status(200)
              .set('Content-Type', 'application/transit+json')
              .send(serialize({ message: 'Email Sent' }))
              .end();
          },
        )
    },
  };