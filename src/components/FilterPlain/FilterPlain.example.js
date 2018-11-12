import React from 'react';
import { FieldTextInput } from '../../components';
import FilterPlain from './FilterPlain';

const id = 'FilterPlainExample';
const field = <FieldTextInput type="text" id={`${id}.input1`} name="input1" label="Input:" />;

export const FilterPlainExample = {
  component: FilterPlain,
  props: {
    id,
    liveEdit: true,
    showAsPopup: false,
    isSelected: false,
    urlParam: 'example',
    initialValues: {},
    contentPlacementOffset: -14,
    onSubmit: (urlParam, values) => {
      console.log(`onSubmit with urlParam: ${urlParam} and values: ${JSON.stringify(values)}`);
    },
    label: 'Example label',
    children: field,
  },
  group: 'misc',
};
