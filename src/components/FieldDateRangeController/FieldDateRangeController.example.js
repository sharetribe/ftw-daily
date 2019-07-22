import React from 'react';
import { Form as FinalForm } from 'react-final-form';

import FieldDateRangeController from './FieldDateRangeController';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const { style, handleSubmit, onChange, dirty } = formRenderProps;

      const handleChange = dirty ? onChange : () => null;
      return (
        <form
          style={style}
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FieldDateRangeController name="dates" onChange={handleChange} />
        </form>
      );
    }}
  />
);

export const DateRangeControllerExample = {
  component: FormComponent,
  props: {
    onChange: values => {
      if (values) {
        const { startDate, endDate } = values;
        console.log('Changed to: ', startDate, endDate);
      }
    },
    onSubmit: () => null,
  },
  group: 'custom inputs',
};
