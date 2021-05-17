import React from 'react';
import { string } from 'prop-types';
import { getTimeZoneNames, getDefaultTimeZoneOnBrowser, getTimeZoneNamesAndGTM } from '../../util/dates';
import { FieldSelect } from '../../components';

const FieldTimeZoneSelect = props => {
  // IANA database contains irrelevant time zones too.
  const relevantZonesPattern = new RegExp(
    '^(Africa|America|Antarctica|Asia|Atlantic|Australia|Europe|Indian|Pacific)'
  );

  const browsersTZ = getDefaultTimeZoneOnBrowser();

  return (
    <FieldSelect {...props}>
      <option value={browsersTZ} key={browsersTZ}>{browsersTZ}</option>
      {getTimeZoneNames(relevantZonesPattern).map(tz => (
        <option key={tz} value={tz}>
          {tz}
        </option>
      ))}
    </FieldSelect>
  );
};

FieldTimeZoneSelect.defaultProps = {
  rootClassName: null,
  className: null,
  id: null,
  label: null,
};

FieldTimeZoneSelect.propTypes = {
  rootClassName: string,
  className: string,

  // Label is optional, but if it is given, an id is also required so
  // the label can reference the input in the `for` attribute
  id: string,
  label: string,
  name: string.isRequired,
};

export default FieldTimeZoneSelect;
