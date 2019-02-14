import Avatar, { AvatarMedium, AvatarLarge } from './Avatar';
import { types as sdkTypes } from '../../util/sdkLoader';
import { fakeIntl } from '../../util/test-data';

const { UUID } = sdkTypes;

const bannedUser = {
  id: new UUID('banned-user'),
  type: 'user',
  attributes: {
    banned: true,
    deleted: false,
  },
};

const userWithoutProfileImage = {
  id: new UUID('user-without-profile-image'),
  type: 'user',
  attributes: {
    banned: false,
    deleted: false,
    profile: {
      displayName: 'No Profile',
      abbreviatedName: 'NP',
    },
  },
};

const userWithProfileImage = {
  id: new UUID('user-with-profile-image'),
  type: 'user',
  attributes: {
    banned: false,
    deleted: false,
    profile: {
      displayName: 'Has Profile',
      abbreviatedName: 'HP',
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
};

// ================ Empty user ================ //

export const EmptyUser = {
  component: Avatar,
  props: {
    user: null,
    intl: fakeIntl,
  },
  group: 'users',
};

export const EmptyUserMedium = {
  component: AvatarMedium,
  props: {
    user: null,
    intl: fakeIntl,
  },
  group: 'users',
};

export const EmptyUserLarge = {
  component: AvatarLarge,
  props: {
    user: null,
    intl: fakeIntl,
  },
  group: 'users',
};

// ================ Banned user ================ //

export const BannedUser = {
  component: Avatar,
  props: {
    user: bannedUser,
    intl: fakeIntl,
  },
  group: 'users',
};

export const BannedUserMedium = {
  component: AvatarMedium,
  props: {
    user: bannedUser,
    intl: fakeIntl,
  },
  group: 'users',
};

export const BannedUserLarge = {
  component: AvatarLarge,
  props: {
    user: bannedUser,
    intl: fakeIntl,
  },
  group: 'users',
};

// ================ No profile image ================ //

export const WithoutProfileImageUser = {
  component: Avatar,
  props: {
    user: userWithoutProfileImage,
    intl: fakeIntl,
  },
  group: 'users',
};

export const WithoutProfileImageUserMedium = {
  component: AvatarMedium,
  props: {
    user: userWithoutProfileImage,
    intl: fakeIntl,
  },
  group: 'users',
};

export const WithoutProfileImageUserLarge = {
  component: AvatarLarge,
  props: {
    user: userWithoutProfileImage,
    intl: fakeIntl,
  },
  group: 'users',
};

// ================ Full user with profile image ================ //

export const WithProfileImageUser = {
  component: Avatar,
  props: {
    user: userWithProfileImage,
    intl: fakeIntl,
  },
  group: 'users',
};

export const WithProfileImageUserMedium = {
  component: AvatarMedium,
  props: {
    user: userWithProfileImage,
    intl: fakeIntl,
  },
  group: 'users',
};

export const WithProfileImageUserLarge = {
  component: AvatarLarge,
  props: {
    user: userWithProfileImage,
    intl: fakeIntl,
  },
  group: 'users',
};

export const WithoutProfileLink = {
  component: AvatarLarge,
  props: {
    user: userWithProfileImage,
    disableProfileLink: true,
    intl: fakeIntl,
  },
  group: 'users',
};
