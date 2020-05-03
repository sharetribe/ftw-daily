import React from "react";
import ReactDOM from "react-dom";

import css from "./HeroImages.css";

class HeroImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://i.imgur.com/vETpfvn.png",
        "https://i.imgur.com/YagmVls.png"
      ],
      selectedImage: "https://i.imgur.com/vETpfvn.png"
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => {
        if (prevState.selectedImage === this.state.images[0]) {
          return {
            selectedImage: this.state.images[1]
          };
        } else {
          return {
            selectedImage: this.state.images[0]
          };
        }
      });
    }, 2000);
  }

  render() {
    return (
      <div className={css.imageHalf}>
        <img className={css.imageImg} src={this.state.selectedImage} />
      </div>
    );
  }
}

export default HeroImages;