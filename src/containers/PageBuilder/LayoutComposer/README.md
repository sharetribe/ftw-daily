# LayoutComposer

LayoutComposer helps to create layout areas using CSS Grid (grid-template-areas).

This component is adapted from the great work done in React Layout Areas and Atomic Layouts
projects.

- https://github.com/giuseppeg/react-layout-areas
- https://github.com/kettanaito/atomic-layout

## How to use LayoutComposer

You need to define the "**areas**" prop that contains a templating string. LayoutComposer reads it
and generates container components with similar names that you can use to wrap your child
components.

```jsx
<LayoutComposer
  areas={`
    topbar
    main
    footer
  `}
>
  {props => {
    const { Topbar, Main, Footer } = props;
    return (
      <>
        <Topbar as="header" className={css.topbar}>
          <TopbarContainer />
        </Topbar>
        <Main as="main">
          <SectionBuilder sections={sectionsData} options={options} />
        </Main>
        <Footer>
          <FooterContent />
        </Footer>
      </>
    );
  }}
</LayoutComposer>
```

## Responsive areas

LayoutComposer has alternative prop to "areas": "**responsiveAreas**". However, consider this
feature a bit experimental.

Responsive areas are created using **window.matchMedia**, which means that responsive layouts are
only created on the client-side (on a browser). This is problematic for server-side rendered pages:
the component needs to pick one of the defined areas (the first one) on the server, because there it
doesn't have window/screen dimensions available. So, for server-side rendered pages, _the initial
layout flashes when a user makes a full page load_.

```js
const responsiveAreas = {
  areasSmall: {
    mediaQuery: '(max-width: 767px)',
    areas: `
      topbar
      main
      aside
      footer
    `,
  },
  areasMedium: {
    mediaQuery: '(min-width: 768px)',
    areas: `
    topbar topbar
    main aside
    footer footer
    `,
  },
};
const ResponsiveLayout = (
  <LayoutComposer responsiveAreas={responsiveAreas}>
    {props => {
      const { Topbar, Main, Aside, Footer } = props;
      return (
        <>
          <Topbar as="header">
            <TopbarContainer />
          </Topbar>
          <Main as="main">Main content</Main>
          <Aside>Sidebar</Aside>
          <Footer>
            <FooterContent />
          </Footer>
        </>
      );
    }}
  </LayoutComposer>
);
```
