import React from 'react';

import LayoutComposer from './LayoutComposer.js';

// Wrapper with some inline styles
const GridContent = props => (
  <div
    style={{
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      padding: '24px',
      justifySelf: 'center',
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      border: `dashed 5px ${props.color}`,
    }}
  >
    <h2 style={{ textAlign: 'center', width: '100%', margin: 0 }}>{props.children}</h2>
  </div>
);

// Component created using LayoutComposer
const Component = props => {
  return (
    <LayoutComposer {...props}>
      {props => {
        const { Topbar, Main, Extra, Footer } = props;
        return (
          <>
            <Topbar as="header">
              <GridContent color="#bae1ff">
                I went to the woods because I wished to live deliberately,
              </GridContent>
            </Topbar>

            <Main as="main">
              <GridContent color="#ffdfba">
                ...to front only the essential facts of life, and see if I could not learn what it
                had to teach...
              </GridContent>
            </Main>

            <Extra as="aside">
              <GridContent color="#ffffba">
                ...and not, when I came to die, discover that I had not lived.
              </GridContent>
            </Extra>

            <Footer>
              <GridContent color="#baffc9">- Henry David Thoreau</GridContent>
            </Footer>
          </>
        );
      }}
    </LayoutComposer>
  );
};

// Simple stacked layout using "areas"
export const LayoutComposerAreas = {
  component: Component,
  props: {
    areas: `
      topbar
      main
      extra
      footer
    `,
  },
  group: 'cms',
};

// Responsive layout using "responsiveAreas"
export const LayoutComposerResponsiveAreas = {
  component: Component,
  props: {
    responsiveAreas: {
      areasSmall: {
        mediaQuery: '(max-width: 767px)',
        areas: `
          topbar
          main
          extra
          footer
        `,
      },
      areasMedium: {
        mediaQuery: '(min-width: 768px) and (max-width: 1023px)',
        areas: `
        topbar topbar
        main extra
        footer footer
        `,
      },
      areasLarge: {
        mediaQuery: '(min-width: 1024px)',
        areas: `
        topbar topbar topbar
        main extra footer
        `,
      },
    },
  },
  group: 'cms',
};

// Responsive layout using "responsiveAreas" with bit more advanced grid
export const LayoutComposerResponsiveAreasFunky = {
  component: Component,
  props: {
    style: {
      gridTemplateRows: '100px 1fr 1fr 80px',
      gap: '24px',
    },
    responsiveAreas: {
      areasSmall: {
        mediaQuery: '(max-width: 767px)',
        areas: `
          topbar
          main
          extra
          footer
        `,
      },
      areasMedium: {
        mediaQuery: '(min-width: 768px) and (max-width: 1023px)',
        areas: `
        topbar topbar
        main .
        main extra
        footer footer
        `,
      },
      areasLarge: {
        mediaQuery: '(min-width: 1024px)',
        areas: `
        topbar topbar .
        main . .
        . extra .
        . . footer
        `,
      },
    },
  },
  group: 'cms',
};
