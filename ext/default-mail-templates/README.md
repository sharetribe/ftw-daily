# Mail templates

This directory contains the default templates for transaction emails. Built-in email templates can
be edited in Console.

Before making customizations, copy the templates to another directory (e.g. `mail-templates`). Note
that, at present, changes made to the template files in this repository will not take effect
automatically. Marketplace owner needs to notify the Sharetribe team.

## Template parts

A template consists of two files:

- `TEMPLATE_NAME-subject.txt` - holds the mail Subject line template
- `TEMPLATE_NAME-html.html` - contains the template for the HTML version of the mail

Both parts are mandatory. All emails that are sent from the marketplace contain both the HTML and
plain text variants and the recipient's mail client is free to choose which one to visualize and
how. The text version is automatically generated from the HTML template.

## Template syntax

Templates use [Handlebars](http://handlebarsjs.com/) syntax.

Example html:

```html
<html>
  <body>
    <p>Hello {{recipient.first-name}},</p>

    <p>Your <em>{{marketplace.name}}</em> account&#x27;s email address was changed.</p>

    <p>If you didn&#x27;t make this change, please contact us.</p>

    <p>Best regards,<br />The {{marketplace.name}} team</p>

    <hr />

    <p>
      You have received this email notification because you are a member of {{marketplace.name}}. If
      you no longer wish to receive these emails, please contact {{marketplace.name}} team.
    </p>
  </body>
</html>
```

Variables within `{{ }}` are expanded and escaped, so that they are safe to place inside HTML
content. As seen above, some variables have nested values, which can be accessed with dot `.`
operator.

The template syntax supports conditionals, loops, helpers and other constructs. For details see the
[Handlebars documentation](http://handlebarsjs.com/).

## List of templates

The templates in the list below correspond to mails defined in the default transaction process.
Customized transaction processes can have different set of mail templates.

`customer` and `provider` below mean the corresponding parties in a transaction.

#### booking-request-accepted

Sent to the customer when the provider accepts a booking and the customer's payment is captured.

#### booking-request-auto-declined

Sent to the customer when the provider does not accept the booking within the allowed time and the
transaction is automatically declined.

#### booking-request-declined

Sent to the customer when the provider manually declines a transaction.

#### money-paid

Sent to the provider when a booking's end date has passed and payment is sent to the provider's bank
account.

#### new-booking-request

Sent when a customer makes a new booking and preauthorizes payment.

#### review-by-customer-wanted

Sent to the customer when the booking end-date has passed and reviews for the transaction can be
posted. This mail should prompt the recipient to write a review.

#### review-by-other-party-published

Sent to one of the parties in a transaction when the other party has posted a review and the review
has been published (i.e. contents of the review are public).

#### review-by-other-party-unpublished

Sent to one of the parties in a transation when the other party has posted a review but the review
is not yet published, because the first party hasn't yet posted their review or the review time has
not expired. This mail should prompt the recipient to write their own review.

#### review-by-provider-wanted

Sent to the customer when the booking end-date has passed and reviews for the transaction can be
posted. This mail should prompt the recipient to write a review.
