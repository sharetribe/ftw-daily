import React from 'react'

export const IconRadioButton = (props) => (
  <svg className={props.className} width="100px" height="100px" viewBox="0 0 100 100">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="noun_unchecked-radio-button_3139889" fill="#000000" fill-rule="nonzero">
        <path d="M50,3 C75.916,3 97,24.084 97,50 C97,75.916 75.916,97 50,97 C24.084,97 3,75.916 3,50 C3,24.084 24.084,3 50,3 M50,0 C22.386,0 0,22.386 0,50 C0,77.614 22.386,100 50,100 C77.614,100 100,77.614 100,50 C100,22.386 77.614,0 50,0 L50,0 Z" id="Shape"></path>
        {
          props.checked ? <circle id="Oval" cx="50" cy="50" r="35.5"></circle> : null
        }
      </g>
    </g>
  </svg>
)
