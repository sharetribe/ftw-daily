import { createUser, createCurrentUser } from '../../util/test-data';
import { types as sdkTypes } from '../../util/sdkLoader';
import UserCard from './UserCard';

const { UUID } = sdkTypes;

export const EmptyUser = {
  component: UserCard,
  props: {
    onContactUser: user => console.log('concact user:', user),
  },
  group: 'users',
};

export const WithoutBio = {
  component: UserCard,
  props: {
    user: createUser('test-card-user'),
    onContactUser: user => console.log('concact user:', user),
  },
  group: 'users',
};

export const WithoutBioCurrentUser = {
  component: UserCard,
  props: {
    user: createUser('test-card-user'),
    currentUser: createCurrentUser('test-card-user'),
    onContactUser: user => console.log('concact user:', user),
  },
  group: 'users',
};

export const WithProfileImageAndBioCurrentUser = {
  component: UserCard,
  props: {
    user: {
      id: new UUID('full-user'),
      type: 'user',
      attributes: {
        banned: false,
        deleted: false,
        profile: {
          displayName: 'Has P',
          abbreviatedName: 'HP',
          bio:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      },
      profileImage: {
        id: new UUID('profile-image'),
        type: 'image',
        attributes: {
          variants: {
            'square-small': {
              name: 'square-small',
              width: 240,
              height: 240,
              url: 'https://lorempixel.com/240/240/people/',
            },
            'square-small2x': {
              name: 'square-small2x',
              width: 480,
              height: 480,
              url: 'https://lorempixel.com/480/480/people/',
            },
          },
        },
      },
    },
    currentUser: createCurrentUser('full-user'),
    onContactUser: user => console.log('concact user:', user),
  },
  group: 'users',
};

export const WithProfileImageAndBio = {
  component: UserCard,
  props: {
    user: {
      id: new UUID('full-user'),
      type: 'user',
      attributes: {
        banned: false,
        deleted: false,
        profile: {
          displayName: 'Has P',
          abbreviatedName: 'HP',
          bio:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      },
      profileImage: {
        id: new UUID('profile-image'),
        type: 'image',
        attributes: {
          variants: {
            'square-small': {
              name: 'square-small',
              width: 240,
              height: 240,
              url: 'https://lorempixel.com/240/240/people/',
            },
            'square-small2x': {
              name: 'square-small2x',
              width: 480,
              height: 480,
              url: 'https://lorempixel.com/480/480/people/',
            },
          },
        },
      },
    },
    currentUser: createCurrentUser('test-card-current-user'),
    onContactUser: user => console.log('concact user:', user),
  },
  group: 'users',
};

export const WithCurrentUserAsUser = {
  component: UserCard,
  props: {
    user: createCurrentUser('test-card-user'),
    currentUser: createCurrentUser('test-card-user'),
    onContactUser: user => console.log('concact user:', user),
  },
  group: 'users',
};
