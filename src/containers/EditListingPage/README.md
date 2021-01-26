# EditListingPage

This page is used for creating new listings or editing existings ones. New listings are first
creates as drafts until the full listing is created. Existing listings are updated when saving the
for in each tab.

## Structure

Listing creation and editing is structured in several layers described below.

### EditListingWizard

The wizard sets up listing creation and editing into multiple tabs and panels. If you need to add,
remove, or reorder the different phases of the listing creation process, the wizard is the place to
look at.

The wizard also keeps track if a tab is completed and which tabs should be accessible. Therefore it
is important to update the logic in the `tabCompleted` function when changing the form contenst of a
tab.

### EditListingWizardTab

The tab defines which panel to render for a given tab. It also defines how to route to the next
panel in order.

### PayoutDetailsForm

The wizard prompts the user to connect their payout details before allowing creating a listing. This
is only done if the user has not connected the Stripe account. Usually this means when creating
their first listing.

### Panels

A panel is the content for a single wizard tab. It renders the correct form and handles the data
flow to and from the form.

### Forms

Panels contain forms that collect input from the user and submit the tab data.

## Adding a new field to a form

To add a new input to a tab, edit the corresponding form to add the field. Then update the
`initialValues` and `onSubmit` in the corresponding panel to update how listing data goes into and
out of the form.

Remember to also update the logic in the `tabCompleted` function in the wizard.

## Removing a panel

If you don't need a specific panel, just remove the panel from the `TABS` variable in the
`EditListingWizard` component.

## Adding a new panel

When adding a new panel, it helps to copy an existing panel/form as the starting point.

1.  Add a form
1.  Add a panel that renders the form and handles the data
1.  Add the panel to the `EditListingWizardTab` component
1.  Add the tab to the `EditListingWizard` in the `TABS` variable
1.  Check the `tabCompleted` function logic within the wizard
