import React from 'react';

import { Footer as FooterContent } from '../../components/index.js';
import { TopbarContainer } from '../../containers/index.js';

import { validProps } from './Field';

import LayoutComposer from './LayoutComposer/index.js';
import SectionBuilder from './SectionBuilder/SectionBuilder.js';
import StaticPage from './StaticPage.js';

import css from './PageBuilder.module.css';
import contactCover from '../../assets/Contact-Us-cover.jpg';

const getMetadata = (meta, schemaType, fieldOptions) => {
  const { pageTitle, pageDescription, socialSharing } = meta;

  // pageTitle is used for <title> tag in addition to page schema for SEO
  const title = validProps(pageTitle, fieldOptions)?.content;
  // pageDescription is used for different <meta> tags in addition to page schema for SEO
  const description = validProps(pageDescription, fieldOptions)?.content;
  // Data used when the page is shared in social media services
  const openGraph = validProps(socialSharing, fieldOptions);
  // We add OpenGraph image as schema image if it exists.
  const schemaImage = openGraph?.images1200?.[0]?.url;
  const schemaImageMaybe = schemaImage ? { image: [schemaImage] } : {};
  const isArticle = ['Article', 'NewsArticle', 'TechArticle'].includes(schemaType);
  const schemaHeadlineMaybe = isArticle ? { headline: title } : {};

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org (This template uses JSON-LD format)
  //
  // In addition to this schema data for search engines, src/components/Page/Page.js adds some extra schemas
  // Read more about schema:
  // - https://schema.org/
  // - https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
  const pageSchemaForSEO = {
    '@context': 'http://schema.org',
    '@type': schemaType || 'WebPage',
    description: description,
    name: title,
    ...schemaHeadlineMaybe,
    ...schemaImageMaybe,
  };

  return {
    title,
    description,
    schema: pageSchemaForSEO,
    socialSharing: openGraph,
  };
};

//////////////////
// Page Builder //
//////////////////

/**
 * PageBuilder can be used to build content pages using page-asset.json.
 *
 * Note: props can include a lot of things that depend on
 * - pageAssetsData: json asset that contains instructions how to build the page content
 *   - asset should contain an array of _sections_, which might contain _fields_ and an array of _blocks_
 *     - _blocks_ can also contain _fields_
 * - fallbackPage: component. If asset loading fails, this is used instead.
 * - options: extra mapping of 3 level of sub components
 *   - sectionComponents: { ['my-section-type']: { component: MySection } }
 *   - blockComponents: { ['my-component-type']: { component: MyBlock } }
 *   - fieldComponents: { ['my-field-type']: { component: MyField, pickValidProps: data => Number.isInteger(data.content) ? { content: data.content } : {} }
 *     - fields have this pickValidProps as an extra requirement for data validation.
 * - pageProps: props that are passed to src/components/Page/Page.js component
 *
 * @param {Object} props
 * @returns page component
 */
const PageBuilderTerm = props => {
  const {
    pageAssetsData,
    inProgress,
    error,
    fallbackPage,
    schemaType,
    isfaqpage,
    isContact,
    options,
    isaboutuspage,
    ...pageProps
  } = props;

  // if (!pageAssetsData && fallbackPage && !inProgress && error) {
  //   return fallbackPage;
  // }

  // Page asset contains UI info and metadata related to it.
  // - "sections" (data that goes inside <body>)
  // - "meta" (which is data that goes inside <head>)
  const { sections = [], meta = {} } = pageAssetsData || {};
  const pageMetaProps = getMetadata(meta, schemaType, options?.fieldComponents);

  const layoutAreas = `
    topbar
    main
    footer
  `;
  return (
    <StaticPage {...pageMetaProps} {...pageProps}>
      <LayoutComposer areas={layoutAreas} className={css.layout}>
        {props => {
          const { Topbar, Main, Footer } = props;
          return (
            <>
              <Topbar as="header" className={css.topbar}>
                <TopbarContainer />
              </Topbar>
              <Main as="main" className={css.main}>
                <>
                  <SectionBuilder sections={sections} options={options} />
                  {isaboutuspage ? <div className={css.faqPageWrapper}>
                    <h1 className={css.headingName}>
                      Welcome to PetCrib!
                    </h1>
                    <div className={css.aboutData}>
                      We are passionate about pets and understand the need for reliable and
                      trustworthy pet care services. Our platform connects Pet Owners with Pet
                      Hosts who are committed to providing the best possible care for your furry
                      family members.
                      Our mission is to make pet care services accessible and affordable for
                      everyone, while also providing a platform for Pet Hosts to build their
                      business and gain exposure to new clients. We believe that by creating a
                      community of Pet Owners and Pet Hosts, we can make a positive impact
                      on the lives of pets and their humans.
                      Our team consists of experienced professionals in the pet care industry,
                      as well as technology experts who are dedicated to creating a seamless
                      and user-friendly platform.
                      We understand that pets are an important part of your life, and we are
                      committed to making sure they receive the attention, care, and love they
                      deserve while you are away.
                      We take the safety and well-being of pets very seriously and have
                      implemented strict vetting processes for our Pet Hosts so you can feel
                      confident that your pet is in good hands. All Pet Hosts must provide
                      information about their experience, credentials and pass a safety test and
                      we encourage Pet Owners to review Pet Hosts' profiles and ratings before
                      booking.
                      We are based in Sydney, Australia and are committed to serving the
                      Australian community. We believe that by supporting local Pet Hosts and
                      Pet Owners, we can create a stronger and more connected pet care
                      community across Australia. We are not trying to sell you fancy products
                      or other pet services. Our focus is on pet care and we are constantly
                      working to improve our platform and welcome feedback from our users.

                      We look forward to connecting you with the best Pet Hosts in your area!
                    </div>
                  </div> : null}
                  {isfaqpage ?
                    <div className={css.faqPageWrapper}>
                      <h2 className={css.petHeading}>For Pet Owners:</h2>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How does PetCrib work?</summary>
                        <div className={css.accordanceBoxWrap}>
                          So, you are going away for work or for a holiday and looking for a Crib
                          for your pet and someone who will look after your baby like you do? Don't
                          stress, Pet Owners can search for hosts in their area and submit a booking
                          request through the platform. Pet Hosts have the option to accept or
                          decline the request, and once accepted, Pet Owners and Pet Hosts can
                          coordinate the details of the service.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>Why use PetCrib?</summary>
                        <div className={css.accordanceBoxWrap}>
                          No cages and kennels. You can book a trusted Pet Host in your
                          neighbourhood who has the experience in caring for pets and will give
                          your pet personal and loving attention while you are away.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What kind of services do our Pet Hosts offer?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Our Pet Hosts offer two types of services, including overnight care and
                          day care both at the Pet Host’s Crib. You can find a Pet Host who offers
                          the services that best meet your pet's needs.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How do I know if a Pet Host is trustworthy?</summary>
                        <div className={css.accordanceBoxWrap}>
                          All of our Pet Hosts go through a vetting process, which includes a
                          background check and verification of their experience working with pets.
                          Pet Hosts also need to pass a Safety Test. You can also read reviews from
                          other Pet Owners who have used their services in the past. Pet Hosts are
                          also reviewed by each Pet Owner who books with them so you can read
                          the reviews before booking.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}> What are the fees for using PetCrib?</summary>
                        <div className={css.accordanceBoxWrap}>
                          PetCrib charges a Booking Fee for each booking made through our
                          platform. The Booking Fee is a percentage of the total Booking Cost and is
                          clearly stated during the booking process.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How do I pay the Pet Host?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Payment is handled securely through our platform. You can add your
                          payment information and pay for services directly through the site. The
                          Pet Host will be paid after the services are provided. Secure and stress-
                          free.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What if I have a problem with a Pet Host?</summary>
                        <div className={css.accordanceBoxWrap}>
                          We are committed to providing a safe and reliable platform for our
                          users. If you have any issues with a Pet Host, please contact us
                          immediately and we will do our best to resolve the issue.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What happens in case of an emergency?</summary>
                        <div className={css.accordanceBoxWrap}>
                          We understand, things happen outside of our control. Pet Hosts are
                          responsible for providing emergency contact information in their profiles.
                          In case of an emergency, Pet Owners should first contact the Pet Hosts
                          and then seek veterinary care as needed. Bookings that are made on
                          PetCrib are covered under our ‘x’ insurance policy.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What happens if I want to cancel a Booking or a Pet Host cancels?</summary>
                        <div className={css.accordanceBoxWrap}>
                          We understand that plans can change, and sometimes it may be
                          necessary for you to cancel a booking on PetCrib. However, please note
                          that cancelling a booking can cause inconvenience to the Pet Host. We
                          have put in place some policies to outline what the process may be in
                          each situation. Our Cancellation Policy and Refund procedures are
                          outlined in our Terms of Service.
                          If a Pet Owner cancels a Booking after it has been paid for, but before the
                          booking start the Pet Owner will be required to pay any applicable
                          Cancellation Fee to the relevant Pet Host (depending on the cancellation
                          policy selected by the Pet Host).
                          PetCrib allows Pet Hosts to choose their cancellation policy from three
                          different policies we have set. Pet Owners can view the cancellation policy
                          on the Pet Host’s public profile before making a Booking.
                          The three cancellation policies are:
                          <ol>
                            <li>
                              <strong>Flexible Policy</strong> - a full refund will only be available if the Booking is
                              cancelled 1 day before the Booking commences;
                            </li>
                            <li>
                              <strong>Moderate Policy</strong> - a full refund will only be available if the Booking
                              is cancelled before 7 days before the Booking commences; and
                            </li>
                            <li>
                              <strong>Strict Policy</strong> - a full refund will only be available if the Booking is
                              cancelled before 14 days before the Booking commences.
                            </li>
                          </ol>
                          If a Booking is cancelled before the timeframe specified in the Pet Host's
                          chosen cancellation policy, the Pet Owner will receive a full refund of the
                          Service Fee. Please note:  Our Booking Fee is non-refundable when a
                          booking is cancelled by the Pet Owner.
                          If the cancellation occurs within the timeframe of the cancellation policy,
                          then the Pet Owner will receive a refund of 50% of the Service fee. Please
                          note: The Booking Fee is non-refundable when a booking is cancelled by
                          the owner. In this scenario, if the Pet Host is owed the cancellation fee
                          (50% of the Service Fee, minus Our Platform Fee) this will then be
                          deposited into the Pet Hosts nominated bank account.
                          All ongoing Repeat Weekly Bookings without a specified end date are
                          subject to the Flexible policy regardless of the Cancellation Policy the Pet
                          Host has set forth in their profile. Read more about this specific policy
                          here.
                          Please note that in exceptional circumstances, such as a medical
                          emergency or natural disaster, we may waive our cancellation policy. In
                          such cases, please inform us as soon as possible so we can work with you
                          to find a solution that is fair to both you and the Pet Host.
                          If a Pet Host cancel's a paid booking, the Pet Host is required to
                          immediately message the Pet Owner and cancel it via the booking details.
                          PetCrib will refund the full amount paid to the Pet Owner, and we will aim
                          to help the Pet Owner find a replacement Pet Host. Depending on the
                          circumstances surrounding the cancellation we may flag the Pet Host’s
                          profile. If more than two paid bookings are cancelled within two months,
                          PetCrib may suspend or remove the Pet Host's profile.
                          PetCrib aims to ensure that once a booking is paid for, it is secured and
                          locked in. We understand that sometimes Pet Hosts need to cancel, either
                          due to an emergency or an unavoidable circumstance. However, once a
                          booking has been paid for we want to keep cancellations by Pet Hosts to a
                          minimum.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>Can I get a refund after a Booking is completed?</summary>
                        <div className={css.accordanceBoxWrap}>
                          If a Pet Owner is extremely unhappy with the service that was provided
                          by the Pet Host they booked, or if an incident occurs during a booking, the
                          Pet Owner can submit a claim for a refund.
                          However, to be eligible for a refund, the following needs to have
                          happened:
                          <ul className={css.dotsList}>
                            <li>The Pet Owner and Pet Host must have had a Meet and Greet before
                              the booking (in person or digitally);</li>
                            <li>The Booking must have been paid for through the PetCrib website;
                              and</li>
                            <li>If the Booking has finished, then the Pet Owner must have left a
                              poor review for the Pet Host.</li>
                          </ul>

                          
                          The claim must be reported to PetCrib within 48 hours, from the
                          confirmation of the End of Stay, to report any incident that may have
                          occurred by emailing [x] with the Subject line: Refund Request – Post End
                          of Stay.
                          Once this has been reported to PetCrib, we will review what has happened
                          and discuss with both parties to attempt to reach an agreement around a
                          solution. This is also outlined in our Terms of Service.
                         
                        </div>
                      </details>
                      <h2 className={css.petHeading}>For Pet Hosts:</h2>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What is Pet Hosting?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Pet Hosting is the general term used to describe looking after other
                          people's pets when the Pet Owner is away.
                          Pet Hosting includes looking after pets at the Pet Hosts house, either
                          overnight or during the day (also known as day care).
                          A Pet Hosts roles and responsibilities include:
                          <ul className={css.dashList}>
                            <li>
                              - Providing a safe and comfortable environment for the pet to stay;
                            </li>
                            <li>
                              - Feeding, walking, and caring for the pet according to the owner's
                              instructions;
                            </li>
                            <li>
                              - Administering any necessary medications or treatments as instructed by
                              the Pet Owner;
                            </li>
                            <li>
                              - Regularly communicating with the owner to provide updates on the pet's
                              well-being;
                            </li>
                            <li>
                              - Ensuring that the pet is secure and cannot escape from your Crib;
                            </li>
                            <li>
                              - Having access to a vehicle in case of emergency; and
                            </li>
                            <li>
                              - Reporting any issues or concerns to the Pet Owner or to us promptly.
                            </li>
                          </ul>
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How do I become a Pet Host on PetCrib?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Do you love pets and are you looking for a way to make some
                          additional income and want a way to combine both? If so, then becoming
                          a Pet Host on PetCrib is a very easy process. A Pet Host can create a
                          profile by going to PetCrib.com.au and selecting ‘Become a Host’. The
                          Pet Host will be prompted to provide their relevant information, including
                          their pet preferences, availability, pricing, experience and credentials.  Pet
                          Hosts will also need to pass a Safety Test and upload a background check.
                          Once submitted:
                          <ul>
                            <li>
                              - The profile will be vetted and reviewed by our team;
                            </li>
                            <li>
                              - Keep an eye on your email—our profile experts may ask you to
                              modify a few things to make your profile the best it can be prior to
                              the profile being approved;
                            </li>
                            <li>
                              - You should hear from us within 7 business days. We will notify you
                              via email if your profile is approved.
                            </li>
                            <li>
                              - Once your profile is approved and you upload your background
                              check, your services will be visible in the PetCrib platform and Pet
                              Owners will be able to contact you.
                            </li>
                          </ul>
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What are the requirements for becoming a Pet Host?</summary>
                        <div className={css.accordanceBoxWrap}>
                          A few important things to know before you get started:
                          <ul>
                            <li>
                              - You must be at least 18 years of age to become a Pet Host on
                              PetCrib;
                            </li>
                            <li>
                              - Pet Hosts will also need to pass a Safety Test and upload a
                              background check; and
                            </li>
                            <li>
                              - Pet Hosts on PetCrib are considered independent contractors. This
                              means that you'll be running your own small business on PetCrib
                              and won't be considered a PetCrib employee.
                            </li>
                          </ul>
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How do I prepare myself before Hosting a Pet at my Crib?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Before hosting a pet at your home, here are some tips to help you
                          prepare:
                          <ol>
                            <li>
                              Pet-proof your Crib: Make sure your Crib is safe for pets. This means
                              removing any hazardous items or materials that the pet may be
                              able to access.
                            </li>
                            <li>
                              Familiarise yourself with the pet's needs: Before the pet arrives,
                              make sure you are aware of any special needs or requirements the
                              pet may have. This could include dietary restrictions, medications,
                              or exercise needs.
                            </li>
                            <li>
                              Create a pet-friendly space: Set up a comfortable space for the pet
                              to stay during their visit. This could include a cozy bed, toys, and
                              water and food dishes.
                            </li>
                            <li>
                              Have a plan for emergencies: In the unlikely event of an emergency,
                              it's important to have a plan in place. Make sure you have the
                              contact information for the nearest veterinarian or the Pet Owner’s
                              preferred vet.
                            </li>
                            <li>
                              Communicate with the Pet Owner: Communicate with the Pet Owner
                              to ensure you understand their expectations and preferences for
                              their pet's time at your Crib. This will help ensure a smooth and
                              positive experience for both you and the pet.
                            </li>
                          </ol>
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How do I set up my pet preferences?</summary>
                        <div className={css.accordanceBoxWrap}>
                          To receive more relevant requests, it's a good idea to specify your pet
                          and booking preferences. Here are preferences you can set and manage
                          from your account:
                          <ul className={css.maxPreferences}>
                            <li>
                              - the maximum number of pets you're comfortable watching per day
                            </li>
                            <li>
                              - pet size preferences
                            </li>
                            <li>
                              - whether you offer cat services
                            </li>
                            <li>
                              - your preferred Cancellation Policy (Flexible / Moderate or Strict)
                            </li>
                          </ul>
                          To manage your pet preferences:
                          <ol>
                            <li>
                              Navigate to your profile and select the service you want to modify
                              pet preferences for.
                            </li>
                            <li>
                              Choose how many dogs you can sit at a time, details about your
                              availability, your cancellation policy, and more.
                            </li>
                            <li>
                              Once you're done editing, select Save. You’re all set!
                            </li>
                          </ol>
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How do I set my availability?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Keeping your calendar up to date is an important part of managing
                          your business on PetCrib. You can use PetCrib's calendar feature to
                          manage your availability for specific dates and services.  This can be
                          updated by selecting [x] in your Profile.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How do I receive payment?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Payment is processed securely through our third-party payment
                          processor Stripe, and Pet Hosts receive payment for their services within
                          24 hours of completing the booking.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>Do I need to get a permit to become a Pet Host?</summary>
                        <div className={css.accordanceBoxWrap}>
                          A Pet Host on PetCrib will need to make sure that they are in
                          compliance with all relevant laws. This includes any federal, state, and
                          local council laws relating to the hosting of animals and the keeping of
                          animals at your own property and under your control.
                          You are solely responsible for obtaining all necessary licenses and
                          permits. PetCrib assumes no responsibility for a Pet Hosts failure to obtain
                          any necessary permits. You can read more about this in our Terms of
                          Service.<br /><br />
                          <i> Take note: PetCrib is a platform connecting Pet Hosts with Pet Owners and
                            is not an employer. As such, Pet Hosts are responsible for their own
                            compliance with Federal, State and Council regulations.</i><br /><br />
                          Pet Hosting Codes of Practice in Australian States and Territories:<br />
                          <div><strong>New South Wales</strong></div>
                          <a href="http://www.dpi.nsw.gov.au/animals-and-livestock/animal-welfare/general/
                          welfare-of-dogs/aw-code-5">http://www.dpi.nsw.gov.au/animals-and-livestock/animal-welfare/general/
                            welfare-of-dogs/aw-code-5</a>
                          <div><strong>Australian Capital Territory</strong></div>
                          (http://www.legislation.act.gov.au/a/1992-45/di.asp)
                          Queensland (https://www.qld.gov.au/families/government/pets/pages/pet-
                          laws.html)
                          <div>
                            <strong>Northern Territory</strong>
                          </div>
                          http://www.animalwelfare.nt.gov.au/national_standards_and_guidelines
                          <div>
                            <strong>Victoria</strong>
                          </div>
                          (http://agriculture.vic.gov.au/pets/domestic-animal-businesses/boarding-
                          establishments/code-of-practice-for-the-operation-of-boarding-
                          establishments)
                          <div>
                            <strong>Tasmania</strong>
                          </div>
                          (http://dpipwe.tas.gov.au/)
                          <div>
                            <strong>
                              South Australia
                            </strong>
                          </div>
                          http://www.environment.sa.gov.au/managing-natural-
                          resources/plants-and-animals/Animal_welfare/Codes_of_practice/
                          Animal_welfare_codes_of_practice
                          <div>
                            <strong>Western Australia</strong>
                          </div>
                          (https://www.commerce.wa.gov.au/consumer-
                          protection/house-pet-or-baby-sitting-services)
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How can a Pet Host prepare themselves before they provide pet care services?</summary>
                        <div className={css.accordanceBoxWrap}>
                          Here are some recommendations for a Pet Host:
                          1. Familiarise yourself with the pet's needs: Before agreeing to provide
                          pet care services, make sure you understand the pet's needs. Ask
                          the Pet Owner about the pet's feeding schedule, exercise routine,
                          medication needs, and any other special instructions.
                          2. Get to know the pet: Spend time with the pet before the pet owner
                          leaves to get to know their personality and behaviour. This can help
                          you anticipate the pet's needs and ensure that you provide the best
                          possible care.
                          3. Have a plan for emergencies: Make sure you have a plan in place in
                          case of an emergency. This may include knowing the location of the
                          nearest veterinary clinic, having a first aid kit on hand, and knowing
                          who to contact in case of an emergency.
                          4. Communicate with the pet owner: Make sure you communicate
                          regularly with the Pet Owner while they are away. This can include
                          sending updates on the pet's well-being and any issues that arise.
                          5. Maintain a safe and secure environment: Ensure that the pet's
                          environment is safe and secure, free from hazards that could harm
                          the pet. Make sure that the pet has proper identification, such as a
                          collar with tags and/or a microchip, and that the pet's area is
                          escape-proof.
                          By following these recommendations, a Pet Host can better prepare
                          themselves to provide quality care to pets while their owners are away.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What if there is an emergency?</summary>
                        <div className={css.accordanceBoxWrap}>
                          We understand, things happen outside of our control. Pet Hosts are
                          responsible for providing emergency contact information in their profiles.
                          In case of an emergency, the Pet Host should first contact the Pet Owner
                          and then seek veterinary care as needed.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How does PetCrib ensure the safety and well-being of pets?</summary>
                        <div className={css.accordanceBoxWrap}>
                          We require all Pet Hosts to provide information about their experience
                          and credentials, and we encourage Pet Owners to review Pet Hosts'
                          profiles and ratings before booking. We also provide a platform for
                          communication between Pet Owners and Pet Hosts to ensure that all
                          details are agreed upon prior to the booking.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>What happens if I want to cancel a Booking or a Pet Owner cancels?</summary>
                        <div className={css.accordanceBoxWrap}>
                          We understand that plans can change, and sometimes it may be
                          necessary for you to cancel a booking on PetCrib. However, please note
                          that cancelling a booking can cause inconvenience to the Pet Host. We
                          have put in place some policies to outline what the process may be in
                          each situation. Our Cancellation Policy and Refund procedures are
                          outlined in our Terms of Service.
                          If a Pet Owner cancels a Booking after it has been paid for, but before the
                          booking start the Pet Owner will be required to pay any applicable
                          Cancellation Fee to the relevant Pet Host (depending on the cancellation
                          policy selected by the Pet Host).
                          PetCrib allows Pet Hosts to choose their cancellation policy from three
                          different policies we have set. Pet Owners can view the cancellation policy
                          on the Pet Host’s public profile before making a Booking.
                          The three cancellation policies are:
                          (4)Flexible Policy - a full refund will only be available if the Booking is
                          cancelled 1 day before the Booking commences;
                          (5)Moderate Policy - a full refund will only be available if the Booking
                          is cancelled before 7 days before the Booking commences; and
                          (6)Strict Policy - a full refund will only be available if the Booking is
                          cancelled before 14 days before the Booking commences.
                          If a Booking is cancelled before the timeframe specified in the Pet Host's
                          chosen cancellation policy, the Pet Owner will receive a full refund of the
                          Service Fee. Please note:  Our Booking Fee is non-refundable when a
                          booking is cancelled by the Pet Owner.
                          If the cancellation occurs within the timeframe of the cancellation policy,
                          then the Pet Owner will receive a refund of 50% of the Service fee. Please
                          note: The Booking Fee is non-refundable when a booking is cancelled by
                          the owner. In this scenario, if the Pet Host is owed the cancellation fee
                          (50% of the Service Fee, minus Our Platform Fee) this will then be
                          deposited into the Pet Hosts nominated bank account.
                          All ongoing Repeat Weekly Bookings without a specified end date are
                          subject to the Flexible policy regardless of the Cancellation Policy the Pet
                          Host has set forth in their profile. Read more about this specific policy
                          here.
                          Please note that in exceptional circumstances, such as a medical
                          emergency or natural disaster, we may waive our cancellation policy. In
                          such cases, please inform us as soon as possible so we can work with you
                          to find a solution that is fair to both you and the Pet Host.
                          If a Pet Host cancel's a paid booking, the Pet Host is required to
                          immediately message the Pet Owner and cancel it via the booking details.
                          PetCrib will refund the full amount paid to the Pet Owner, and we will aim
                          to help the Pet Owner find a replacement Pet Host. Depending on the
                          circumstances surrounding the cancellation we may flag the Pet Host’s
                          profile. If more than two paid bookings are cancelled within two months,
                          PetCrib may suspend or remove the Pet Host's profile.
                          PetCrib aims to ensure that once a booking is paid for, it is secured and
                          locked in. We understand that sometimes Pet Hosts need to cancel, either
                          due to an emergency or an unavoidable circumstance. However, once a
                          booking has been paid for we want to keep cancellations by Pet Hosts to a
                          minimum.
                        </div>
                      </details>
                      <details className={css.accordion}>
                        <summary className={css.accordionTitle}>How does PetCrib handle disputes?</summary>
                        <div className={css.accordanceBoxWrap}>
                          In the event of a dispute between a Pet Owner and Pet Host, the parties
                          agree to first attempt to resolve the dispute through mediation. If
                          mediation is unsuccessful, the dispute will be resolved through binding
                          arbitration in accordance with the rules of the Australian Arbitration
                          Association
                        </div>
                      </details>
                    </div> : null}
                </>
              </Main>
              <Footer>
                <FooterContent />
              </Footer>
            </>
          );
        }}
      </LayoutComposer>
    </StaticPage>
  );
};

export { StaticPage, SectionBuilder };

export default PageBuilderTerm;
