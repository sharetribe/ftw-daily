import React from 'react';
import { Link } from 'react-router';
import { fakeAuth } from '../../Routes';
import css from './Topbar.css';

const SignoutButton = props => {
  const { router } = props;
  const handleClick = () => {
    fakeAuth.signout(() => {
      router.transitionTo('/');
    });
  };
  return <button onClick={handleClick}>Sign out</button>;
};

const Topbar = (props, context) => {
  const linkProps = { className: css.link };

  return (
    <div className={css.container}>
      <Link to="/" {...linkProps}>Home</Link>
      <Link to="/s" {...linkProps}>Search</Link>
      <Link to="/l/Bike-Pelago-12345" {...linkProps}>Listing page</Link>
      <Link to="/u/Bikerrs" {...linkProps}>Profile</Link>
      <Link to="/u/Bikerrs/edit" {...linkProps}>Edit profile</Link>
      <Link to="/checkout/lid1234" {...linkProps}>Checkout</Link>
      <Link to="/inbox" {...linkProps}>Inbox</Link>
      <Link to="/orders" {...linkProps}>Orders</Link>
      <Link to="/sales" {...linkProps}>Sales</Link>
      <Link to="/password/forgotten" {...linkProps}>Request password</Link>
      <Link to="/password/change" {...linkProps}>Change password</Link>
      <Link to="/listings" {...linkProps}>Manage listings</Link>
      <Link to="/account" {...linkProps}>Account settings</Link>
      <Link to="/account/contact-details" {...linkProps}>Contact details</Link>
      <Link to="/account/notifications" {...linkProps}>Notification settings</Link>
      <Link to="/account/payment-methods" {...linkProps}>Payment methods</Link>
      <Link to="/account/payout-preferences" {...linkProps}>Payout preferences</Link>
      <Link to="/account/security" {...linkProps}>Security</Link>
      <SignoutButton router={context.router} />
    </div>
  );
};

Topbar.contextTypes = { router: React.PropTypes.object };

export default Topbar;
