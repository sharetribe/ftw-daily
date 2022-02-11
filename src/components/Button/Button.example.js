import React, { Component } from 'react';
import { IconCheckmark } from '../../components';
import Button, { PrimaryButton, SecondaryButton, InlineTextButton } from './Button';

import css from './ButtonExample.module.css';

const preventDefault = e => {
  e.preventDefault();
};

const hashLink = '#';
class InteractiveButton extends Component {
  constructor(props) {
    super(props);
    this.inProgressTimeoutId = null;
    this.readyTimeoutId = null;
    this.state = { inProgress: false, disabled: false, ready: false };
  }
  componentWillUnmount() {
    window.clearTimeout(this.inProgressTimeoutId);
    window.clearTimeout(this.readyTimeoutId);
  }
  render() {
    const handleClick = () => {
      window.clearTimeout(this.inProgressTimeoutId);
      window.clearTimeout(this.readyTimeoutId);
      this.setState({ inProgress: true, disabled: true });
      this.inProgressTimeoutId = window.setTimeout(() => {
        this.setState({ inProgress: false, disabled: false, ready: true });
        this.readyTimeoutId = window.setTimeout(() => {
          this.setState({ inProgress: false, disabled: false, ready: false });
        }, 2000);
      }, 2000);
    };

    return (
      <Button {...this.state} onClick={handleClick}>
        Click me
      </Button>
    );
  }
}

const ButtonsComponent = () => {
  return (
    <div>
      <h3>Interactive button:</h3>
      <InteractiveButton />

      <h3>Button with a translation:</h3>
      <Button>
        <span>Clique moi</span>
      </Button>

      <h3>Button with an icon and a text:</h3>
      <Button>
        <IconCheckmark rootClassName={css.customIcon} />
        <span>Custom text</span>
      </Button>

      <h3>Default button:</h3>
      <Button>Click me</Button>

      <h3>Default button disabled:</h3>
      <Button disabled>Click me</Button>

      <h3>Default button in progress:</h3>
      <Button inProgress>Click me</Button>

      <h3>Default button ready:</h3>
      <Button ready>Click me</Button>

      <h3>Default button disabled and in progress:</h3>
      <Button disabled inProgress>
        Click me
      </Button>

      <h3>Default button disabled and ready:</h3>
      <Button disabled ready>
        Click me
      </Button>

      <h3>Primary button:</h3>
      <PrimaryButton>Click me</PrimaryButton>

      <h3>Primary button disabled:</h3>
      <PrimaryButton disabled>Click me</PrimaryButton>

      <h3>Primary button in progress:</h3>
      <PrimaryButton inProgress>Click me</PrimaryButton>

      <h3>Primary button ready:</h3>
      <PrimaryButton ready>Click me</PrimaryButton>

      <h3>Primary button disabled and in progress:</h3>
      <PrimaryButton disabled inProgress>
        Click me
      </PrimaryButton>

      <h3>Primary button disabled and ready:</h3>
      <PrimaryButton disabled ready>
        Click me
      </PrimaryButton>

      <h3>Secondary button:</h3>
      <SecondaryButton>Click me</SecondaryButton>

      <h3>Secondary button disabled:</h3>
      <SecondaryButton disabled>Click me</SecondaryButton>

      <h3>Secondary button in progress:</h3>
      <SecondaryButton inProgress>Click me</SecondaryButton>

      <h3>Secondary button ready:</h3>
      <SecondaryButton ready>Click me</SecondaryButton>

      <h3>Secondary button disabled and in progress:</h3>
      <SecondaryButton disabled inProgress>
        Click me
      </SecondaryButton>

      <h3>Secondary button disabled and ready:</h3>
      <SecondaryButton disabled ready>
        Click me
      </SecondaryButton>

      <h3>Inline text button:</h3>
      <p>
        Lorem ipsum <InlineTextButton>button that looks like link</InlineTextButton> dolor sit amet
      </p>
      <p>
        Lorem ipsum{' '}
        <a href={hashLink} onClick={preventDefault}>
          a normal link
        </a>{' '}
        dolor sit amet
      </p>

      <h3>Link that looks like a default button:</h3>
      <a className={css.buttonLink} href={hashLink} onClick={preventDefault}>
        Click me
      </a>

      <h3>Translated link that looks like a default button:</h3>
      <a className={css.buttonLink} href={hashLink} onClick={preventDefault}>
        <span>Clique moi</span>
      </a>

      <h3>Link that looks like a primary button:</h3>
      <a className={css.buttonLinkPrimary} href={hashLink} onClick={preventDefault}>
        Click me
      </a>

      <h3>Link that looks like a secondary button:</h3>
      <a className={css.buttonLinkSecondary} href={hashLink} onClick={preventDefault}>
        Click me
      </a>

      <h3>Button with custom styles:</h3>
      <Button rootClassName={css.customButton}>Click me</Button>
    </div>
  );
};

export const Buttons = {
  component: ButtonsComponent,
  group: 'buttons',
};
