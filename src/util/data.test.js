import { types } from 'sharetribe-sdk';
import { combinedRelationships, combinedResourceObjects, updatedEntities } from './data';

const { UUID } = types;

describe('data utils', () => {
  describe('combinedRelationships()', () => {
    it('handles no rels', () => {
      expect(combinedRelationships(undefined, undefined)).toEqual(null);
    });

    it('takes existings rels if no new rels are given', () => {
      const listingRels = {
        author: { data: { id: new UUID('author-id'), type: 'author' } },
        images: {
          data: [
            { id: new UUID('image1'), type: 'image' },
            { id: new UUID('image2'), type: 'image' },
          ],
        },
      };
      expect(combinedRelationships(listingRels, undefined)).toEqual(listingRels);
    });

    it('takes new rels if no existing rels are given', () => {
      const listingRels = {
        author: { data: { id: new UUID('author-id'), type: 'author' } },
        images: { data: { id: new UUID('image1'), type: 'image' } },
      };
      expect(combinedRelationships(undefined, listingRels)).toEqual(listingRels);
    });

    it('merges two nonempty rels', () => {
      const authorRel = { data: { id: new UUID('author-id'), type: 'author' } };
      const imagesRel = {
        data: [
          { id: new UUID('image1'), type: 'image' },
          { id: new UUID('image2'), type: 'image' },
        ],
      };
      const newImagesRel = { data: { id: new UUID('image1'), type: 'image' } };
      const reviewsRel = {
        data: [
          { id: new UUID('review1'), type: 'review' },
          { id: new UUID('review2'), type: 'review' },
        ],
      };

      const oldListingRels = { author: authorRel, images: imagesRel };
      const newListingRels = { images: newImagesRel, reviews: reviewsRel };
      expect(combinedRelationships(oldListingRels, newListingRels)).toEqual({
        author: authorRel,
        images: newImagesRel,
        reviews: reviewsRel,
      });
    });
  });

  describe('combinedResourceObjects()', () => {
    it("throws if ids don't match", () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const listing2 = { id: new UUID('listing2'), type: 'listing' };
      expect(() => combinedResourceObjects(listing1, listing2)).toThrow(
        'Cannot merge resource objects with different ids or types',
      );
    });

    it("throws if types don't match", () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const author1 = { id: new UUID('author1'), type: 'author' };
      expect(() => combinedResourceObjects(listing1, author1)).toThrow(
        'Cannot merge resource objects with different ids or types',
      );
    });

    it("doesn't add attributes or relationships keys unnecessarily", () => {
      const res1 = { id: new UUID('listing1'), type: 'listing' };
      const res2 = { id: new UUID('listing1'), type: 'listing' };
      const merged = combinedResourceObjects(res1, res2);
      expect(merged).toEqual(res1);
      const keys = Object.keys(merged).sort();
      expect(keys).toEqual(['id', 'type']);
    });

    it('merges new attributes', () => {
      const res1 = {
        id: new UUID('listing1'),
        type: 'listing',
        attributes: { title: 'Listing 1 title', description: 'Listing 1 description' },
      };
      const res2 = {
        id: new UUID('listing1'),
        type: 'listing',
        attributes: { title: 'Changed title', description: 'Some description' },
      };
      expect(combinedResourceObjects(res1, res2)).toEqual(res2);
    });

    it("keeps old attributes if new does't have any", () => {
      const res1Attributes = { title: 'Listing 1 title', description: 'Listing 1 description' };
      const res2Relationships = { author: { data: { id: new UUID('author1'), type: 'author' } } };

      const res1 = { id: new UUID('listing1'), type: 'listing', attributes: res1Attributes };
      const res2 = { id: new UUID('listing1'), type: 'listing', relationships: res2Relationships };
      expect(combinedResourceObjects(res1, res2)).toEqual({
        id: new UUID('listing1'),
        type: 'listing',
        attributes: res1Attributes,
        relationships: res2Relationships,
      });
    });
  });

  describe('updatedEntities()', () => {
    it('adds a single entity', () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const response = { data: listing1 };
      const entities = updatedEntities({}, response);
      expect(entities).toEqual({ listing: { listing1 } });
    });

    it('add multiple entities', () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const listing2 = { id: new UUID('listing2'), type: 'listing' };
      const response = { data: [listing1, listing2] };
      const entities = updatedEntities({}, response);
      expect(entities).toEqual({ listing: { listing1, listing2 } });
    });

    it('handles a more complex merge', () => {
      const listing1 = {
        id: new UUID('listing1'),
        type: 'listing',
        attributes: { title: 'Listing 1 title', description: 'Listing 1 description' },
      };
      const listing2 = {
        id: new UUID('listing2'),
        type: 'listing',
        attributes: { title: 'Listing 2 title', description: 'Listing 2 description' },
      };
      const initialResponse = { data: [listing1, listing2] };
      const initialEntities = updatedEntities({}, initialResponse);
      expect(initialEntities).toEqual({ listing: { listing1, listing2 } });
      const author1 = { id: new UUID('author1'), type: 'author' };
      const author1WithAttributes = {
        id: new UUID('author1'),
        type: 'author',
        attributes: { name: 'Author 1 name' },
      };
      const listing2Updated = {
        id: new UUID('listing2'),
        type: 'listing',
        attributes: { title: 'New listing 2 title', description: 'new listing 2 description' },
        relationships: { author: { data: author1 } },
      };
      const included = [author1WithAttributes];
      const response = { data: [listing2Updated], included };
      const entities = updatedEntities(initialEntities, response, true);
      expect(entities).toEqual({
        listing: { listing1, listing2: listing2Updated },
        author: { author1: author1WithAttributes },
      });
    });
  });
});
