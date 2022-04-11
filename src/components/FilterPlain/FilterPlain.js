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
      isSubCategoryAmenitiesOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.toggleIsSubCategoryOpen = this.toggleIsSubCategoryOpen.bind(this);
  }

  componentDidUpdate(prevProps) {

    if (prevProps?.currentActiveCategory !== this.props.currentActiveCategory) {
      this.setState({ isOpen: false });
    }
  }

  handleChange(values) {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  handleClear() {
    const { onSubmit, onClear, setSelectedCategoriesLength } = this.props;


    if (onClear) {
      onClear();
    }

    setSelectedCategoriesLength(0) 
    onSubmit(null);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.setState(prevState => ({ isSubCategoryOpen: false }));
  }

  toggleIsSubCategoryOpen() {
    this.setState(prevState => ({ isSubCategoryOpen: !prevState.isSubCategoryOpen }));
  }

  render() {
    const {
      rootClassName,
      className,
      plainClassName,
      id,
      filterId,
      label,
      isSelected,
      children,
      initialValues,
      keepDirtyOnReinitialize,
      contentPlacementOffset,
      isCategory,
      isCategoryAmenities,
      mainCategoriesImages,
      subCategoryImage,
      labelImg,
      setCurrentActiveCategory,
      isCategoryFilterEnabled,
      isAmenitiesFilterEnabled,
      labelWithoutCounter,
      currentActiveCategory,
      filterConfig,
      selectedItemsCounter,
      isMobileLayout,
      setSelectedCategoriesLength
    } = this.props;

    const isGeneralAmenities = filterConfig?.config?.isGeneralAmenities;

    const classes = classNames(
      rootClassName || css.root,
      className,
      { [css.rootCategory]: isCategory },
      { [css.categoryItemAmenities]: isCategoryAmenities },
      { [css.generalAmenitiesItem]: isGeneralAmenities },

      { [css.filterAmenitiesSelected]: isSelected },
      // { [css.filterAmenitiesNotSelected]: !isSelected && !!isAmenitiesFilterEnabled && isCategoryAmenities }


      // not working now
      // { [css.filterAmenitiesSelected]: isSelected && !isGeneralAmenities },
      // { [css.filterAmenitiesNotSelected]: !isSelected && !!isAmenitiesFilterEnabled && !isGeneralAmenities }
    );

    // const labelClass = isSelected ? css.filterLabelSelected : css.filterLabel;
    const newLabel = isCategory ? label + ' Categories' : label;

    const labelClass = classNames(
      css.filterLabel,
      { [css.filterLabelSelected]: isSelected },
      { [css.filterLabelOpened]: this.state.isOpen },
      { [css.filterLabelNotSelected]: !isSelected && !!isCategoryFilterEnabled && isCategory }
    )

    let categoryImg;

    switch (labelImg) {
      case 'coworking':
        categoryImg = <img src={mainCategoriesImages.coworking} alt="coworking" className={css.categoryImg} />
        break;
      case 'fitness':
        categoryImg = <img src={mainCategoriesImages.fitness} alt="fitness" className={css.categoryImg} />
        break;
      case 'hairBeauty':
        categoryImg = <img src={mainCategoriesImages.hairBeauty} alt="hairBeauty" className={css.categoryImg} />
        break;
      case 'kitchensAndPopUps':
        categoryImg = <img src={mainCategoriesImages.kitchensAndPopUps} alt="kitchensAndPopUps" className={css.categoryImg} />
        break;
      case 'musicAndArts':
        categoryImg = <img src={mainCategoriesImages.musicAndArts} alt="musicAndArts" className={css.categoryImg} />
        break;
      case 'eventsAndVenues':
        categoryImg = <img src={mainCategoriesImages.eventsAndVenues} alt="eventsAndVenues" className={css.categoryImg} />
        break;
      case 'photographyAndFilm':
        categoryImg = <img src={mainCategoriesImages.photographyAndFilm} alt="photographyAndFilm" className={css.categoryImg} />
        break;
      case 'wellness':
        categoryImg = <img src={mainCategoriesImages.wellness} alt="wellness" className={css.categoryImg} />
        break;
      default: null;
    }

    const labelButtonClasses = classNames(
      css.labelButton,
      { [css.labelButtonActive]: this.state.isOpen },
      { [css.labelButtonWithImg]: isCategory }
    )

    const amenitiesLabel = !!selectedItemsCounter ? `Patch Amenities • ${selectedItemsCounter}` : 'Patch Amenities'

    return (
      <div className={classes}>
        <div className={labelClass}>

          {isCategory && labelImg ? (
            <button type="button" className={labelButtonClasses} onClick={this.toggleIsOpen}>
              <div onClick={() => setCurrentActiveCategory(filterId)}>
                {categoryImg}
                <span className={css.filterLabel}>{labelWithoutCounter}</span>
              </div>
            </button>

          ) : (
            <button type="button" className={labelButtonClasses} onClick={this.toggleIsOpen}>
              <span className={labelClass}>{isMobileLayout && isCategoryAmenities ? amenitiesLabel : newLabel}</span>
            </button>
          )}


          {!isCategory && (
            <button type="button" className={css.clearButton} onClick={this.handleClear}>
              <FormattedMessage id={'FilterPlain.clear'} />
            </button>
          )}

        </div>


        <div
          id={id}
          className={classNames(plainClassName, css.plain, { [css.isOpen]: this.state.isOpen }, { [css.categorypPlain]: isCategory })}
          ref={node => {
            this.filterContent = node;
          }}
        >
          {isCategory && (
            <button type="button" className={classNames(css.clearButton, css.clearCategoryButtonMobile)} onClick={this.handleClear}>
              <FormattedMessage id={'FilterPlain.clear'} />
            </button>
          )}
          <FilterForm
            id={`${id}.form`}
            liveEdit
            contentPlacementOffset={contentPlacementOffset}
            onChange={this.handleChange}
            initialValues={initialValues}
            keepDirtyOnReinitialize={keepDirtyOnReinitialize}
            subCategoryImage={subCategoryImage}
            isCategory={isCategory}
            isCategoryAmenities={isCategoryAmenities}
            isSubCategoryOpen={this.state.isSubCategoryOpen}
            toggleIsSubCategoryOpen={this.toggleIsSubCategoryOpen}
            currentActiveCategory={currentActiveCategory}
            selectedItemsCounter={selectedItemsCounter}
            setSelectedCategoriesLength={setSelectedCategoriesLength}
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
