import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: <span className={css.datecolor}>October 29, 2019</span></p>

      <h2>Terms of Use</h2>
      
      <p>
         1. Trust My Pet Sitter operates a platform which connects Pet owners with Pet lovers who wish to host Pets and/or offer other Pet related services using our website at trustmypetsitter.com and mobile applications (the "Service").
      </p>

      <p>
         2. The Service is operated by Trust My Pet Sitter.com Ltd (Trust My Pet Sitter, "we", "our", or "us").
      </p>

      <h2>Key definitions used in these Terms of Service</h2>

      <p>
         1. Pet Sitter means a person that has registered with our Service to offer Pet Sitter Services to Pet Owners;
      </p>

      <p>
         2. Pet Owner means a person that has registered with our Service and who seeks Pet Sitter Services; and
      </p>

      <p>
         3. Pet Sitter Services means any services offered through our Service by Pet Sitters including but not limited to home Pet Sitting, Pet walking, Pet training and related Pet services.
      </p>

      <h2>Your relationship with us</h2>

      <p>
         1. This document and any documents referred to within it (collectively, the "Terms of Service") set out the terms of your relationship with us. It is important that you read and understand the Terms of Service before using the Service. If there is anything within them that you do not understand, then please contact us at <span className={css.datecolor}>team@trustmypetsitter.com</span> to discuss what this means for you.
      </p>

      <p>
         2. By setting up an account with us or using and accessing the Service you agree to these Terms of Service. If you do not agree to these Terms of Service, please do not browse or otherwise access or use the Service.
      </p>

      <p>
         3. Trust My Pet Sitter is not party to any agreement you, as a Pet Sitter or Pet Owner, may enter into with another Pet Sitter or Pet Owner. The Service merely facilitates the introduction and matching of Pet Owners to Pet Sitters (and vice versa).
      </p>

      <h2>Information about us</h2>

      <p>
         1. When these terms mention Trust My Pet Sitter "we", "us" or "our" it refers to the Trust My Pet Sitter company you are contracting with. Your contracting entity will generally be determined based on your Country of Residence. Your Country of Residence is the jurisdiction associated with your Trust My Pet Sitter.com Account as determined by either your express selection or by Trust My Pet Sitter.com's assessment of your residence using various data attributes associated with your Trust My Pet Sitter Account.
      </p>

      <p>
         2. If your Country of Residence is the United States, you are contracting with My Pet Sitter, 30 N Gould St, Ste R, Sheridan, Wyoming, 82801, United States.
      </p>

      <p>
         3. If your Country of Residence is outside of the United States, you are contracting with Trust My Pet Sitter.com, a company incorporated and registered in England and Wales with company number 10969708, whose registered office is International House, 142 Cromwell Rd, Kensington, London, SW7 4EF, England.
      </p>

      <p>
         4. If you change your Country of Residence, the Trust My Pet Sitter company you contract with will be determined by your new Country of Residence as specified above, from the date on which your Country of Residence changes.
      </p>

      <h2>Information about you</h2>

      <p>
         1. Your privacy is important to us. You should read our Privacy Policy to understand how we collect, use and share information about you.
      </p>

      <h2>Setting up an account</h2>

      <p>
         1. In order to access our Service and use certain features and areas of the Service, you must register with us and set up an account with an ID and password or by connecting your Facebook or other social media account to the Service as made available from time to time (your "Account"). We encourage you to use strong passwords with your Account.
      </p>

      <p>
         2. You must be 18 years or older and capable in your country of residence of entering into a legally binding agreement to use our Service.
      </p>

      <p>
         3. You are responsible for maintaining the confidentiality of your login details and any activities that occur under your Account. If you have any concerns that your Account may have been misused, you should contact us at <span className={css.datecolor}>team@trustmypetsitter.com</span> straight away to let us know.
      </p>

      <h2>Your Content</h2>

      <p>
         1. You confirm that any images, text or information that you make available or create ("User Content") whilst using the Service will meet the Rules of Acceptable Use.
      </p>

      <p>
         2. We do not claim ownership of your User Content. Instead, you grant us a perpetual, irrevocable, worldwide, non-exclusive, royalty-free licence to use, copy, reproduce and make available the User Content anywhere and in any form for the purposes of providing our Service (including allowing our users to view and use your User Content).
      </p>

      <p>
         3. We will also occasionally publish media, including but not limited to images and video, contained in your User Content in the context of sharing media updates of Pets on our website, mobile application and across third party social media applications. If you object to our use of the media contained in your User Content in this way, please contact us as <span className={css.datecolor}>team@trustmypetsitter.com</span> and we will remove them.
      </p>

      <p>
         4. Our right to use your User Content does not in any way affect your privacy rights and we will only use information that identifies you as set out in our Privacy Policy.
      </p>

      <p>
         5. We do not check or moderate any User Content before it is added to the Service by users. We may later check, moderate, reject, refuse or delete any User Content if anybody objects to it, or we think that it breaks any of the Rules of Acceptable Use.
      </p>

      <h2>Fees and payments</h2>

      <p>
         1. Pet Sitters may set the price of their Pet Sitter Services ("Booking Fee's") within the parameters permitted by the Service. A fee equal to 20% of the Booking Fee (the "Sitter Service Fee") will be subtracted from the Booking Fee before payment to the Pet Sitter. Pet Owners pay the amount requested by the Pet Sitter, plus 10% Service Fee. Pet Services are charged a fee equal to 10% of the Booking Fee (the "Services Service Fee") will be subtraced from the Booking Fee before payment to the Pet Service Provider.
      </p>

      <p>
         2. Trust My Pet Sitter will facilitate the payment of the Booking Fee (less any Service Fee or Sitter Service Fee) from the Pet Owner to the Pet Sitter. Such transfer will generally occur 2-3 business days following completion of the relevant Pet Sitter and/or Service.
      </p>

      <p>
         3. If Trust My Pet Sitter is unable to collect a payment from a Pet Owner for a specific booking, for reasons such as insufficient funds, suspicion of fraud or violation of our terms, we do not have to make a payment to a Pet Sitter (referred to in section 8.2).
      </p>

      <p>
         4. Where a Pet Owner has obtained a refund in relation to their first booking in accordance with section 13.1, Pet Sitters agree that Trust My Pet Sitter will only pay the Pet Sitter up to the Minimum Unit Value based on the relevant Pet Sitter Services (the "Minimum Unit Value"being as follows: 1 night for Pet Sitting).
      </p>

      <p>
         5. Pet Sitters and Pet Owners agree that all bookings (including, for the avoidance of doubt, new and repeat bookings) with a Pet Owner / Pet Sitter where the Pet Owner / Pet Sitter first contacted the Pet Owner / Pet Sitter via the Service ("Initial Contact"), must be made via the Service. Where an Initial Contact has been made, if a Pet Sitter confirms or proceeds with a booking with a Pet Owner outside of the Service, the Pet Sitter must pay an introduction fee of £500 per Pet Owner to TrustMyPetSitter.com.
      </p>

      <h2>Your right to use the Service</h2>

      <p>
         1. The materials and content comprising the Service (excluding User Content) belongs to us or our third-party licensors and we give you permission to use these materials and content for the sole purpose of using the Service in accordance with these Terms of Service.
      </p>

      <p>
         2. Your right to use the Service is personal to you and you are not allowed to give this right to another person or to sell, gift or transfer your Account to another person. Your right to use the Service does not stop us from giving other people the right to use the Service.
      </p>

      <p>
         3. Other than as allowed in these Terms of Service you are not given a right to use the Trust My Pet Sitter name, or any of the Trust My Pet Sitter trademarks, logos, domain names and other distinctive brand features.
      </p>

      <p>
         4. Unless allowed by these Terms of Service and as permitted by the functionality of the Service, <strong>you agree:</strong>
      </p>

      <ul className={css.termsul}>
        <li className={css.termsli}>not to copy any portion of our Service;</li>
        <li className={css.termsli}>not to give or sell or otherwise make available any portion of our Service to anybody else;</li>
        <li className={css.termsli}>not to change our Service in any way;</li>
        <li className={css.termsli}>not to look for or access the code of our Service that we have not expressly published publicly for general use.</li>
        <li className={css.termsli}>You agree that you have no rights in or to any portion of the Service other than the right to use them in accordance with these Terms of Service.</li>
      </ul>

      <h2>Rules of Acceptable Use</h2>

      <p>
         1. In addition to the other requirements within these Terms of Service, this section describes specific rules that apply to your use of the Service (the "Rules of Acceptable Use").
      </p>

      <p>
         2. When using the Service <strong>you must not</strong>:
      </p>

      <ul className={css.termsul}>
        <li className={css.termsli}>circumvent, disable or otherwise interfere with any security related features of the Service or features that prevent or restrict use or copying of the content accessible via the Service;</li>
        <li className={css.termsli}>impersonate any person, or misrepresent your identity or affiliation with any person or give the impression they are linked to Trust My Pet Sitter, if this is not the case</li>
        <li className={css.termsli}>use the Service other than for its intended purpose as set out in these Terms of Service or if we have suspended or banned you from using it;</li>
        <li className={css.termsli}>send junk, spam or repetitive messages, advocate, promote or engage in any illegal or unlawful conduct (including fraud or the sale of counterfeit or stolen items) or conduct that causes damage or injury to any person or property;</li>
        <li className={css.termsli}>modify, interfere, intercept, disrupt or hack the Service or collect any data from the Service other than in accordance with these Terms of Service;</li>
        <li className={css.termsli}>misuse the Service by knowingly introducing viruses, Trojans, worms, logic bombs or other material which would harm the Service or any user of the Service's own equipment;</li>
        <li className={css.termsli}>submit or contribute any User Content that contains nudity or violence or is abusive, threatening, obscene, misleading, untrue, inaccurate or offensive;</li>
        <li className={css.termsli}>submit or contribute any User Content without the permission of the content owner or otherwise infringe the copyright, trademark or other rights of third parties;</li>
        <li className={css.termsli}>use any User Content in violation of any licensing terms specified by the owner;</li>
        <li className={css.termsli}>submit or contribute any information or commentary about another person without that person's permission;</li>
        <li className={css.termsli}>threaten, abuse or invade another's privacy, or cause annoyance, inconvenience or needless anxiety or be likely to harass, upset, embarrass, alarm or annoy any other person in particular any Trust My Pet Sitter staff member; or</li>
        <li className={css.termsli}>use any automated system, including without limitation "robots", "spiders" or "offline readers" to access the Service in a manner that send more request messages to the Service than a human can reasonably produce in the same period.</li>
        <li className={css.termsli}>Failure to comply with the Rules of Acceptable Use constitutes a serious breach of these Terms of Service, and may result in our taking all or any of the following actions (with or without notice):</li>
        <li className={css.termsli}>immediate, temporary or permanent withdrawal of your right to use our Service;</li>
        <li className={css.termsli}>immediate, temporary or permanent removal of any User Content;</li>
        <li className={css.termsli}>issuing of a warning to you;</li>
        <li className={css.termsli}>legal action against you including proceedings for reimbursement of all costs (including, but not limited to, reasonable administrative and legal costs) resulting from the breach;</li>
        <li className={css.termsli}>disclosure of such information to law enforcement authorities as we reasonably feel is necessary.</li>
        <li className={css.termsli}>The responses described in this clause 10.3 are not limited, and we may take any other action we reasonably deem appropriate.</li>
        <li className={css.termsli}>Notice and takedown policy.</li>
        <li className={css.termsli}>Any person may contact us by sending us an "Infringement Notice" if any content available through our Service infringes their rights or fails to comply with our Rules of Acceptable Use. The Infringement Notice should be sent by email to <span className={css.datecolor}>team@trustmypetsitter.com</span>. Please provide the information described below in the Infringement Notice.</li>
        <li className={css.termsli}>If you are contacting us please send name and contact details; a statement explaining in enough detail why you consider that the content available through our Service infringes your rights or fails to comply with our Rules of Acceptable Use; a link to or such other means of identifying the problematic content.</li>
      </ul>

      <h2>Pet Owner and Pet Sitter obligations</h2>

      <p>
         1. You shall abide by any agreement reached between you and the Pet Sitter including the cancellation policy selected by the Pet Sitter.
      </p>

      <p>
         2. You shall provide all relevant information to any Pet Sitter you are dealing with including, but not limited to, <strong>the following:</strong>
      </p>

      <ul className={css.termsul}>
        <li className={css.termsli}>Medical conditions or nutritional needs of your Pet; and</li>
        <li className={css.termsli}>Unusual behavioural or similar issues including details of previous incidents of behaviour which is unusual or dangerous (including urinating or defecating indoors).</li>
        <li className={css.termsli}>You must allow the Pet Sitter at their request to visit and/or inspect your Pet before commencing their Pet Sitter Services.</li>
        <li className={css.termsli}>Your Pet is not subject to any control order or of a breed subject to the Dangerous Pets Act 1991 or any other equivalent legislation and that you are in compliance with any other applicable law or regulation.</li>
        <li className={css.termsli}>You shall ensure that your Pet is of good health, has been vaccinated and that all precautions for flea, parasite and other transmittable diseases have been taken.</li>
        <li className={css.termsli}>If you do not return to collect your Pet from the Pet Sitter at the end of the Pet Sitter Services or if you did not provide the Pet Sitter with the necessary details to allow them to perform the Pet Sitter Services, then the Pet Sitter shall be entitled to place your Pet into alternative accommodation. You will be fully responsible for the costs of any such arrangements.</li>
      </ul>

      <strong>To arrange and pay for bookings in accordance with the following:</strong>

      <p>
         1. where you send a direct booking request to a Pet Sitter, a hold will be placed on your credit or debit card; if the Pet Sitter accepts within 24 hours, the booking is confirmed,and you will be charged the funds. If the booking is not accepted by the Pet Sitter within 24 hours (or, where the Pet Sitter responds with a message to the Pet Owner within 24 hours but does not accept the booking request, within 6 days), the direct booking request will expire and the hold on your credit or debit card will be released (or, in the case of any payment using a bank transfer, the funds are transferred and refunded with the same execution date.).
      </p>

      <p>
         2. where you send an enquiry or message to a Pet Sitter without using a credit or debit card and the Pet Sitter confirms their availability, you will be prompted to log in, confirm and pay for the booking using your credit or debit card or via bank transfer or any other payment method we make available from time to time. In this case, you agree to pay for the booking within 48 hours of the Pet Sitter confirming their availability. If you do not pay for the booking within 48 hours of the Pet Sitter confirming their availability, Trust My Pet Sitter retains the right to cancel the booking.
      </p>

      <strong>Once a booking has been confirmed (by either the Pet Owner or Pet Sitter):</strong>

      <p>
         3. You will be available to communicate with the Pet Sitter and respond promptly to the Pet Sitter's queries relating to the Pet Sitter Services in order to allow for the smooth execution of the Pet Sitter Services.
      </p>

      <p>
         4. You will provide the Pet Sitter with an alternative contact and details of your Pet's veterinarian in case of an emergency.
      </p>

      <p>
         5.  If the Pet Sitter Services are no longer required, you may cancel the booking (using the cancellation function on our website or mobile application only) up to 48 hours preceding the start date of the Pet Sitter Services. The cancellation fee payable will depend on the cancellation policy of the Pet Sitter which you explicitly agree to when paying for the booking.
      </p>

      <strong>If you are a Pet Sitter, you agree to the following in respect of any Pet Sitter Services you supply:</strong>

      <p>
         6. You will provide the Pet Sitter with an alternative contact and details of your Pet's veterinarian in case of an emergency.
      </p>

      <p>
         7. Pet Sitter Services shall be in accordance with applicable law (including applicable tax regulations, Pet regulations and that any required licenses are obtained) and with any agreement reached between you and the Pet Owner.
      </p>

      <p>
         8. You shall keep a register containing a description of any Pets received into your care, date of arrival and departure, and the name and address of the Pet Owner.
      </p>

      <p>
         9. You shall keep all Pets on a lead in public areas unless in a zone where specifically permitted to walk Pets off a lead.
      </p>

      <strong>To arrange for bookings in accordance with the following:</strong>

      <p>
      10. where a Pet Owner sends you a direct booking request, you will accept or decline the booking within 24 hours. If you do not accept the booking within 24 hours, the booking request will expire unless you have responded with a message within 24 hours, in which case the booking will expire after 6 days.
      </p>

      <p>
      11. where a Pet Owner sends you an enquiry or message, you will respond with your availability within 24 hours.
      </p>

      <strong>Once a booking has been confirmed (by either the Pet Owner or Pet Sitter):</strong>

      <p>
      12. You will be available to communicate with the Pet Owner and respond promptly to the Pet Owner's queries relating to the Pet Sitter Services in order to allow for the smooth execution of the Pet Sitter Services.
      </p>

      <p>
      13. You will be available for a "Meet and Greet" (as described in our guidelines made available in the Service from time to time) with the Pet Owner before commencement of the Pet Sitter Services.
      </p>

      <p>
      14. If the response or Meet and Greet obligations set out above are not adhered to, Trust My Pet Sitter may cancel the booking, fully refunding the Pet Owner regardless of the Pet Sitter's selected cancellation policy.
      </p>

      <p>
       15. You acknowledge that if you breach these Terms of Service or any agreement with a Pet Owner, Trust My Pet Sitter at its sole discretion may cancel the booking, fully refunding the Pet Owner regardless of the Pet Sitter's selected cancellation policy.
      </p>

      <p>
       16. If a situation arises in the course of the Pet Sitter Services where the Pet Owner's Pet requires emergency veterinary care, the Pet Sitter shall make reasonable efforts to inform the Pet Owner (or, where the Pet Owner is not available, the alternative contact provided by the Pet Owner) and Trust My Pet Sitter as soon as possible.
      </p>

      <h2>Booking Guarantees for Pet Owners</h2>

      <strong>If, in relation to a Pet Owner's first booking of Pet Sitter Services, the Pet Owner has any genuine concerns about the quality or suitability of the Pet Sitter or the Pet Sitter Services, they may request a refund from Trust My Pet Sitter("Refund Request"), regardless of the Pet Sitter's selected cancellation policy. Any Refund Request must be made in accordance with the following:</strong>

      <p>
         1. The Refund Request must be by email to Trust My Pet Sitter at <span className={css.datecolor}>team@trustmypetsitter.com</span> within 24 hours of commencement of the Pet Sitter Services (for the purposes of this clause Pet Sitter Services are considered to commence at 8am local time on the first day of the Pet Sitter Services).
      </p>

      <p>
         2. The Refund Request must include a detailed description, including photographic evidence if applicable.
      </p>

      <p>
         3. Following receipt of a Refund Request, Trust My Pet Sitter, in its sole discretion, will determine whether a refund will be paid to the Pet Owner. This review process may take up to 3 weeks. If a refund is to be paid, Trust My Pet Sitter will process the refund to your credit or debit card; it may take up to 10 days for the money to appear in your account.
      </p>

      <strong>If, at any point following confirmation of a booking or the Pet Sitter Services are in progress but not yet completed, the Pet Sitter cancels the booking, Trust My Pet Sitter shall:</strong>

      <p>
        4. Refund the Booking Fee and the Owner Service Fee to the Pet Owner in full; and
      </p>

      <p>
        5. If the booking is cancelled during, or within 10 days before the commencement of, the Pet Sitter Services, assist the Pet Owner in finding an alternative Pet Sitter and cover up to 25% of any price difference between the original cancelled booking and the alternative booking.
      </p>

      <strong>Emergency medical situations:</strong>

      <p>
        6. The Pet Sitter is required to make reasonable efforts to inform the Pet Owner (or, where the Pet Owner is not available, the alternative contact provided by the Pet Owner) and Trust My Pet Sitter as soon as possible where a situation has arisen where Pet requires emergency veterinary care. Where Trust My Pet Sitter has been informed by the Pet Sitter that such a situation has arisen, Trust My Pet Sitter shall also make reasonable efforts to contact the Pet Owner to notify them of the situation where the Pet Sitter has been unable to contact them.
      </p>     

      <p>
      7. If the Pet Owner cannot be reached following reasonable efforts, the Pet Owner authorises the Pet Sitter to seek care on their behalf to promptly treat the Pet Owner's Pet. The Pet Owner agrees that they will bear the full cost of any such emergency medical treatment and will reimburse the Pet Sitter where the Pet Sitter has paid for such emergency medical treatment accordingly. The Pet Owner may be able to have the cost of such emergency medical treatment reimbursed by Trust My Pet Sitter as described at clause 15 below.
      </p> 

      <strong>Insurance Coverage and Discretionary Reimbursement of Veterinary Fees:</strong>

      <p>
      8. All bookings made via the Service automatically include third party liability insurance ("Third Party Liability") for the benefit of Pet Owners at no extra cost. Pet Sitters acknowledge they are not third party beneficiaries of the Third Party Liability.
      </p> 

      <p>
      9. Where you have your own insurance, the Third Party Liability will only be available where you have sought reimbursement under your own insurance and reimbursement was denied or to the extent that the reimbursement does not cover all of your costs. We may request any documentation regarding insurance claims made by you to your own insurance provider.
      </p> 

      <p>
      10. In the event that you incur any veterinary fees in the course of providing your Pet Sitter Services, arising out of an incident that has occurred during and in connection with the Pet Sitter Services, we may, at our discretion, reimburse you for such veterinary fees up to a maximum of £2,000 per Pet per booking (Veterinary Reimbursement).
      </p>

      <p>
      11. Nothing in this clause 15 limits any liability the Pet Sitter owes to the Pet Owner or Trust My Pet Sitter in connection with the Pet Sitter Services.
      </p>

      <strong>Third Party Liability:</strong>

      <p>
      12. Third Party Liability provides you with protection against liability, up to a maximum of €2,000,000, for another party's claims for damage to their property or for bodily injury arising out of an incident that has occurred during and in connection with the Pet Sitter Services, for example, where the Pet has bitten a pedestrian. There's a standard excess of £50 on each claim made.
      </p>

      <strong>Third Party Liability does not cover the following:</strong>

      <p>
      13. Damage incurred to a Pet Sitter's (or any person related to the Pet Sitter) property;
      </p>

      <p>
      14. Claims relating to services not falling within the Pet Sitter Services as agreed between the Pet Owner and Pet Sitter;
      </p>

      <p>
       15. Claims relating to the sale or supply of any products;
      </p>

      <p>
       16. Claims relating to any Meet and Greet before the Pet Sitter Services commence;
      </p>

      <p>
       17. Claims relating to an incident where the Pet Owner's Pet was off the lead in a public space, except in zones where specifically permitted to walk Pets off a lead;
      </p>

      <p>
       18. The medical expenses of the Pet Sitter or anyone related to the Pet Sitter;
      </p>

      <p>
       19. Claims relating to an incident where the Pet Owner's Pet is not compliant with legislation, licences or other legal requirements relating to the regulation of dangerous Pets;
      </p>

      <p>
       20. Claims relating to an incident outside of the Pet Owner and Pet Sitter's control including without limitation a natural disaster, terrorist attack, fire, explosion or other accident;
      </p>

      <p>
      21. Claims relating to an incident where the Pet Sitter Services are not provided in accordance with applicable Pet boarding regulations or any required licenses;
      </p>

      <p>
      22. Indirect, incidental, special or consequential damages including but not limited to emotional damage;
      </p>

      <strong>In order to qualify for Third Party Liability, you must comply with all obligations set out in these Terms of Service and in addition:</strong>

      <p>
      23. We must be informed of the incident within 24 hours of it occurring; and
      </p>

      <p>
      24. The Pet Sitter must collect all information from the relevant third party such as their name, address, telephone number and a summary of the incident (including timings and names of witnesses) and relay this information to us in full.
      </p>

      <p>
      25. Where you have complied with these Terms of Service and wish to make a claim for Third Party Liability, we will submit the claim to our insurance provider who will deal with you directly. This will usually take around 5 to 10 weeks.
      </p>

      <strong>Veterinary Reimbursement may cover veterinary fees incurred in respect of the following:</strong>

      <p>
      26. Emergency visits to a veterinarian during a Pet Sitter Services;
      </p>

      <p>
       27. A follow-up visit to a veterinarian after the Pet Sitter Services within 7 days of the date of the initial Emergency visit (only as a follow-up from an initial Emergency visit which occurred during the Pet Sitter Services);.
      </p>
      
      <p>
       28. Cost of medicine and/or some surgeries performed (as prescribed in relation to the Emergency which occurred during the Pet Sitter Services).
      </p>

      <strong>Veterinary Reimbursement will not, however, cover veterinary fees incurred in respect of any of the following:</strong>

      <p>
      29. ehabilitation treatment or other post-emergency treatment (for example follow-up visits after a surgery);
      </p>

      <p>
      30. treatments for the Pet Sitter's own pets;
      </p>

      <p>
      31. pre-existing conditions, conditions related to pregnancy, pathology or congenital disorder (such us epilepsy, heart problems or cancer) or conditions caused by old age;
      </p>

      <p>
      32. kennel cough or any other diseases that the Pet Owner should have their Pet vaccinated or protected against (including fleas, ticks, leishmania, parasites); and
      </p>

      <p>
      33. claims relating to any Meet and Greet before the Pet Sitter Services commence;
      </p>

      <p>
      34. claims relating to any Pet not related to a Pet Sitter Services.
      </p>

      <strong>In order to qualify for Veterinary Reimbursement, you must comply with all obligations set out in these Terms of Service and in addition:</strong>

      <p>
      35. we must be informed us of the incident within 24 hours of it occurring or within 24 hours of returning to your home and pet after care from the Pet Sitter; and
      </p>

      <p>
      36. must provide us with written and signed documentation from a veterinarian in good standing detailing their fees and the amount paid or to be paid and a report detailing the treatment. We may request additional veterinarian records for the Pet Owner's Pet in order to validate any claims.
      </p>

      <p>
      37. Qualifying for Veterinary Reimbursement does not, however, entitle you to receive Veterinary Reimbursement, as we may offer or withhold Veterinary Reimbursement entirely at our discretion. Where you have complied with these Terms of Service and wish to request Veterinary Reimbursement, we will inform you if we will reimburse you for any veterinary fees within 2 weeks.
      </p>

      <strong>Advertisements on the Service</strong>

      <p>
      38. We and our selected business partners may provide advertising to you through the Service or by other methods such as email. This advertising may be based on your User Content or other information available through the Service. When delivering advertising we will only use information that identifies you as set out in our Privacy Policy.
      </p>

      <h2>Ending our relationship</h2>

      <p>1. If at any time you do not feel that you can agree to these Terms of Service or any changes made to the Terms of Service or the Service, you must immediately stop using the Service.</p>
      <p>2. If you wish to end your use of the Service, you may deactivate your account using the "Close Account" section of your account. Alternatively, you may send an email to <span className={css.datecolor}>team@trustmypetsitter.com</span> and we will deactivate your account. If you deactivate your account, you will not be able to access the account or data previously stored in the account. For information on our retention of this data, please refer to our Privacy Policy</p>
      <p>3. We may immediately end your use of the Service if you break the Rules of Acceptable Use, any other important rule(s), or terms and conditions we set for accessing and using the Service including these Terms of Service.</p>
      <p>4. We may also withdraw the Service as long as we give you reasonable notice that we plan to do this so that you have a reasonable period of time to download any of your User Content.</p>
      <p>5. If you or we end your use of the Service or we withdraw the Service as described in this section, we may delete or modify your User Content, account or any other information we hold about you. You will also lose any rights you have to use the Service or access our content or your User Content. We will not offer you compensation for any losses.</p>
      <p>6. The termination of your use of the Service and the cancellation of your Account shall not affect any of your outstanding obligations to us (including obligation to pay any sums to us), or to any Pet Owner or Pet Sitter pursuant to any agreement with that Pet Owner or Pet Sitter.</p>

      <h2>Liability</h2>

      <p>1. You acknowledge that Trust My Pet Sitter is not a party to any agreement between Pet Owners and Pet Sitters. Accordingly, Trust My Pet Sitter will not be liable for any breach of a contract between Pet Owners and Pet Sitters. For the avoidance of doubt, the Pet Sitter is solely responsible for carrying out the Pet Sitting Services. Trust My Pet Sitter assumes no liability for any loss or damage suffered by a Pet Owner, including harm caused to their Pet, which is caused by the Pet Sitter's action or inaction.</p>
      <p>2. Pet Sitters agree and accept liability for any loss or damage we may suffer in respect of any breach by Pet Sitters of these Terms of Service or any agreement with Pet Owners.</p>
      <p>3. Pet Sitters agree to indemnify us for any loss or damage we may suffer as a result of any Pet Owner bringing any claim against us or taking any action against us as a result of any breach by Pet Sitters of these Terms of Service or any agreement with Pet Owners.</p>
      <p>4. Pet Owners agree to indemnify us for any loss or damage we may suffer as a result of any claim or action brought against us as a result of any breach by Pet Owner of these Terms of Service or any agreement with Pet Owners.</p>
      <p>5. Our Service makes available third party content such as User Content. As we do not produce such third party content, we cannot be responsible for it in any way. In particular, we cannot verify any claims made by a Pet Owner or Pet Sitter.</p>
      <p>6. We will use reasonable endeavours to ensure that the Service is reasonably available during normal business hours.</p>
      <p>7. Unfortunately, due to the nature of the Internet and technology, the Service (save as set out in clause 20.1 above) is provided on an "as available" and "as is" basis. This means that we are unable to promise that your use of the Service will be uninterrupted, without delays, error-free or meet your expectations and we do not give any commitment relating to the performance or availability of the Service in these Terms of Service and, to the extent we are able to do so, we exclude any commitments that may be implied by law.</p>
      <p>8. In the event of a claim arising out of the provision of our Service, our responsibility to you will never be more than the total amount you have paid us or two thousand British pounds (£2,000).</p>
      <p>9. In every case, we will never be responsible for any loss or damage that is not reasonably foreseeable.</p>

      <h2>Resolving disputes</h2>

      <p>1. If you have a dispute with us relating to the Service, in the first instance please contact us at <span className={css.datecolor}>team@trustmypetsitter.com</span> and attempt to resolve the dispute with us informally. In the unlikely event that we are not able to resolve a dispute informally, we will discuss and agree with you the most effective way of resolving the dispute.</p>
      <p>2. If you have a dispute with another person who has registered with our Service in connection with the Service, we will provide reasonable assistance to resolve such disputes informally. For the avoidance of doubt, we are under no obligation to resolve such a dispute to the satisfaction of both parties.</p>
    
      <h2>Changes to the Service</h2>

      <p>1. We are constantly updating and improving the Service to try and find ways to provide you with new and innovative features and services. Improvements and updates are also made to reflect changing technologies, tastes, behaviours and the way people use the Internet and our Service.</p>
      <p>2. In order to do this, we may need to update, reset, stop offering and/or supporting a particular part of the Service, or feature relating to the Service ("changes to the Service"). These changes to the Service may affect your past activities on the Service, features that you use, your Profile and your User Content ("Service elements"). Any changes to the Service could involve your Service elements being deleted or reset.</p>
      <p>3. You agree that a key characteristic of our Service is that changes to the Service will take place over time and this is an important basis on which we grant you access to the Service. Once we have made changes to the Service, your continued use of the Service will show that you have accepted any changes to the Service. You are always free to stop using the Service or deactivate your Account in the settings feature of the Service.</p>
      <p>4. We will try, where possible and reasonable, to contact you to let you know about any significant changes to the Service.</p>

      <h2>Changes to the documents</h2>

      <p>1. We may revise these Terms of Service from time to time and the most current version will always be at www.trustmypetsitter.com</p>
      <p>2. Changes will usually occur because of new features being added to the Service, changes in the law or where we need to clarify our position on something.</p>
      <p>3. We will try, where possible and reasonable, to contact you to let you know about any significant changes to any of the documents referred to in these Terms of Service. We may contact you through the Service (for example by asking you to accept the changes before you continue to use the Service) or via a separate email.</p>
      <p>4. Normally, we will try to give you some warning before the new terms become effective. However, sometimes changes will need to be made immediately and if this happens we will not give you any notice.</p>

      <h2>Documents that apply to our relationship with you</h2>

      <p>1. The current version of the Terms of Service contains the only terms and conditions that apply to our relationship with you. Older versions of the Terms of Service will no longer apply to our relationship and will be completely replaced by the current version.</p>
      <p>2. We intend to rely on these Terms of Service as setting out the written terms of our agreement with you for the provision of the Service. If part of the Terms of Service cannot be enforced then the remainder of the Terms of Service will still apply to our relationship.</p>
      <p>3. If you do not comply with these Terms of Service and we do not take action immediately, this does not mean we have given up any right we have and we may still take action in the future.</p>

      <h2>Severability</h2>

      <p>1. If any provision of these Terms of Service is judged to be illegal or unenforceable, this will not affect the continuation in full force and effect of the remainder of the provisions.</p>

      <h2>Contact, feedback and complaints</h2>

      <p>1. If you need to contact us in relation to these Terms of Service or any other document mentioned in them, please email us at <span className={css.datecolor}>team@trustmypetsitter.com</span>.</p>

      <p>2. We value hearing from our users and are always interested in learning about ways we can improve the Service. By providing your feedback you agree that you are giving up any rights you have in your feedback so that we may use and allow others to use it without any restriction and without any payment to you.</p>

    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
