import React, { PropTypes } from 'react';
import { map, size } from 'lodash';
import { NamedLink } from '../../components';
import * as allExamples from '../../examples';

import css from './StyleguidePage.css';

const ALL = '*';

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
      <h2 className={css.withPadding}>
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
      </h2>
      <span className={css.withPadding}>
        <NamedLink
          name="StyleguideComponentExampleRaw"
          params={{ component: componentName, example: exampleName, type: 'raw' }}
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

const { bool, func, node, object, objectOf, oneOfType, shape, string } = PropTypes;

Example.defaultProps = { description: null, props: {}, useDefaultWrapperStyles: true };

Example.propTypes = {
  componentName: string.isRequired,
  exampleName: string.isRequired,
  component: oneOfType([func, node]).isRequired,
  description: string,
  props: object,
  useDefaultWrapperStyles: bool,
};

const Examples = props => {
  const { examples } = props;
  const toExamples = (exmpls, name) => (
    <li key={name}>
      <ul>
        {map(exmpls, (exmpl, exampleName) => (
          <Example key={exampleName} componentName={name} exampleName={exampleName} {...exmpl} />
        ))}
      </ul>
    </li>
  );
  return (
    <ul>
      {map(examples, toExamples)}
    </ul>
  );
};

Examples.propTypes = { examples: objectOf(objectOf(object)).isRequired };

const examplesFor = (examples, componentName, exampleName) => {
  // All components, all examples
  if (componentName === ALL) {
    return examples;
  }

  // Specific component, all examples
  const component = examples[componentName];
  if (exampleName === ALL) {
    return component ? { [componentName]: component } : {};
  }

  // Specific component, specific example
  const example = component ? component[exampleName] : null;
  return example ? { [componentName]: { [exampleName]: example } } : {};
};

const StyleguidePage = props => {
  const { params } = props;
  const component = params.component || ALL;
  const example = params.example || ALL;
  const raw = params.type === 'raw';
  const examples = examplesFor(allExamples, component, example);

  // Raw examples are rendered without any wrapper
  if (raw && examples[component] && examples[component][example]) {
    const { component: ExampleComponent, props: exampleProps } = examples[component][example];
    return <ExampleComponent {...exampleProps} />;
  } else if (raw) {
    return <p>No example with filter {component}/{example}/raw</p>;
  }

  const html = size(examples) > 0
    ? <Examples examples={examples} />
    : <p>No examples with filter: {component}/{example}</p>;

  return (
    <section className={css.root}>
      <h1 className={css.withPadding}>
        <NamedLink name="Styleguide">Styleguide</NamedLink>
      </h1>
      {html}
    </section>
  );
};

StyleguidePage.propTypes = { params: shape({ component: string, example: string }).isRequired };

export default StyleguidePage;
