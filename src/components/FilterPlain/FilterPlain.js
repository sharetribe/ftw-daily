import React, { Component } from 'react';
import { bool, func, node, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';

import { FilterForm } from '../../forms';
import css from './FilterPlain.module.css';

class FilterPlainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      isSubCategoryOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.toggleIsSubCategoryOpen = this.toggleIsSubCategoryOpen.bind(this);
  }

  handleChange(values) {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  handleClear() {
    const { onSubmit, onClear } = this.props;

    if (onClear) {
      onClear();
    }

    onSubmit(null);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.setState(prevState => ({ isSubCategoryOpen: false }));
  }

  toggleIsSubCategoryOpen() {
    console.log(111111111);
    this.setState(prevState => ({ isSubCategoryOpen: !prevState.isSubCategoryOpen }));
  }

  render() {
    const {
      rootClassName,
      className,
      plainClassName,
      id,
      label,
      isSelected,
      children,
      initialValues,
      keepDirtyOnReinitialize,
      contentPlacementOffset,
      isCategory,
      mainCategoriesImages,
      subCategoryImage,
      labelImg
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const labelClass = isSelected ? css.filterLabelSelected : css.filterLabel;
    const newLabel = isCategory ? label + ' Categories' : label;


    let categoryImg;

    switch(labelImg) {
      case 'coworking':
        categoryImg = <img src={mainCategoriesImages.coworking} alt ="coworking" className={css.categoryImg} />
        break;
      case 'fitness':
        categoryImg = <img src={mainCategoriesImages.fitness}  alt="fitness" className={css.categoryImg} />
        break;
      case 'hairBeauty':
        categoryImg = <img src={mainCategoriesImages.hairBeauty}  alt="hairBeauty" className={css.categoryImg} />
        break;
      case 'kitchensAndPopUps':
        categoryImg = <img src={mainCategoriesImages.kitchensAndPopUps}  alt="kitchensAndPopUps" className={css.categoryImg} />
        break;
      case 'musicAndArts':
        categoryImg = <img src={mainCategoriesImages.musicAndArts}  alt="musicAndArts" className={css.categoryImg} />
        break;
      case 'eventsAndVenues':
        categoryImg = <img src={mainCategoriesImages.eventsAndVenues}  alt="eventsAndVenues" className={css.categoryImg} />
        break;
      case 'photographyAndFilm':
        categoryImg = <img src={mainCategoriesImages.photographyAndFilm}  alt="photographyAndFilm" className={css.categoryImg} />
        break;
      case 'wellness':
        categoryImg = <img src={mainCategoriesImages.wellness}  alt="wellness" className={css.categoryImg} />
        break;
      default: null;
    }

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            {isCategory && labelImg && categoryImg}
            <span className={labelClass}>{newLabel}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'FilterPlain.clear'} />
          </button>
        </div>
        <div
          id={id}
          className={classNames(plainClassName, css.plain, { [css.isOpen]: this.state.isOpen })}
          ref={node => {
            this.filterContent = node;
          }}
        >
          <FilterForm
            id={`${id}.form`}
            liveEdit
            contentPlacementOffset={contentPlacementOffset}
            onChange={this.handleChange}
            initialValues={initialValues}
            keepDirtyOnReinitialize={keepDirtyOnReinitialize}
            subCategoryImage={subCategoryImage}
            isCategory={isCategory}
            isSubCategoryOpen={this.state.isSubCategoryOpen}
            toggleIsSubCategoryOpen={this.toggleIsSubCategoryOpen}
          >
            {children}
          </FilterForm>
        </div>
      </div>
    );
  }
}

FilterPlainComponent.defaultProps = {
  rootClassName: null,
  className: null,
  plainClassName: null,
  initialValues: null,
  keepDirtyOnReinitialize: false,
};

FilterPlainComponent.propTypes = {
  rootClassName: string,
  className: string,
  plainClassName: string,
  id: string.isRequired,
  onSubmit: func.isRequired,
  label: node.isRequired,
  isSelected: bool.isRequired,
  children: node.isRequired,
  initialValues: object,
  keepDirtyOnReinitialize: bool,

  // form injectIntl
  intl: intlShape.isRequired,
};

const FilterPlain = injectIntl(FilterPlainComponent);

export default FilterPlain;
