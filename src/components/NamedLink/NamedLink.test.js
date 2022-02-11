import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import NamedLink, { NamedLinkComponent } from './NamedLink';

describe('NamedLinkComponent', () => {
  it('should mark the link as active if the current URL matches', () => {
    const activeClassName = 'my-active-class';
    const landingPageProps = {
      name: 'LandingPage',
      activeClassName,
      match: { url: '/' },
    };
    const searchPageProps = {
      name: 'SearchPage',
      activeClassName,
      match: { url: '/' },
    };
    const tree = renderDeep(
      <div>
        <NamedLinkComponent {...landingPageProps}>link to a</NamedLinkComponent>
        <NamedLinkComponent {...searchPageProps}>link to b</NamedLinkComponent>
      </div>
    );

    const aLink = tree.children[0];
    const bLink = tree.children[1];
    expect(aLink.type).toEqual('a');
    expect(bLink.type).toEqual('a');
    expect(aLink.props.className).toEqual(activeClassName);
    expect(bLink.props.className).toEqual('');
  });
});

describe('NamedLink', () => {
  it('should contain correct link', () => {
    const id = 12;
    const tree = renderDeep(
      <NamedLink name="ListingPageCanonical" params={{ id }}>
        to ListingPage
      </NamedLink>
    );
    expect(tree.type).toEqual('a');
    expect(tree.props.href).toEqual(`/l/${id}`);
    expect(tree.children).toEqual(['to ListingPage']);
  });
});
