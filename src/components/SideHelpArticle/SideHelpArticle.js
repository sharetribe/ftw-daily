import React from 'react';

import arrowRight from '../SideHelp/images/arrowright.png';
import arrowLeft from '../SideHelp/images/arrowleft.png';

import css from '../SideHelp/SideHelp.css';

class SideHelpArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return !this.props.single ? (
      <div className={css.helpContent}>
        <h3 className={css.articleTitle}>{this.props.title}</h3>
        <p className={css.articleParagraph}>{this.props.description}</p>
        <button
          className={css.articleButton}
          onClick={() => {
            this.props.onExpand(this.props.id);
          }}
        >
          Read More <img className={css.readmoreImg} src={arrowRight} />
        </button>
      </div>
    ) : this.props.active == this.props.id ? (
      <div className={css.helpContent}>
        <button
          className={css.articleButton}
          onClick={() => {
            this.props.onClose();
          }}
        >
          <img className={css.backImg} src={arrowLeft} /> Back
        </button>
        {this.props.children}
      </div>
    ) : null;
  }
}

export default SideHelpArticle;
