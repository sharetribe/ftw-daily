import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { lazyLoadWithDimensions } from '../../util/contextHelpers'

import css from './SingleRowImageGridList.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginLeft: -20,
    marginRight: -20,
    paddingTop: 5,
    paddingBottom: 5,
    [theme.breakpoints.up('lg')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  tile: {
    border: 'solid 5px yellow'
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

class GridImage extends React.Component {
  render() {
    return (
      <img className={css.gridImage} src={this.props.tile.img} alt={this.props.tile.title} />
    )
  }
}

const LazyGridImage = lazyLoadWithDimensions(GridImage)

const SingleLineGridList = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        cols={3}
        spacing={10}
        cellHeight={300}
      >
        {props.images.map((tile) => (
          <GridListTile
            key={tile.img}
            imgFullWidth={true}
            cols={2}
            classes={classes.tile}
          >
            <div
              className={css.gridImageContainer}
              onClick={() => console.log('click')}
            >
              <LazyGridImage tile={tile} />
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default SingleLineGridList
