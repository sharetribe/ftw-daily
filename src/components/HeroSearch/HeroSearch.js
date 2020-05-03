import React, { Component } from 'react';
import { DatePick } from '../../components';

import css from './HeroSearch.css';
import search from './images/search.png';
import Flatpickr from 'react-flatpickr';
import { TopbarSearchForm } from '../../forms';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';

class HeroSearch extends Component {
  constructor() {
    super();
    this.state = { active: null, location: null, date: null };
  }

  setActive(category) {
    this.setState({ active: category });
  }

  handleSubmit() {
    if (this.state.active && this.state.location && this.state.date) {
      const { date, location, active } = this.state;
      if (date[0].getDate() == date[1].getDate()) {
        date[1].setDate(date[1].getDate() + 1);
      }
      date[0] = `${date[0].getFullYear()}-${date[0].getMonth() + 1}-${date[0].getDate()}`;
      date[1] = `${date[1].getFullYear()}-${date[1].getMonth() + 1}-${date[1].getDate()}`;

      const category = {
        owner: 0,
        sitter: 1,
        service: 2,
      };
      window.location = `/s?pub_user_type=${category[active]}&address=${
        location.location.search
      }&bounds=${location.location.selectedPlace.bounds.ne.lat}%2C${
        location.location.selectedPlace.bounds.ne.lng
      }%2C${location.location.selectedPlace.bounds.sw.lat}%2C${
        location.location.selectedPlace.bounds.sw.lng
      }&dates=${date[0]}%2C${date[1]}`;
    }
  }

  render() {
    return (
      <div>
        <div className={css.HeroSearch}>
{/*
          <div
            className={`${css.HeroPick} ${
              this.state.active == 'owner' ? css.HeroPickActive : null
            }`}
            onClick={() => {
              this.setActive('owner');
            }}
          >
            <div className={css.ownerImg}></div>
            <p>Find a<br />House Sit</p>
          </div>

          <div
            className={`${css.HeroPick} ${
              this.state.active == 'sitter' ? css.HeroPickActive : null
            }`}
            onClick={() => {
              this.setActive('sitter');
            }}
          >
            <div className={css.sitterImg}></div>
            <p>Find a<br />Pet Sitter</p>
          </div>

          <div
            className={`${css.HeroPick} ${
              this.state.active == 'service' ? css.HeroPickActive : null
            }`}
            onClick={() => {
              this.setActive('service');
            }}
          >
            <div className={css.serviceImg}></div>
            <p>Find a<br />Pet Service</p>
          </div>
          
          */}

        </div>
        <div className={css.HeroMain}>
          {/* <input className={css.HeroInput} type="search" placeholder="e.g London, New York..." /> */}
          <TopbarSearchForm
            className={css.HeroAutocomplete}
            onSubmit={values => {
              this.setState({ location: values });
            }}
            form="TopbarSearchFormDesktop"
          />
          <Flatpickr
            placeholder="Pick a date"
            className={css.flatpickr}
            options={{
              mode: 'range',
              minDate: new Date(),
            }}
            onChange={date => {
              this.setState({ date });
            }}
          />
          {/* <DatePick /> */}
          <button
            onClick={() => {
              this.handleSubmit();
            }}
            className={css.goBtn}
          >
            <span>Search</span>
          </button>
          {/* <div className={css.locationIcon}>
            <img src={search} />
          </div> */}
        </div>
      </div>
    );
  }
}

export default HeroSearch;
