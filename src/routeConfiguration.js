import React from 'react';
import {
  YotiPage,
  QuestionPage,
  HowItWorksPage,
  ContactPage,
  FaqPage,
  PetSittersPage,
  PetOwnersPage,
  PetServicesPage,
  AboutPage,
  AuthenticationPage,
  CheckoutPage,
  FeaturedOne,
  ContactDetailsPage,
  EditListingPage,
  EmailVerificationPage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  NotFoundPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  PayoutPreferencesPage,
  PrivacyPolicyPage,
  ProfilePage,
  ProfileSettingsPage,
  SearchPage,
  StyleguidePage,
  TermsOfServicePage,
  TransactionPage,
  OrderTypesPage,
  PresskitPage,
  HelpCenter,
  PawSquadPage,
  PaymentServicePage,
  PaymentSitterPage,
  PaymentOwnerPage,
  PaymentAffiliatePage,
  PetOwnerQuestions,
  PetServicesQuestions,
  GeneralQuestionsPage,
  MembershipPage,
  DogSitting,
  CatSitting,
  HouseSittersUk,
  PetSittersUk,
  AboutUsPage,
  AffiliatePage,
  CrowdFundingPage,
  PetServiceExplainer,
  WeVetPage,
  GuaranteePage,
  SuperHogPage,
  WhyPetOwnersPage,
} from './containers';

// routeConfiguration needs to initialize containers first
// Otherwise, components will import form container eventually and
// at that point css bundling / imports will happen in wrong order.
import { NamedRedirect } from './components';

export const ACCOUNT_SETTINGS_PAGES = [
  'ContactDetailsPage',
  'PasswordChangePage',
  'PayoutPreferencesPage',
];

// https://en.wikipedia.org/wiki/Universally_unique_identifier#Nil_UUID
const draftId = '00000000-0000-0000-0000-000000000000';
const draftSlug = 'draft';

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
const routeConfiguration = () => {
  return [
    {
      path: '/yoti',
      name: 'YotiPage',
      component: YotiPage,
    },
    {
      path: '/pet-sitters-uk',
      name: 'PetSittersUk',
      component: PetSittersUk,
    },
    {
      path: '/house-sitters-uk',
      name: 'HouseSittersUk',
      component: HouseSittersUk,
    },
    {
      path: '/dog-sitting',
      name: 'DogSitting',
      component: DogSitting,
    },
    {
      path: '/cat-sitting',
      name: 'CatSitting',
      component: CatSitting,
    },
    {
      path: '/pet-sitter-questions/:id',
      name: 'QuestionPage',
      component: QuestionPage,
    },
    {
      path: '/general/:id',
      name: 'GeneralQuestionsPage',
      component: GeneralQuestionsPage,
    },
    {
      path: '/howitworks',
      name: 'HowItWorksPage',
      component: HowItWorksPage,
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage,
    },
    {
      path: '/petservices',
      name: 'PetServiceExplainer',
      component: PetServiceExplainer,
    },
    {
      path: '/about',
      name: 'WeVetPage',
      component: WeVetPage,
    },
    {
      path: '/guarantee',
      name: 'GuaranteePage',
      component: GuaranteePage,
    },
    {
      path: '/faq',
      name: 'FaqPage',
      component: FaqPage,
    },
    {
      path: '/helpcenter',
      name: 'HelpCenter',
      component: HelpCenter,
    },
    {
      path: '/affiliate',
      name: 'AffiliatePage',
      component: AffiliatePage,
    },
    {
      path: '/crowdtest',
      name: 'CrowdFundingPage',
      component: CrowdFundingPage,
    },
    {
      path: '/virtualvet',
      name: 'PawSquadPage',
      component: PawSquadPage,
    },
    {
      path: '/superhog',
      name: 'SuperHogPage',
      component: SuperHogPage,
    },
    {
      path: '/payment-service',
      name: 'PaymentServicePage',
      auth: true,
      component: PaymentServicePage,
    },
    {
      path: '/payment-sitter',
      name: 'PaymentSitterPage',
      auth: true,
      component: PaymentSitterPage,
    },
    {
      path: '/payment-owner',
      name: 'PaymentOwnerPage',
      auth: true,
      component: PaymentOwnerPage,
    },
    {
      path: '/payment-success',
      name: 'PaymentAffiliatePage',
      component: PaymentAffiliatePage,
    },
    {
      path: '/pet-sitter-faq',
      name: 'PetSittersPage',
      component: PetSittersPage,
    },
    {
      path: '/pet-services-faq',
      name: 'PetServicesPage',
      component: PetServicesPage,
    },
    {
      path: '/pet-service-questions/:id',
      name: 'PetServicesQuestions',
      component: PetServicesQuestions,
    },
    {
      path: '/pet-owner-questions/:id',
      name: 'PetOwnerQuestions',
      component: PetOwnerQuestions,
    },
    {
      path: '/pet-owner-faq',
      name: 'PetOwnersPage',
      component: PetOwnersPage,
    },
    {
      path: '/aboutus',
      name: 'AboutUsPage',
      component: AboutUsPage,
    },
    {
      path: '/press-private',
      name: 'PresskitPage',
      component: PresskitPage,
    },
    {
      path: '/',
      name: 'LandingPage',
      component: props => <LandingPage {...props} />,
    },
    {
      path: '/membership',
      name: 'MembershipPage',
      component: MembershipPage,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/s',
      name: 'SearchPage',
      auth: true,
      component: props => <SearchPage {...props} />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/filters',
      name: 'SearchFiltersPage',
      auth: true,
      component: props => <SearchPage {...props} tab="filters" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/reasons-hesitant-hire-professional-pet-sitter',
      name: 'WhyPetOwnersPage',
      component: WhyPetOwnersPage,
    },
    {
      path: '/s/listings',
      name: 'SearchListingsPage',
      auth: true,
      component: props => <SearchPage {...props} tab="listings" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s?pub_user_type=1',
      name: 'SearchPetSitter',
      component: props => <SearchPage {...props} tab="listings" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s?pub_user_type=0',
      name: 'SearchPetOwner',
      component: props => <SearchPage {...props} tab="listings" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/map',
      name: 'SearchMapPage',
      auth: true,
      component: props => <SearchPage {...props} tab="map" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/l',
      name: 'ListingBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/l/:slug/:id',
      name: 'ListingPage',
      auth: true,
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/checkout',
      name: 'CheckoutPage',
      auth: true,
      component: props => <CheckoutPage {...props} />,
      setInitialValues: CheckoutPage.setInitialValues,
    },
    {
      path: '/l/:slug/:id/:variant',
      name: 'ListingPageVariant',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/new',
      name: 'NewListingPage',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description' }}
        />
      ),
    },
    {
      path: '/l/new',
      name: 'NewListingPage-owner',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage_category"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description_owner' }}
        />
      ),
    },
    {
      path: '/l/new',
      name: 'NewListingPage-sitter',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage_category"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description_sitter' }}
        />
      ),
    },
    {
      path: '/l/new',
      name: 'NewListingPage-service',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage_category"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description_service' }}
        />
      ),
    },
    {
      path: '/l/:slug/:id/:type/:tab',
      name: 'EditListingPage',
      auth: true,
      component: props => <EditListingPage {...props} />,
      loadData: EditListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/:type/:tab',
      name: 'EditListingPage_category',
      auth: true,
      component: props => <EditListingPage {...props} />,
      loadData: EditListingPage.loadData,
    },

    // Canonical path should be after the `/l/new` path since they
    // conflict and `new` is not a valid listing UUID.
    {
      path: '/l/:id',
      name: 'ListingPageCanonical',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/u',
      name: 'ProfileBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/u/:id',
      name: 'ProfilePage',
      component: props => <ProfilePage {...props} />,
      loadData: ProfilePage.loadData,
    },
    {
      path: '/profile-settings',
      name: 'ProfileSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ProfileSettingsPage {...props} />,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: props => <AuthenticationPage {...props} tab="login" />,
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: props => <AuthenticationPage {...props} tab="signup" />,
    },
    {
      path: '/recover-password',
      name: 'PasswordRecoveryPage',
      component: props => <PasswordRecoveryPage {...props} />,
    },
    {
      path: '/inbox',
      name: 'InboxBasePage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />,
    },
    {
      path: '/inbox/:tab',
      name: 'InboxPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <InboxPage {...props} />,
      loadData: InboxPage.loadData,
    },
    {
      path: '/order/:id',
      name: 'OrderPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="OrderDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/order/:id/details',
      name: 'OrderDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="customer" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'customer' }),
      setInitialValues: TransactionPage.setInitialValues,
    },
    {
      path: '/sale/:id',
      name: 'SalePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="SaleDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/sale/:id/details',
      name: 'SaleDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="provider" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'provider' }),
    },
    {
      path: '/listings',
      name: 'ManageListingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ManageListingsPage {...props} />,
      loadData: ManageListingsPage.loadData,
    },
    {
      path: '/account',
      name: 'AccountSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="ContactDetailsPage" />,
    },
    {
      path: '/account/contact-details',
      name: 'ContactDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ContactDetailsPage {...props} />,
      loadData: ContactDetailsPage.loadData,
    },
    {
      path: '/account/change-password',
      name: 'PasswordChangePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PasswordChangePage {...props} />,
    },
    {
      path: '/account/payments',
      name: 'PayoutPreferencesPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PayoutPreferencesPage {...props} />,
      loadData: PayoutPreferencesPage.loadData,
    },
    {
      path: '/terms-of-service',
      name: 'TermsOfServicePage',
      component: props => <TermsOfServicePage {...props} />,
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicyPage',
      component: props => <PrivacyPolicyPage {...props} />,
    },
    {
      path: '/styleguide',
      name: 'Styleguide',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/g/:group',
      name: 'StyleguideGroup',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component',
      name: 'StyleguideComponent',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example',
      name: 'StyleguideComponentExample',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example/raw',
      name: 'StyleguideComponentExampleRaw',
      component: props => <StyleguidePage raw {...props} />,
    },
    {
      path: '/notfound',
      name: 'NotFoundPage',
      component: props => <NotFoundPage {...props} />,
    },
    {
      path: '/yoti-verified',
      name: 'ProfileSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="ProfileSettingsPage" {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /reset-password endpoint
    {
      path: '/reset-password',
      name: 'PasswordResetPage',
      component: props => <PasswordResetPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /verify-email endpoint
    {
      path: '/verify-email',
      name: 'EmailVerificationPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <EmailVerificationPage {...props} />,
      loadData: EmailVerificationPage.loadData,
    },

    {
      path: '/ordertype/:type',
      name: 'OrderTypesPage',
      auth: true,
      component: props => <OrderTypesPage {...props} />,
    },
  ];
};

export default routeConfiguration;
