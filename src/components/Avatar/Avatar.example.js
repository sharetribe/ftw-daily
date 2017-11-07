import Avatar, { AvatarMedium, AvatarLarge } from './Avatar';
import { types } from '../../util/sdkLoader';
import { fakeIntl } from '../../util/test-data';

const { UUID } = types;

const bannedUser = {
  id: new UUID('banned-user'),
  type: 'user',
  attributes: {
    banned: true,
  },
};

const userWithoutProfileImage = {
  id: new UUID('user-without-profile-image'),
  type: 'user',
  attributes: {
    banned: false,
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
    profile: {
      displayName: 'Has Profile',
      abbreviatedName: 'HP',
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
};

// ================ Empty user ================ //

export const EmptyUser = {
  component: Avatar,
  props: {
    user: null,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const EmptyUserMedium = {
  component: AvatarMedium,
  props: {
    user: null,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const EmptyUserLarge = {
  component: AvatarLarge,
  props: {
    user: null,
    intl: fakeIntl,
  },
  group: 'avatar',
};

// ================ Banned user ================ //

export const BannedUser = {
  component: Avatar,
  props: {
    user: bannedUser,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const BannedUserMedium = {
  component: AvatarMedium,
  props: {
    user: bannedUser,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const BannedUserLarge = {
  component: AvatarLarge,
  props: {
    user: bannedUser,
    intl: fakeIntl,
  },
  group: 'avatar',
};

// ================ No profile image ================ //

export const WithoutProfileImageUser = {
  component: Avatar,
  props: {
    user: userWithoutProfileImage,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const WithoutProfileImageUserMedium = {
  component: AvatarMedium,
  props: {
    user: userWithoutProfileImage,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const WithoutProfileImageUserLarge = {
  component: AvatarLarge,
  props: {
    user: userWithoutProfileImage,
    intl: fakeIntl,
  },
  group: 'avatar',
};

// ================ Full user with profile image ================ //

export const WithProfileImageUser = {
  component: Avatar,
  props: {
    user: userWithProfileImage,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const WithProfileImageUserMedium = {
  component: AvatarMedium,
  props: {
    user: userWithProfileImage,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const WithProfileImageUserLarge = {
  component: AvatarLarge,
  props: {
    user: userWithProfileImage,
    intl: fakeIntl,
  },
  group: 'avatar',
};

export const WithoutProfileLink = {
  component: AvatarLarge,
  props: {
    user: userWithProfileImage,
    disableProfileLink: true,
    intl: fakeIntl,
  },
  group: 'avatar',
};
