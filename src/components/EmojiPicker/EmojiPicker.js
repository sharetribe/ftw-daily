import React, { useState  } from 'react';
// import Picker from 'emoji-picker-react';
// import css from './EmojiPicker.css';
//import classNames from 'classnames';
// import { OutsideClickHandler } from '../../components';

const EmojiPicker = props => {
    //const [chosenEmoji, setChosenEmoji] = useState(null);
    // const [emojiVisibility, setEmojiVisibility] = useState(false);
    
    // const onEmojiClick = (event, emojiObject) => {
    //     //setChosenEmoji(emojiObject);
    //     emojiObject && emojiObject.emoji && props.handleEmojiSelect(event, emojiObject.emoji)
    // }

    // const handleEmojiBarClick = flag => setEmojiVisibility(flag)
    
    return (
        // <div className={css.emojiWrapper}>
        //     <div className={emojiVisibility ? classNames(css.emojiTogglerClicked, css.emojiToggler) : css.emojiToggler}
        //      onClick={() => handleEmojiBarClick(!emojiVisibility)}>
        //         😄
        //     </div>
        //     <OutsideClickHandler onOutsideClick={ () => handleEmojiBarClick(false)} className={emojiVisibility ? css.emojiBar : css.emojiBarHidden}>
        //         <Picker onEmojiClick={onEmojiClick}/>     
        //     </OutsideClickHandler>
        // </div>
        null
    );
}

export default EmojiPicker;