import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { NamedLink } from '../../components';
import * as allExamples from '../../examples';

import css from './StyleguidePage.css';

const ALL = '*';
const DEFAULT_GROUP = 'misc';

const Example = props => {
  const {
    componentName,
    exampleName,
    component: ExampleComponent,
    description,
    props: exampleProps,
    useDefaultWrapperStyles,
  } = props;

  const exampleWrapperClassName = useDefaultWrapperStyles ? css.defaultWrapperStyles : '';
  const desc = description ? <p className={css.withPadding}>Description: {description}</p> : null;
  return (
    <li>
      <h3 className={css.withPadding}>
        <NamedLink name="StyleguideComponent" params={{ component: componentName }}>
          {componentName}
        </NamedLink>
        /

        <NamedLink
          name="StyleguideComponentExample"
          params={{ component: componentName, example: exampleName }}
        >
          {exampleName}
        </NamedLink>
      </h3>
      <span className={css.withPadding}>
        <NamedLink
          name="StyleguideComponentExampleRaw"
          params={{ component: componentName, example: exampleName }}
        >
          raw
        </NamedLink>
      </span>
      {desc}
      <div className={exampleWrapperClassName}>
        <ExampleComponent {...exampleProps} />
      </div>
    </li>
  );
};

const { bool, func, node, object, oneOfType, shape, string, arrayOf } = PropTypes;

Example.defaultProps = {
  description: null,
  props: {},
  useDefaultWrapperStyles: true,
};

Example.propTypes = {
  componentName: string.isRequired,
  exampleName: string.isRequired,
  component: oneOfType([func, node]).isRequired,
  description: string,
  props: object,
  useDefaultWrapperStyles: bool,
};

// Renders the list of component example groups as clickable filters
const Nav = props => {
  const { groups, selectedGroup } = props;
  const filteredGroups = groups.filter(g => g !== ALL && g !== DEFAULT_GROUP);
  const toGroupLink = group => {
    const linkProps = {
      name: group === ALL ? 'Styleguide' : 'StyleguideGroup',
      params: group === ALL ? null : { group },
    };
    const linkContent = group === ALL ? 'all' : group;
    const isSelected = selectedGroup && group === selectedGroup;
    return (
      <li key={group}>
        <NamedLink {...linkProps} className={isSelected ? css.selectedGroup : null}>
          {linkContent}
        </NamedLink>
      </li>
    );
  };
  return (
    <nav className={css.withPadding}>
      <ul>
        {toGroupLink(ALL)}
        {filteredGroups.map(toGroupLink)}
        {toGroupLink(DEFAULT_GROUP)}
      </ul>
    </nav>
  );
};

Nav.defaultProps = { selectedGroup: null };

Nav.propTypes = {
  groups: arrayOf(string).isRequired,
  selectedGroup: string,
};

// The imported examples are in a nested tree structure. Flatten the
// structure into an array of example objects.
const flatExamples = examples => {
  return Object.keys(examples).reduce(
    (flattened, componentName) => {
      const exs = Object.keys(examples[componentName]).reduce(
        (result, exampleName) => {
          const ex = examples[componentName][exampleName];
          return result.concat([
            {
              componentName,
              exampleName,
              group: DEFAULT_GROUP,
              ...ex,
            },
          ]);
        },
        []
      );
      return flattened.concat(exs);
    },
    []
  );
};

// Filter the examples based on the given criteria
const examplesFor = (examples, group, componentName, exampleName) => {
  return examples.filter(ex => {
    return (group === ALL || ex.group === group) &&
      (componentName === ALL || ex.componentName === componentName) &&
      (exampleName === ALL || ex.exampleName === exampleName);
  });
};

const StyleguidePage = props => {
  const { params, raw } = props;
  const group = params.group || ALL;
  const componentName = params.component || ALL;
  const exampleName = params.example || ALL;

  const flattened = flatExamples(allExamples);
  const groups = flattened.reduce(
    (result, ex) => {
      if (ex.group && !result.includes(ex.group)) {
        return result.concat(ex.group);
      }
      return result;
    },
    []
  );
  groups.sort();
  const selectedGroup = isEmpty(params) ? ALL : params.group;
  const examples = examplesFor(flattened, group, componentName, exampleName);

  // Raw examples are rendered without any wrapper
  if (raw && examples.length > 0) {
    // There can be only one raw example at a time, therefore pick
    // only the first example in the examples Array
    const { component: ExampleComponent, props: exampleProps } = examples[0];
    return <ExampleComponent {...exampleProps} />;
  } else if (raw) {
    return <p>No example with filter {componentName}/{exampleName}/raw</p>;
  }

  const html = examples.length > 0
    ? <ul>
        {examples.map(ex => <Example key={`${ex.componentName}/${ex.exampleName}`} {...ex} />)}
      </ul>
    : <p>No examples with filter: {componentName}/{exampleName}</p>;

  return (
    <section className={css.root}>
      <h1 className={css.withPadding}>
        <NamedLink name="Styleguide">Styleguide</NamedLink>
      </h1>
      <h2 className={css.withPadding}>Select category:</h2>
      <Nav groups={groups} selectedGroup={selectedGroup} />
      <h2 className={css.withPadding}>Component examples:</h2>
      {html}
    </section>
  );
};

StyleguidePage.defaultProps = { raw: false };

StyleguidePage.propTypes = {
  params: shape({
    group: string,
    component: string,
    example: string,
  }).isRequired,
  raw: bool,
};

export default StyleguidePage;
