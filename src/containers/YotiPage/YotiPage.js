import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  StaticPage,
  TopbarContainer,
  ProfileSettingsPage
} from "../../containers";
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink
} from "../../components";

import yoti from "./yotilogo.png";
import idphoto from "./profile.svg";
import birth from "./dateofbirth.svg";
import email from "./email.svg";
import phone from "./phone.svg";
import yotiscan from "./yoti.png";
import document from "./document.svg";
import name from "./name.svg";
import scan from "./scan.png";
import one from "./1.png";
import two from "./2.png";
import three from "./3.png";
import four from "./4.png";
import appstore from "./appstore.png";
import googlestore from "./googlestore.png";
import css from "./YotiPage.css";
import rotate from "./rotate.png";

const YotiPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Yoti | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'YotiPage',
        description: 'Yoti Verification',
        name: 'Yoti',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>

    <div className={css.idn}>

      <h1 className={css.yotiTitle}>Verify your identity with Yoti</h1>

    </div>

    <div className={css.staticPageWrapper}>

      <div className={css.sectionContent}>

    <div className={css.whatwedoWrapper}>

      <div className={css.whatwedoLeft}>

          <h2 className={css.h2FirstChild}>
            What is Yoti and how do we use it?
          </h2>

           <p>
            We use our identity partner Yoti to confirm your identity. To verify your account and all your future listings with Yoti simply <NamedLink name="ProfileSettingsPage">Go to your Profile</NamedLink> and click the Yoti Verification button.
          </p>

          <p>
            In order to display the ID verified badge on your listing, you need to complete the Yoti verification. It only takes a few minutes and helps to keep our community safe. Listings without verification may be removed.
          </p>

          <hr />

          <h2>Why Trust My Pet Sitter chose Yoti as our Digital ID provider?</h2>

          <p>
            Yoti is a biometric identity app. It works by allowing you to set up a trusted, genuine and verified digital identity. The biometrics are a key part of making sure we keep out fake identities and documents. The biometrics also make sure that it really is you taking actions in the app.
          </p>

          <p>
            The way Yoti build their solutions is different to other tech companies. With Yoti, you are in full control of your data. Your personal details are encrypted into unreadable data that can only be unlocked by your Yoti app. Nobody else can access or decipher it, not even their staff.
          </p>

          <p>
            Yoti cannot mine and sell your data to third parties, nor share any details without your approval. You’re in control to securely share specific details, never your whole identity.
          </p>

          <p>
            <NamedLink className={css.joinNow} name="SignupPage">Join Now<img src={rotate} className={css.imgRotate} /></NamedLink>
          </p>

      </div>

      <div className={css.whatwedoRight}>
          <h2>
            Need help?
          </h2>
        
        <ExternalLink className={css.aText} href="https://yoti.zendesk.com/hc/en-us/articles/209436429-What-is-Yoti-">
          <p className={css.addspace}>
            <span className={css.arrowImg}></span><span className={css.arrowTxt}>What is Yoti?</span>
          </p>
        </ExternalLink>

        <ExternalLink className={css.aText} href="https://yoti.zendesk.com/hc/en-us/articles/208626189-How-do-I-create-my-Yoti-">
          <p className={css.addspace}>
            <span className={css.arrowImg}></span><span className={css.arrowTxt}>How do I create my Yoti?</span>
          </p>
        </ExternalLink>

        <ExternalLink className={css.aText} href="https://yoti.zendesk.com/hc/en-us/articles/209399705-Why-should-I-trust-Yoti-with-my-information-">
          <p className={css.addspace}>
            <span className={css.arrowImg}></span><span className={css.arrowTxt}>Why should I trust Yoti with my information?</span>
          </p>
         </ExternalLink>

      </div>

    </div>

      </div>

    </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default YotiPage;
