import Grid from '@material-ui/core/Grid'
import React from 'react'
import defaultTo from 'lodash/defaultTo'
import get from 'lodash/get'
import { EcologiTree } from '../../assets/EcologiTree'
import { convertMoneyToNumber } from '../../util/currency'

import css from './BookingBreakdown.css'

const EcologiBreakdown = ({ transaction, isProvider }) => {
  let trees = 1
  if (transaction && transaction.attributes && transaction.attributes.payinTotal) {
    trees = (convertMoneyToNumber(transaction.attributes.payinTotal) * 0.01) / 0.18
  }

  return (
    <div className={css.ecologiContainer}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <div className={css.dataContainer}>
            <EcologiTree className={css.ecologiTree}/>
            <span className={css.ecologiCounter}>{defaultTo(trees, 1).toFixed(0)}</span>
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center" alignItems="center">
          <Grid item style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
            <p className={css.learnMoreText}>
              {
                `${isProvider ? 'This' : 'Your'} booking will plant ${defaultTo(trees, 1).toFixed(0)} trees`
              }
              <br/>
              <a href="" style={{ textDecoration: 'underline' }}>Learn more</a> about our partnership with Ecologi.
            </p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default EcologiBreakdown
