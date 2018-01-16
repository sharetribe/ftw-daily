import SectionSearchLinks from './SectionSearchLinks';

const imageAltText = 'styleguide alt text';

export const TwoLinksWithHeadings = {
  component: SectionSearchLinks,
  props: {
    linksPerRow: 2,
    links: [
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?1',
        text: 'Link 1',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?2',
        text: 'Link 2',
      },
    ],
    heading: 'Two links side by side',
    subHeading: 'One column in mobile, two columns in desktop.',
  },
  group: 'sections',
};

export const ThreeLinksWithHeadings = {
  component: SectionSearchLinks,
  props: {
    linksPerRow: 3,
    links: [
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?1',
        text: 'Link 1',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?2',
        text: 'Link 2',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?3',
        text: 'Link 3',
      },
    ],
    heading: 'Three links side by side',
    subHeading: 'One column in mobile, three columns in desktop.',
  },
  group: 'sections',
};

export const FourLinks = {
  component: SectionSearchLinks,
  props: {
    linksPerRow: 2,
    links: [
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?1',
        text: 'Link 1 with quite a long text that tests how the items below align',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?2',
        text: 'Link 2',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?3',
        text: 'Link 3',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?4',
        text: 'Link 4',
      },
    ],
  },
  group: 'sections',
};

export const SixLinks = {
  component: SectionSearchLinks,
  props: {
    linksPerRow: 3,
    links: [
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?1',
        text: 'Link 1',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?2',
        text: 'Link 2',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?3',
        text: 'Link 3',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?4',
        text: 'Link 4',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?5',
        text: 'Link 5',
      },
      {
        imageUrl: 'http://lorempixel.com/648/448/',
        imageAltText,
        searchQuery: '?6',
        text: 'Link 6',
      },
    ],
  },
  group: 'sections',
};
