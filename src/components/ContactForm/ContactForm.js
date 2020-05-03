import React from "react";
import axios from "axios"; // For making client request.
import css from "./ContactForm.css";
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", surname: "", email: "", message: "" };
  }
  handleForm = e => {
    axios
      .post("https://formcarry.com/s/LxMYb0c7kXC", this.state, {
        headers: { Accept: "application/json" }
      })
      .then(function(response) {
        const { data } = response;
        if (data.status == "success") {
          let successMessage = document.querySelector(".success-message");
          successMessage.innerHTML = "Thank you! We received your submission.";
          successMessage.style.display = "block";
          setTimeout(
            function() {
              successMessage.style.display = "none";
            }.bind(this),
            5000
          );
        }
      })
      .catch(function(error) {
        let errorMessage = document.querySelector(".error-message");
        errorMessage.innerHTML = "There has been error. Please try again.";
        errorMessage.style.display = "block";
        setTimeout(
          function() {
            errorMessage.style.display = "none";
          }.bind(this),
          5000
        );
      });
    e.preventDefault();
    this.setState({ name: "", surname: "", email: "", message: "" }); // <= here
  };
  handleFields = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <form className={css.contactForm} onSubmit={this.handleForm}>
        <div class="success-message"></div>
        <div class="error-message"></div>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          placeholder="First name"
          name="name"
          onChange={this.handleFields}
          value={this.state.name}
        />
        <label htmlFor="surname">Surname</label>
        <input
          required
          type="text"
          id="surname"
          name="surname"
          placeholder="Last name"
          onChange={this.handleFields}
          value={this.state.surname}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          onChange={this.handleFields}
          value={this.state.email}
        />
        <label htmlFor="message">Message</label>
        <textarea
          required
          name="message"
          id="message"
          placeholder="Your message"
          onChange={this.handleFields}
          value={this.state.message}
        ></textarea>
        <button id="how-button" type="submit">
          Send
        </button>
      </form>
    );
  }
}
export default ContactForm;

