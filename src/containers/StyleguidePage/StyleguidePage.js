import React, { PropTypes } from 'react';
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
    group,
    description,
    props: exampleProps,
    useDefaultWrapperStyles,
  } = props;

  const exampleWrapperClassName = useDefaultWrapperStyles ? css.defaultWrapperStyles : '';
  const desc = description ? <p className={css.withPadding}>Description: {description}</p> : null;
  return (
    <li>
      <h2 className={css.withPadding}>
        <NamedLink name="StyleguideComponent" params={{ group, component: componentName }}>
          {componentName}
        </NamedLink>
        /

        <NamedLink
          name="StyleguideComponentExample"
          params={{ group, component: componentName, example: exampleName }}
        >
          {exampleName}
        </NamedLink>
      </h2>
      <span className={css.withPadding}>
        <NamedLink
          name="StyleguideComponentExampleRaw"
          params={{ group, component: componentName, example: exampleName }}
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

const { bool, func, node, object, oneOfType, shape, string } = PropTypes;

Example.defaultProps = {
  description: null,
  group: DEFAULT_GROUP,
  props: {},
  useDefaultWrapperStyles: true,
};

Example.propTypes = {
  componentName: string.isRequired,
  exampleName: string.isRequired,
  group: string,
  component: oneOfType([func, node]).isRequired,
  description: string,
  props: object,
  useDefaultWrapperStyles: bool,
};

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
  const examples = examplesFor(flattened, group, componentName, exampleName);

  // Raw examples are rendered without any wrapper
  if (raw && examples.length > 0) {
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
