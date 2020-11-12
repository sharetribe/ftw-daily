import React, {Component} from 'react';
import FilterComponent from '../../containers/SearchPage/FilterComponent';

import css from './TopbarDesktop.css';

// Primary filters have their content in dropdown-popup.
// With this offset we move the dropdown to the left a few pixels on desktop layout.
const FILTER_DROPDOWN_OFFSET = -14;

class TopbarDropDown extends Component {
  componentDidUpdate() {
    const dropdown_cont = document.getElementById('cat-drop-down');

    if (dropdown_cont) {
      let dropdown = dropdown_cont.firstChild;
      const options = [...dropdown.getElementsByTagName("li")];

      // only need to set onclick methods once,
      // if has no top styling, its the first time
      if (!dropdown.style.top) {
        options.forEach(li => {
          let thisBtn = li.firstElementChild;
          thisBtn.onclick = () => this.props.onClick(thisBtn.textContent);
        });
        dropdown.style.top = "-55px";
      }
    }
  }

  emptyFunction() {
    return () => {};
  }

  render () {
    const {generalCategories = false} = this.props;
    if (generalCategories) {
      return (
        <div id="cat-drop-down" className={css.dropdown}>
          <FilterComponent
            key={`SearchFiltersPrimary.${generalCategories.id}`}
            idPrefix="SearchFiltersPrimary"
            filterConfig={generalCategories}
            urlQueryParams={this.emptyFunction}
            initialValues={this.emptyFunction}
            getHandleChangedValueFn={this.emptyFunction}
            showAsPopup
            contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
            isCategory={false}
          />
        </div>
      );
    }
  }
};

export default TopbarDropDown;
