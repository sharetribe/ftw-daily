import SectionThumbnailLinks from './SectionThumbnailLinks';

const imageAltText = 'styleguide alt text';

export const TwoNamedLinksWithHeadings = {
  component: SectionThumbnailLinks,
  props: {
    linksPerRow: 2,
    links: [
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?1' } },
        text: 'Link 1',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?2' } },
        text: 'Link 2',
      },
    ],
    heading: 'Two links side by side',
    subHeading: 'One column in mobile, two columns in desktop.',
  },
  group: 'sections',
};

export const ThreeExternalLinksWithHeadings = {
  component: SectionThumbnailLinks,
  props: {
    linksPerRow: 3,
    links: [
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'ExternalLink', href: 'http://example.com/1' },
        text: 'Link 1',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'ExternalLink', href: 'http://example.com/2' },
        text: 'Link 2',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'ExternalLink', href: 'http://example.com/3' },
        text: 'Link 3',
      },
    ],
    heading: 'Three links side by side',
    subHeading: 'One column in mobile, three columns in desktop.',
  },
  group: 'sections',
};

export const FourLinks = {
  component: SectionThumbnailLinks,
  props: {
    linksPerRow: 2,
    links: [
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?1' } },
        text: 'Link 1 with quite a long text that tests how the items below align',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?2' } },
        text: 'Link 2',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?3' } },
        text: 'Link 3',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?4' } },
        text: 'Link 4',
      },
    ],
  },
  group: 'sections',
};

export const SixLinks = {
  component: SectionThumbnailLinks,
  props: {
    linksPerRow: 3,
    links: [
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?1' } },
        text: 'Link 1',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?2' } },
        searchQuery: '?2',
        text: 'Link 2',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?3' } },
        text: 'Link 3',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?4' } },
        text: 'Link 4',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?5' } },
        text: 'Link 5',
      },
      {
        imageUrl: 'https://lorempixel.com/648/448/',
        imageAltText,
        linkProps: { type: 'NamedLink', name: 'SearchPage', to: { search: '?6' } },
        text: 'Link 6',
      },
    ],
  },
  group: 'sections',
};
