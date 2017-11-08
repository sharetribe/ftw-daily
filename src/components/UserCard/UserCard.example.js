import { createUser, createCurrentUser } from '../../util/test-data';
import { types } from '../../util/sdkLoader';
import UserCard from './UserCard';

const { UUID } = types;

export const EmptyUser = {
  component: UserCard,
  props: {},
  group: 'users',
};

export const WithUser = {
  component: UserCard,
  props: {
    user: createUser('test-card-user'),
  },
  group: 'users',
};

export const WithCurrentUser = {
  component: UserCard,
  props: {
    user: createUser('test-card-user'),
    currentUser: createCurrentUser('test-card-user'),
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
          sizes: [
            {
              name: 'square-xlarge2x',
              width: 240,
              height: 240,
              url: 'https://lorempixel.com/240/240/people/',
            },
            {
              name: 'square-xlarge4x',
              width: 480,
              height: 480,
              url: 'https://lorempixel.com/480/480/people/',
            },
          ],
        },
      },
    },
    currentUser: createCurrentUser('full-user'),
  },
  group: 'users',
};
