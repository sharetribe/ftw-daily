# ListingPage

Listing page is the place to see the full listing information and the page where the booking process
starts.

## Structure

Listing page consists of the generic Topbar and of different page sections:

- **SectionImages**: contains the listing image and the image carousel
- **SectionAvatar**: the listing author image
- **Main content**: the left column under images
- **SectionBooking**: Contains the form and breakdown estimation for booking the listing

In the main content, there are several sections that are likely to be customized, e.g. when adding
new extended data to the listing creation.

## Server rendering

Because the listing page is an important entry point to the marketplace when a user searches for
specific things of services outside the marketplace or comes through a link shared in social media,
it is important to ensure that server rendering works well to allow bots to index the page and its
metadata properly.

## SEO

As mentioned above, the listing page is important for search engines and other bots. Therefore it is
important to ensure that the schema metadata is up to date when making customizations to the page.
