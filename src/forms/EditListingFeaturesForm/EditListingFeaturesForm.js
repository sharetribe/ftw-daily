import React, { Component } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';

import { required, composeValidators } from '../../util/validators';
import { Button, FieldCheckboxGroup, Form, CategoryField, FieldTextInput } from '../../components';

import css from '../EditListingDescriptionForm/EditListingDescriptionForm.css';

// function getCategoryID(category,petCategory){
//   const samelabel = 'EditListingFeaturesForm.category';

//   // return (<FormattedMessage id="ActivityFeed.transitionRequest" values={{ displayName, listingTitle }} />)
//   return injectIntl.formatMessage({
//     id: samelabel + category,
//     values: petCategory,
//   });
// }
export class EditListingFeaturesFormComponent extends Component {
  constructor(props) {
    super(props);
    var key_ary = {
      dog: 0,
      reptiles: 1,
      farm: 2,
      cat: 3,
      rabbit: 4,
      bird: 5,
      fish: 6,
      horse: 7,
      other: 8,
    };
    var ary = Array(9).fill(false);
    var pet_ary = props.initialValues.amenities;
    console.log('initial', props.initialValues);
    if (pet_ary !== null) {
      this.init(ary, pet_ary, key_ary);
    }
    this.state = {
      checkFlag: ary,
      runFlag: true,
    };
    // this.handleChange = this.handleChange.bind(this);
    console.log('constructor');
  }

  handleChange = i => {
    if (this.state.runFlag) {
      const checkFlagAry = this.state.checkFlag.slice();
      checkFlagAry[i] = !checkFlagAry[i];
      this.setState({ checkFlag: checkFlagAry });
    }
    this.setState({ runFlag: !this.state.runFlag });
  };

  init(data, pet_ary, key_ary) {
    if (pet_ary && pet_ary.length) {
      pet_ary.forEach(function (f, i) {
        data[key_ary[f]] = !data[key_ary[f]];
      });
    }
    return data;
  }
  render() {
    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            categories,
            disabled,
            rootClassName,
            className,
            name,
            intl,
            handleSubmit,
            pristine,
            saveActionMsg,
            updated,
            updateInProgress,
            fetchErrors,
            user_type,
          } = fieldRenderProps;

          const categoryDogLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.dog.label',
            // values: {animal},
          });
          const categoryDogPlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.dog.placeholder',
            // values: {animal},
          });
          const categoryDogRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.dog.required',
              // values: {animal},
            })
          );

          const categoryCatLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.cat.label',
            // values: {animal},
          });
          const categoryCatPlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.cat.placeholder',
            // values: {animal},
          });
          const categoryCatRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.cat.required',
              // values: {animal},
            })
          );

          const categoryReptilesLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.reptiles.label',
            // values: {animal},
          });
          const categoryReptilesPlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.reptiles.placeholder',
            // values: {animal},
          });
          const categoryReptilesRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.reptiles.required',
              // values: {animal},
            })
          );

          const categoryRabbitsLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.rabbits.label',
            // values: {animal},
          });
          const categoryRabbitsPlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.rabbits.placeholder',
            // values: {animal},
          });
          const categoryRabbitsRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.rabbits.required',
              // values: {animal},
            })
          );

          const categoryHorseLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.horse.label',
            // values: {animal},
          });
          const categoryHorsePlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.horse.placeholder',
            // values: {animal},
          });
          const categoryHorseRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.horse.required',
              // values: {animal},
            })
          );

          const categoryFarmAnimalsLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.farm_animals.label',
            // values: {animal},
          });
          const categoryFarmAnimalsPlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.farm_animals.placeholder',
            // values: {animal},
          });
          const categoryFarmAnimalsRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.farm_animals.required',
              // values: {animal},
            })
          );

          const categoryAquariumLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.aquarium.label',
            // values: {animal},
          });
          const categoryAquariumPlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.aquarium.placeholder',
            // values: {animal},
          });
          const categoryAquariumRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.aquarium.required',
              // values: {animal},
            })
          );

          const categoryBirdLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.bird.label',
            // values: {animal},
          });
          const categoryBirdPlaceholder = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.bird.placeholder',
            // values: {animal},
          });
          const categoryBirdRequired = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.bird.required',
              // values: {animal},
            })
          );

          const OtherLabelMessage = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.other.label',
            // values: {animal},
          });
          const OtherPlaceholderMessage = intl.formatMessage({
            id: 'EditListingFeaturesForm.category.other.placeholder',
            // values: {animal},
          });
          const OtherRequiredMessage = required(
            intl.formatMessage({
              id: 'EditListingFeaturesForm.category.other.required',
              // values: {animal},
            })
          );

          const user_name = user_type === 0 ? 'owner' : user_type === 1 ? 'sitter' : 'service';
          const homeTitle = intl.formatMessage({
            id: 'EditListingFeaturesForm.homeTitle.' + user_name,
            // values: {animal},
          });

          const { updateListingError, showListingsError } = fetchErrors || {};

          const errorMessage = updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
            </p>
          ) : null;

          const errorMessageShowListing = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = updated && pristine;
          const submitInProgress = updateInProgress;
          const submitDisabled = disabled || submitInProgress;

          // function get_label(category,kind){
          //   var str = 'EditListingFeaturesForm.category';
          //   var res;
          //   switch(kind){
          //     case 0:  res = str+ '.' + category +'.' + 'label'; break;
          //     case 1:  res = str+ '.' + category +'.' + 'placeholder'; break;
          //     case 2:  res = str+ '.' + category +'.' + 'required'; break;
          //     default: break;
          //   }
          //   return intl.formatMessage({
          //     id: res,
          //   });
          // }

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              {errorMessageShowListing}
              <h3></h3>
              <FieldCheckboxGroup
                className={css.features}
                id={name}
                name={name}
                options={categories}
                handleChange={this.handleChange}
              />

              {this.state.checkFlag[0] ? (
                <div>
                  <h3>{homeTitle}</h3>
                  <FieldCheckboxGroup
                    id="dog"
                    name="dog"
                    className={css.features}
                    options={categories[0].weight}
                    intl={intl}
                  />
                </div>
              ) : null}
              {/* {this.state.checkFlag[1] && user_type >1?(
                <CategoryField
                id="reptiles"
                name="reptiles"
                className={css.category}
                categories={categories[1].weight}
                intl={intl}
                categoryLabel={categoryReptilesLabel}
                categoryPlaceholder={categoryReptilesPlaceholder}
                categoryRequired={categoryReptilesRequired}
              />
              ):null
            }
            
            {this.state.checkFlag[2] && user_type >1?(
                <CategoryField
                id="farm"
                name="farm"
                className={css.category}
                categories={categories[2].weight}
                intl={intl}
                categoryLabel={categoryCatLabel}
                categoryPlaceholder={categoryCatPlaceholder}
                categoryRequired={categoryCatRequired}
              />
              ):null
            }
            {this.state.checkFlag[3] && user_type >1?(
                <CategoryField
                id="cat"
                name="cat"
                className={css.category}
                categories={categories[3].weight}
                intl={intl}
                categoryLabel={categoryFarmAnimalsLabel}
                categoryPlaceholder={categoryFarmAnimalsPlaceholder}
                categoryRequired={categoryFarmAnimalsRequired}
              />
              ):null
            }
            {this.state.checkFlag[4] && user_type >1?(
                <CategoryField
                id="rabbit"
                name="rabbit"
                className={css.category}
                categories={categories[4].weight}
                intl={intl}
                categoryLabel={categoryRabbitsLabel}
                categoryPlaceholder={categoryRabbitsPlaceholder}
                categoryRequired={categoryRabbitsRequired}
              />
              ):null
            }
            {this.state.checkFlag[5] && user_type >1?(
                <CategoryField
                id="bird"
                name="bird"
                className={css.category}
                categories={categories[5].weight}
                intl={intl}
                categoryLabel={categoryBirdLabel}
                categoryPlaceholder={categoryBirdPlaceholder}
                categoryRequired={categoryBirdRequired}
              />
              ):null
            }
            {this.state.checkFlag[6] && user_type >1?(
                <CategoryField
                id="fish"
                name="fish"
                className={css.category}
                categories={categories[6].weight}
                intl={intl}
                categoryLabel={categoryAquariumLabel}
                categoryPlaceholder={categoryAquariumPlaceholder}
                categoryRequired={categoryAquariumRequired}
              />
              ):null
            }
            {this.state.checkFlag[7] && user_type >1?(
                <CategoryField
                id="horse"
                name="horse"
                className={css.category}
                categories={categories[7].weight}
                intl={intl}
                categoryLabel={categoryHorseLabel}
                categoryPlaceholder={categoryHorsePlaceholder}
                categoryRequired={categoryHorseRequired}
              /> 
              ):null
            } */}
              {this.state.checkFlag[8] ? (
                <FieldTextInput
                  id="other"
                  name="other"
                  className={css.category}
                  type="textarea"
                  label={OtherLabelMessage}
                  placeholder={OtherPlaceholderMessage}
                  validate={composeValidators(required(OtherRequiredMessage))}
                />
              ) : null}

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

// const EditListingFeaturesForm = EditListingFeaturesFormComponent;
export default compose(injectIntl)(EditListingFeaturesFormComponent);
// export default EditListingFeaturesForm;
