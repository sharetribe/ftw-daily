import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import React, { Component, useState } from 'react'
import {
  bool, number, object, string
} from 'prop-types'
import classNames from 'classnames'
import { propTypes } from '../../util/types'
import config from '../../config'
import { StaticMap, DynamicMap, isMapsLibLoaded } from './MapboxMap'

import css from './Map.css'

const Map = (props) => {
  const {
    className,
    rootClassName,
    mapRootClassName,
    address,
    center,
    obfuscatedCenter,
    zoom,
    mapsConfig,
    useStaticMap,
    metadata,
    createSurf
  } = props
  const classes = classNames(rootClassName || css.root, className)
  const mapClasses = mapRootClassName || css.mapRoot

  const [staticMap, setStaticMap] = useState(useStaticMap)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isVisible = currPos.y < -1000
      if (isVisible && staticMap) {
        setStaticMap(false)
      }
    },
    [staticMap]
  )

  if (mapsConfig.fuzzy.enabled && !obfuscatedCenter) {
    throw new Error(
      'Map: obfuscatedCenter prop is required when config.maps.fuzzy.enabled === true'
    )
  }
  if (!mapsConfig.fuzzy.enabled && !center) {
    throw new Error('Map: center prop is required when config.maps.fuzzy.enabled === false')
  }

  const location = mapsConfig.fuzzy.enabled ? obfuscatedCenter : center
  console.log(staticMap)
  return !isMapsLibLoaded() ? (
    <div className={classes} />
  ) : staticMap ? (
    <StaticMap center={location} zoom={zoom} address={address} mapsConfig={mapsConfig} />
  ) : (
    <DynamicMap
      containerElement={<div className={classes} />}
      mapElement={<div className={mapClasses} />}
      containerClassName={classes}
      mapClassName={mapClasses}
      center={location}
      zoom={zoom}
      address={address}
      mapsConfig={mapsConfig}
      metadata={metadata}
      createSurf={createSurf}
    />
  )
}

Map.defaultProps = {
  className: null,
  rootClassName: null,
  mapRootClassName: null,
  address: '',
  zoom: config.maps.fuzzy.enabled ? config.maps.fuzzy.defaultZoomLevel : 11,
  mapsConfig: config.maps,
  useStaticMap: false,
}

Map.propTypes = {
  className: string,
  rootClassName: string,
  mapRootClassName: string,
  address: string,
  center: propTypes.latlng,
  obfuscatedCenter: propTypes.latlng,
  zoom: number,
  mapsConfig: object,
  useStaticMap: bool,
  metadata: object,
  createSurf: bool
}

export default Map
