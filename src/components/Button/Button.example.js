/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Button, { PrimaryButton, SecondaryButton, InlineTextButton } from './Button';

import css from './Button.example.css';

const preventDefault = e => {
  e.preventDefault();
};

const ButtonsComponent = () => {
  return (
    <div>
      <h3>Default button:</h3>
      <Button>Click me</Button>

      <h3>Default button disabled:</h3>
      <Button disabled>Click me</Button>

      <h3>Default button in progress:</h3>
      <Button inProgress>Click me</Button>

      <h3>Default button ready:</h3>
      <Button ready>Click me</Button>

      <h3>Default button disabled and in progress:</h3>
      <Button disabled inProgress>Click me</Button>

      <h3>Default button disabled and ready:</h3>
      <Button disabled ready>Click me</Button>

      <h3>Primary button:</h3>
      <PrimaryButton>Click me</PrimaryButton>

      <h3>Primary button disabled:</h3>
      <PrimaryButton disabled>Click me</PrimaryButton>

      <h3>Primary button in progress:</h3>
      <PrimaryButton inProgress>Click me</PrimaryButton>

      <h3>Primary button ready:</h3>
      <PrimaryButton ready>Click me</PrimaryButton>

      <h3>Primary button disabled and in progress:</h3>
      <PrimaryButton disabled inProgress>Click me</PrimaryButton>

      <h3>Primary button disabled ready:</h3>
      <PrimaryButton disabled ready>Click me</PrimaryButton>

      <h3>Secondary button:</h3>
      <SecondaryButton>Click me</SecondaryButton>

      <h3>Secondary button disabled:</h3>
      <SecondaryButton disabled>Click me</SecondaryButton>

      <h3>Secondary button in progress:</h3>
      <SecondaryButton inProgress>Click me</SecondaryButton>

      <h3>Secondary button ready:</h3>
      <SecondaryButton ready>Click me</SecondaryButton>

      <h3>Secondary button disabled and in progress:</h3>
      <SecondaryButton disabled inProgress>Click me</SecondaryButton>

      <h3>Secondary button disabled ready:</h3>
      <SecondaryButton disabled ready>Click me</SecondaryButton>

      <h3>Inline text button:</h3>
      <p>
        Lorem ipsum <InlineTextButton>button that looks like link</InlineTextButton> dolor sit amet
      </p>
      <p>Lorem ipsum <a href="#" onClick={preventDefault}>a normal link</a> dolor sit amet</p>

      <h3>Link that looks like a default button:</h3>
      <a className={css.buttonLink} href="#" onClick={preventDefault}>Click me</a>

      <h3>Link that looks like a primary button:</h3>
      <a className={css.buttonLinkPrimary} href="#" onClick={preventDefault}>Click me</a>

      <h3>Link that looks like a secondary button:</h3>
      <a className={css.buttonLinkSecondary} href="#" onClick={preventDefault}>Click me</a>

      <h3>Button with custom styles:</h3>
      <Button className={css.customButton}>Click me</Button>

    </div>
  );
};

export const Buttons = {
  component: ButtonsComponent,
  group: 'buttons',
};
