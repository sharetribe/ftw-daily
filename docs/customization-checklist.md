# Customization checklist

Some generic things to update and check when starting to customize the template.

- [Marketplace colors](styling.md)
- [Generate app icons](icons.md)
- [Update translations](../src/translations/en.json) or [change the language](translations.md)
- [LandingPage](../src/containers/LandingPage/LandingPage.js): update and create branded sections
- [Footer](../src/components/Footer/Footer.js)
- [AboutPage](../src/containers/AboutPage/AboutPage.js)
- [Terms of Service](terms-of-service-and-privacy-policy.md#terms-of-service)
- [Privacy Policy](terms-of-service-and-privacy-policy.md#privacy-policy)
- [Social media sharing graphics](../src/components/Page/Page.js);
- [Logo](../src/components/Logo/Logo.js) Change and check that it works on Topbar, Footer, and
  CheckoutPage
- [Default background image](../src/assets/background-1440.jpg)
- [Maps Marker icon](../src/components/Map/images/marker-32x32.png)
- [Config: update environment variables](../src/config.js)
- [Config: siteTitle](../src/config.js) for page schema (SEO)
- [Config: marketplace address](../src/config.js): contact details also improve SEO
- [Config: social media pages](../src/config.js)
- [Marketplace custom config](../src/marketplace-custom-config.js)
- Update [ListingPage](../src/containers/ListingPage/ListingPage.js) to show extended data (aka
  publicData attribute)
- Update [EditListingWizard](../src/components/EditListingWizard/EditListingWizard.js) and panels to
  add extended data
- Update [SearchPage](../src/containers/SearchPage/SearchPage.js) to filter with extended data
- Update [routeConfiguration](../src/routeConfiguration.js) if needed
- Update [Email templates](../ext/default-mail-templates), all of them: .html, subject.txt, and
  text.txt
- Update [config: bookingUnitType](../src/config.js) if needed
- If `line-item/units` is used, add quantity handling to
  [BookingDatesForm](../src/forms/BookingDatesForm/BookingDatesForm.js),
  [ListingPage](../src/containers/ListingPage/ListingPage.js),
  [CheckoutPage](../src/containers/CheckoutPage/CheckoutPage.js)

## What else

- Do you need more [static pages](static-pages.md)?
- Changes to existing pages
- Changes to transaction process (API + Web app)
