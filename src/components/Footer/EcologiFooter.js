import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import get from 'lodash/get'
import axios from 'axios'
import { EcologiTree } from '../../assets/EcologiTree'

import css from './Footer.css'

class EcologiFooter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trees: 0,
    }
  }

  async componentDidMount() {
    const t = await axios.get('https://public.ecologi.com/users/coworksurf/trees')
    this.setState({ trees: get(t, 'data.total', 1433) })
  }

  render() {
    return (
      <div className={css.ecologiContainer}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <a href="https://ecologi.com/coworksurf" target="_blank">
              <div className={css.dataContainer}>
                <EcologiTree className={css.ecologiTree}/>
                <span className={css.ecologiCounter}>{this.state.trees}</span>
              </div>
            </a>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
              <p className={css.learnMoreText}>
                {
                  `Our partners and guests have helped plant ${this.state.trees} trees`
                }
                {/*<br/>*/}
                {/*<a href="https://ecologi.com/coworksurf" target="_blank" style={{ textDecoration: 'underline' }}>Learn more</a> about our partnership with Ecologi.*/}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default EcologiFooter
