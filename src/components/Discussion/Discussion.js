import React, { Component, PropTypes } from 'react';

import css from './Discussion.css';

const Message = props => {
  const { date, author, text } = props;
  const timestamp = `${date.toISOString()}`;
  return (
    <li>
      <span className={css.messageDate}>{timestamp}</span>
      <div className={css.messageText}>{text}</div>
      <span className={css.messageAuthor}>{author}</span>
    </li>
  );
};

const { instanceOf, string, arrayOf, object } = PropTypes;

Message.propTypes = {
  date: instanceOf(Date).isRequired,
  author: string.isRequired,
  text: string.isRequired,
};

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange() {
    this.setState({ message: this.input.value });
  }
  handleNewMessage(e) {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('new message:', this.input.value);
    this.setState({ message: '' });
  }
  render() {
    return (
      <div className={this.props.className}>
        <ul>
          {this.props.messages.map(msg => <Message key={msg.id} {...msg} />)}
        </ul>
        <form className={css.sendMessageForm} onSubmit={this.handleNewMessage}>
          <input
            className={css.sendMessageInput}
            autoFocus
            type="text"
            ref={input => {
              this.input = input;
            }}
            value={this.state.message}
            onChange={this.handleOnChange}
          />
          <button className={css.sendMessageButton} type="submit">Send</button>
        </form>
      </div>
    );
  }
}

Discussion.defaultProps = { className: null, messages: [] };

Discussion.propTypes = { className: string, messages: arrayOf(object) };

export default Discussion;
