import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { Form as FinalForm, Field } from 'react-final-form';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { Form } from '../../components';
import SearchIcon from '../../components/Topbar/SearchIcon';

import css from './CustomForm.css';

class CustomFormComponent extends Component {
    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.searchInput = React.createRef();
    }
  
    onSubmit(values) {
      this.props.onSubmit({ keywords: values.keywords });
      // blur search input to hide software keyboard
      if (this.searchInput.current) {
        this.searchInput.current.blur();
      }
    }
  
    render() {
      return (
        <FinalForm
          {...this.props}
          onSubmit={this.onSubmit}
          render={formRenderProps => {
            const {
              rootClassName,
              className,
              intl,
              isMobile,
              handleSubmit,
            } = formRenderProps;
            const classes = classNames(rootClassName, className);
            const customStyledForm = {
              display:'flex',
              width:'100%',
              height:'100%',
              paddingLeft:'15px',
              alignItems: 'center'
            }
            return (
              <Form style={customStyledForm} className={[classes, 'customBorder']} onSubmit={handleSubmit}>
               <SearchIcon className={css.searchMenuIcon} />
                <Field
                  name="keywords"
                  render={({ input, meta }) => {
                    return (
                      <input
                        className={
                          isMobile
                            ? [css.mobileInputRoot]
                            : [css.desktopInputRoot]
                        }
                        {...input}
                        style={{border: 'none'}}
                        id="keyword-search"
                        ref={this.searchInput}
                        type="text"
                        placeholder=' Filter by Keywords.......'
                        autoComplete="off"
                      />
                    );
                  }}
                />
              </Form>
            );
          }}
        />
      );
    }
  }

CustomFormComponent.defaultProps = { rootClassName: null, className: null };

CustomFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  onSubmit: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const CustomSearchForm = injectIntl(CustomFormComponent);

export default CustomSearchForm;
