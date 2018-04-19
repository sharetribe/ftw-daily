# Extended Data

_Extended data_ is arbitrary information that can be attached to certain resources in the Flex API.
Extended data values can be of any valid JSON data type, including JSON data structures like object
and array. The purpose of extended data is to expand the ways in which the Flex API can be used.

## Types of extended data

Extended data is divided into two types: _public data_ and _protected data_.

### Public data

Public data can be written by anyone who has write permission to a resource and it is visible to
anyone who can read that resource.

### Protected data

Protected data, just like public data, can be modified by anyone with write access to the resource.
However, it can only be read by marketplace operators. It is also possible to reveal the protected
data at a specific point in the booking transaction process, for example if listing's address is
presented to the customer after a booking has been confirmed.

## Data schema and searched

Extended data works out of the box without any prior configuration to the marketplace.  Public and
protected data can be added to listings just by passing it in the create/update request to the API.
However, optionally a _data schema_ can be defined for an extended data key. The data schema allows
that extended data attribute to be used as a search parameter in some API endpoints, like in the
listings query endpoint. Contact Sharetribe team if you need to add a schema to your extended data.

## Extended data in Flex template app

The Flex web template uses extended data by default with listing and user resources. In case of the
listings, category and amenities information is stored in the `publicData` attribute. For the
users, phone number is stored in the `protectedData` attribute. As for indexed data, the template app
relies on data schemas for categories and amenities to be configured for the marketplace in the API
as those values are used as filters in the listing search.
