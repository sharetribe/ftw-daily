/*
 * Renders a set of options with selected and non-selected values.
 *
 * The corresponding component when selecting the values is
 * FieldCheckboxGroup.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';

import css from './PropertyGroup.css';

const checkSelected = (options, selectedOptions) => {
  return options.map(option => ({
    key: option.key,
    label: option.label,
    isSelected: includes(selectedOptions, option.key),
  }));
};

const IconCheck = props => {
  const isVisible = props.isVisible;
  const classes = isVisible ? css.checkIcon : classNames(css.checkIcon, css.hidden);

  return (
    <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path
        className={css.marketplaceFill}
        d="M2.636621 7.7824771L.3573694 5.6447948c-.4764924-.4739011-.4764924-1.2418639 0-1.7181952.4777142-.473901 1.251098-.473901 1.7288122 0l1.260291 1.1254783L6.1721653.505847C6.565577-.0373166 7.326743-.1636902 7.8777637.227582c.5473554.3912721.6731983 1.150729.2797866 1.6951076L4.4924979 7.631801c-.2199195.306213-.5803433.5067096-.9920816.5067096-.3225487 0-.6328797-.1263736-.8637952-.3560334z"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Item = props => {
  const { label, isSelected } = props;
  const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
  return (
    <li className={css.item}>
      <span className={css.iconWrapper}>
        <IconCheck isVisible={isSelected} />
      </span>
      <div className={css.labelWrapper}>
        <span className={labelClass}>{label}</span>
      </div>
    </li>
  );
};

const PropertyGroup = props => {
  const { rootClassName, className, id, options, selectedOptions, twoColumns,publicData, flag } = props;
  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(classes, css.twoColumns) : classes;
  const checked = checkSelected(options, selectedOptions);
  const weightIndexAry = ['giant','large','medium','small'];
  const roomAry = ['Bedroom','Bathroom'];
  
  return publicData !== null ? (
    <div>
      <ul className={listClasses}>
        {checked.map(option => {
          
          return (
            <Item 
              key={`${id}.${option.key}`} 
              label={
                option.key === "other" && publicData && publicData.other?
                publicData.other
                :option.label
              } 
              isSelected={option.isSelected} />
          )
        })}
      </ul>
      {
        flag === 2?(
          <div className={css.infoPanel}>
            {
              roomAry.map(e => {
                // console.log('room',e);
                // console.log('publicData',publicData)
                const _e = e.toLowerCase();
                if(publicData && publicData[_e]){
                  return(
                  <div>
                    <label className={css.infoItem}>
                      <span className={ css.infoItemLabel }>
                        {e} &#8226; 
                      </span> 
                      { publicData[_e] }
                    </label>
                  </div>
                  // 'sdfasdffs'
                  )
                }
              })
            }
          {/* {publicData.bedroom?(<div><label className={css.infoItem}><span className={ css.infoItemLabel }> Bedroom </span> { publicData.bedroom }</label></div>):null}
          {publicData.bathroom?(<div><label className={css.infoItem}><span className={ css.infoItemLabel }> Bathroom </span> { publicData.bathroom }</label></div>):null} */}
          </div>
        ):null
      }
    </div>
  ):null
  // return publicData !== null && flag === 3?(
    
  //   <ul className={listClasses}>
      
  //     {checked.map(option => {
  //       var weight=null;
  //       if(option.isSelected){
  //         if(String(option.key).toLowerCase() === "other"){
  //           weight = publicData['other'];
  //         }else{
            
  //           options.forEach(function(e,i){
              
  //             if(String(e.key).toLowerCase() === String(option.key).toLowerCase()){
  //               var weightLabel = publicData[option.key];
  //               if(weightLabel != null ){
  //                 var index = weightIndexAry.indexOf(weightLabel);
  //                 weight = e.weight[index].key + e.weight[index].label;
  //               }
                
  //             }
  //           })
          
  //         }
  //       }
       
  //       if(weight === null){
  //         return (
  //           <Item key={`${id}.${option.key}`} label={String(option.label)} isSelected={option.isSelected} />
  //         )
  //       }else{
  //         return (
  //           <Item key={`${id}.${option.key}`} label={String(option.label) +' => '+ String(weight)} isSelected={option.isSelected} />
  //         )
  //       }
  //     })}
  //   </ul>
  // )
  // :
  // (
  //   <div>
  //     <ul className={listClasses}>
  //       {checked.map(option => {
          
  //         return (
  //           <Item key={`${id}.${option.key}`} label={option.label} isSelected={option.isSelected} />
  //         )
  //       })}
  //     </ul>
  //     {
  //       flag === 2?(
  //         <div className={css.infoPanel}>
  //         {publicData.bedroom?(<div><label className={css.infoItem}><span className={ css.infoItemLabel }> Bedroom </span> { publicData.bedroom }</label></div>):null}
  //         {publicData.bathroom?(<div><label className={css.infoItem}><span className={ css.infoItemLabel }> Bathroom </span> { publicData.bathroom }</label></div>):null}
  //         </div>
  //       ):null
  //     }
  //   </div>
  // )
};

PropertyGroup.defaultProps = {
  rootClassName: null,
  className: null,
  selectedOptions: [],
  twoColumns: false,
};

const { arrayOf, bool, node, shape, string } = PropTypes;

PropertyGroup.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ),
  selectedOptions: arrayOf(string),
  twoColumns: bool,
};

export default PropertyGroup;
