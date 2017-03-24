import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { getPlacePredictions, getPlaceDetails } from '../../util/googleMaps';
import { Input } from '../../components';

import css from './LocationAutocompleteInput.css';

const DEBOUNCE_WAIT_TIME = 200;
const KEY_CODE_ARROW_UP = 38;
const KEY_CODE_ARROW_DOWN = 40;
const KEY_CODE_ENTER = 13;
const KEY_CODE_TAB = 9;
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';

// Renders the autocompletion prediction results in a list
const LocationPredictionsList = props => {
  const { predictions, highlightedIndex, onSelectItem } = props;
  if (predictions.length === 0) {
    return null;
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  const item = (prediction, index) => {
    const isHighlighted = index === highlightedIndex;

    return (
      <li
        className={isHighlighted ? css.highlighted : null}
        key={prediction.id}
        onClick={() => onSelectItem(index)}
      >
        {prediction.description}
      </li>
    );
  };
  /* eslint-enable jsx-a11y/no-static-element-interactions */

  return (
    <ul className={css.predictions}>
      {predictions.map(item)}
    </ul>
  );
};

const { shape, string, arrayOf, func, any, number } = PropTypes;

LocationPredictionsList.defaultProps = { highlightedIndex: null };

LocationPredictionsList.propTypes = {
  predictions: arrayOf(
    shape({
      id: string.isRequired,
      description: string.isRequired,
      place_id: string.isRequired,
    })
  ).isRequired,
  highlightedIndex: number,
  onSelectItem: func.isRequired,
};

// Get the current value with defaults from the given
// LocationAutocompleteInput props.
const currentValue = props => {
  const value = props.input.value || {};
  return { search: '', predictions: [], selectedPlaceId: null, selectedPlace: null, ...value };
};

/*
  Location auto completion input component

  This component can work as the `component` prop to Redux Form's
  <Field /> component. it takes a custom input value shape, and
  controls the onChanged callback that is called with the value to
  syncronise to the form's Redux store.

  The component works by listening to the underlying input component
  and calling the Google Maps Places API for predictions. When the
  predictions arrive, those are passed to Redux Form in the onChange
  callback.

  See the LocationAutocompleteInput.example.js file for a usage
  example within a form.
*/
class LocationAutocompleteInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputHasFocus: false,
      predictionsHaveHover: false,
      highlightedIndex: -1, // -1 means no highlight
    };

    this.changeHighlight = this.changeHighlight.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.selectItemIfNoneSelected = this.selectItemIfNoneSelected.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);

    // Debounce the method to avoid calling the API too many times
    // when the user is typing fast.
    this.predict = debounce(this.predict.bind(this), DEBOUNCE_WAIT_TIME, { leading: true });
  }
  componentDidMount() {
    const mapsLibLoaded = window.google && window.google.maps;
    if (!mapsLibLoaded) {
      throw new Error('Google Maps API must be loaded for LocationAutocompleteInput');
    }
  }

  // Interpret input key event
  onKeyDown(e) {
    if (e.keyCode === KEY_CODE_ARROW_UP) {
      // Prevent changing cursor position in input
      e.preventDefault();
      this.changeHighlight(DIRECTION_UP);
    } else if (e.keyCode === KEY_CODE_ARROW_DOWN) {
      // Prevent changing cursor position in input
      e.preventDefault();
      this.changeHighlight(DIRECTION_DOWN);
    } else if (e.keyCode === KEY_CODE_ENTER) {
      const { search, selectedPlace } = currentValue(this.props);

      if (search && !selectedPlace) {
        // Prevent form submit, try to select value instead.
        e.preventDefault();
        e.stopPropagation();
        this.selectItemIfNoneSelected();
      }
    } else if (e.keyCode === KEY_CODE_TAB) {
      this.selectItemIfNoneSelected();
    }
  }

  // Handle input text change, fetch predictions if the value isn't empty
  onChange() {
    const onChange = this.props.input.onChange;
    const { predictions } = currentValue(this.props);
    const newValue = this.input.value;

    // Clear the current values since the input content is changed
    onChange({
      search: newValue,
      predictions: newValue ? predictions : [],
      selectedPlaceId: null,
      selectedPlace: null,
    });

    // Clear highlighted prediction since the input value changed and
    // results will change as well
    this.setState({ highlightedIndex: -1 });

    if (!newValue) {
      // No need to fetch predictions on empty input
      return;
    }

    this.predict(newValue);
  }

  // Change the currently highlighted item by calculating the new
  // index from the current state and the given direction number
  // (DIRECTION_UP or DIRECTION_DOWN)
  changeHighlight(direction) {
    this.setState((prevState, props) => {
      const { predictions } = currentValue(props);
      const currentIndex = prevState.highlightedIndex;
      let index = currentIndex;

      if (direction === DIRECTION_UP) {
        // Keep the first position if already highlighted
        index = currentIndex === 0 ? 0 : currentIndex - 1;
      } else if (direction === DIRECTION_DOWN) {
        index = currentIndex + 1;
      }

      // Check that the index is within the bounds
      if (index < 0) {
        index = -1;
      } else if (index >= predictions.length) {
        index = predictions.length - 1;
      }

      return { highlightedIndex: index };
    });
  }

  // Select the prediction in the given item. This will fetch the
  // place details and set it as the selected place.
  selectItem(index) {
    if (index < 0) {
      return;
    }
    const { predictions } = currentValue(this.props);
    if (index >= predictions.length) {
      return;
    }
    const prediction = predictions[index];
    const placeId = prediction.place_id;

    this.props.input.onChange({
      ...this.props.input,
      selectedPlaceId: placeId,
      selectedPlace: null,
    });

    getPlaceDetails(placeId)
      .then(place => {
        this.props.input.onChange({
          search: prediction.description,
          predictions: [],
          selectedPlaceId: placeId,
          selectedPlace: place,
        });
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.props.input.onChange({
          ...this.props.input.value,
          selectedPlaceId: null,
          selectedPlace: null,
        });
      });
  }
  selectItemIfNoneSelected() {
    const { search, selectedPlaceId } = currentValue(this.props);
    if (search && !selectedPlaceId) {
      const index = this.state.highlightedIndex !== -1 ? this.state.highlightedIndex : 0;
      this.selectItem(index);
    }
  }
  predict(search) {
    const onChange = this.props.input.onChange;
    getPlacePredictions(search)
      .then(results => {
        const { search: currentSearch } = currentValue(this.props);

        // If the earlier predictions arrive when the user has already
        // changed the search term, ignore and wait until the latest
        // predictions arrive. Without this logic, results for earlier
        // requests would override whatever the user had typed since.
        //
        // This is essentially the same as switchLatest in RxJS or
        // takeLatest in Redux Saga, without canceling the earlier
        // requests.
        if (results.search === currentSearch) {
          onChange({
            search: results.search,
            predictions: results.predictions,
            selectedPlaceId: null,
            selectedPlace: null,
          });
        }
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
        const value = currentValue(this.props);
        onChange({
          ...value,
          selectedPlaceId: null,
          selectedPlace: null,
        });
      });
  }
  render() {
    const { className, placeholder, input } = this.props;
    const { name, onFocus, onBlur } = input;
    const { search, predictions } = currentValue(this.props);

    const handleOnFocus = e => {
      this.setState({ inputHasFocus: true });
      onFocus(e);
    };

    const handleOnBlur = () => {
      this.setState({ inputHasFocus: false, highlightedIndex: -1 });
      onBlur(currentValue(this.props));
    };

    // Only render predictions when the input has focus. For
    // development and easier workflow with the browser devtools, you
    // might want to hardcode this to `true`. Otherwise the dropdown
    // list will disappear.
    //
    // We also have to check if the predictions have hover to avoid a
    // click triggering a blur event that hides the predictions before
    // the click event is sent, resulting in a click to whatever is
    // rendered below the predictions.
    const renderPredictions = this.state.inputHasFocus || this.state.predictionsHaveHover;

    return (
      <div className={css.root}>
        <Input
          className={classNames(css.input, className)}
          type="search"
          autoComplete="off"
          placeholder={placeholder}
          name={name}
          value={search}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          ref={i => {
            this.input = i;
          }}
        />
        {renderPredictions
          ? <div
              onMouseEnter={() => this.setState({ predictionsHaveHover: true })}
              onMouseLeave={() => this.setState({ predictionsHaveHover: false })}
            >
              <LocationPredictionsList
                predictions={predictions}
                highlightedIndex={this.state.highlightedIndex}
                onSelectItem={this.selectItem}
              />
            </div>
          : null}
      </div>
    );
  }
}

LocationAutocompleteInput.defaultProps = { className: '', placeholder: '' };

LocationAutocompleteInput.propTypes = {
  className: string,
  placeholder: string,
  input: shape({
    name: string.isRequired,
    value: shape({
      search: string,
      predictions: any,
      selectedPlace: propTypes.place,
    }),
    onChange: func.isRequired,
    onFocus: func.isRequired,
    onBlur: func.isRequired,
  }).isRequired,
};

export default LocationAutocompleteInput;
