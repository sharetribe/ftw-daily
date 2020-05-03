import React from 'react';
import { StaticPage, TopbarContainer, ProfileSettingsPage } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  NamedLink,
  
} from '../../components';

import css from './WhyPetOwnersPage.css';
import banner from './images/banner.jpg';

const WhyPetOwnersPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Pet Sitting with Confidence | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WhyPetOwnersPage',
        description: 'PawSquad',
        name: 'WhyPetOwnersPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>

    <div className={css.pageBanner}>
      <img src={banner} />
    <div className={css.pageBannerOverlay}>
      <h1 className={css.pawTitle}>Why are some Pet Owners still hesitant to<br />hire a Professional Pet Sitter?</h1>
    </div>
    </div>


    <div className={css.sectionContent}>

    <p className={css.noma}>Over the last few years Pet owners are becoming aware of Professional Pet Sitters, consider it and then stop before signing up their beloved pet. So why do some still hesitate?</p>
    
    <p>Pet Sitting reduces your pets’ risk of disease - our pets always stay in their own home environment surrounded by familiarity and routine.</p>

    <p>We asked and this is what we found out, and why we think you need to consider the advantages of hiring a professional:</p>

    <h2>No 1: “They are unsure what a Professional Pet Sitter does?”</h2>

    <p>Is this a new type of job?  Will they walk my dog? Since when is it a “job” to care for other people’s pets?</p>

    <p>Professional Pet Sitters have been around for a while now but only recently with more and more owners considering their pets an integral part of the family has it been getting the recognition it deserves. In the past dogs and cats would often be shipped off to kennels and catteries whilst their family went away, but poor press and bad experiences meant that pet owners sought out alternatives and pet sitting has never been more popular.</p>

    <p>Our pets are living longer, our veterinary surgeons can perform live changing procedures and it is not unusual for pet sitters to care for animals with special needs or requiring medication.</p>

    <p>Professional Pet Sitters also have a responsibility to look after their clients’ property and be on the front line, should an emergency occur. That’s why we provide an Insurance backed guarantee and Public Liability for up to £1m.</p>

    <p>Choosing Pet Sitting as a career means professionals are familiar with a wide variety of pets and unlike non-professionals or family and friends, they have the proper experience to handle different situations. We back them up with Virtual Vet available 24/7 to answer questions and provide advice, in addition to our Property, Public Liability and Damage Insurance. They’ve also got a member of our team at the end of a phone when they need us.</p>

    <hr className={css.whyHr} />

    <h2>No2: “Worried about letting a stranger into their home”</h2>

    <p>This is a legitimate concern, but it’s good to keep in mind that Professional Pet Sitters are like Home Cleaners, Nanny’s, Real Estate Agents, Trade workers, and Contractors. It is an intricate part of their job to visit and enter people’s homes, and part of what they do every day.   We provide the added peace of mind with Digital ID Verification and an Insurance backed guarantee for up to £1m.  A Professional Pet Sitter will always be respectful of their clients’ property and belongings and a member of our team personally approves every Pet Sitter on our platform.</p>

    <hr className={css.whyHr} />

    <h2>No3: They still believe that asking friends, neighbours or a family member is a better option.</h2>

    <h4>“My cat doesn’t need company, just someone to pop in to put out food”</h4>

    <p>There are a few cat parents still out there who think that their cat will be happy with someone refilling their food and water.  Even if they pretend not to need you, cats like their human company and will show you their displeasure when you come back in no uncertain terms.  While you might get away with a weekend, any longer will not please your cat and could leave them stressed.</p>

    <h4>“I will ask my neighbour, daughter or friend to watch my pets”</h4>

    <p>Our experience was each time before we booked a vacation, we had the same conversation about who was available and willing to watch the pets.  Then we had to cajole them into agreeing which was even more difficult if it coincided with other plans. We’d heard from friends of being bailed on at the last minute and frantically trying to arrange alternatives.</p>

    <p>The truth is, not a lot of people enjoy driving across town after work, on the weekends or on special days like Christmas to go scoop the litter box of someone else’s cat.</p>

    <p>But let’s say you did manage to secure a friend or family member to care for your pets and are certain they won’t bail on you. You think your pets are in good hands. Are you sure?</p>

    <p>Does your home insurance cover you for damages? Do they have 24/7 Vet Advice? Are they able to fulfil the schedule your pet needs?</p>

    <p>Our Professional Pet Sitters come with all the advantages and none of the disadvantages.  You tell them when you need them, what you need them to do, and you get peace of mind by taking advantage of our Insurance backed guarantees.</p>

    <hr className={css.whyHr} />

    <h2>No4: “Professional Pet sitters are expensive”</h2>

    <h4>“If you think hiring a professional is expensive, wait until you hire an amateur”</h4>

    <p>If you are looking for the least expensive service you can find, then we are not for you.  The girl next door, a close neighbour or a browse through Facebook you will certainly find a cheaper option.</p>

    <p>You’ll get what you pay for, by way of peace of mind, professional quality service, experience and accountability. Our Professional Pet Sitters are fully insured and come with a £1m guarantee.</p>

    <h4>Have we been able to convince you to hire a Professional Pet Sitter?</h4>

    <p>If not, tell us why! To us, there’s no substitute for the quality of pet care and peace of mind our clients receive by signing a professional. If you’re still hesitant, <NamedLink name="ContactPage">let us know</NamedLink>, we’d love to talk to you about it.</p>
    </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default WhyPetOwnersPage;


