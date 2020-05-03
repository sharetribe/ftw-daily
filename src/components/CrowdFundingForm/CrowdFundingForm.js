import React from "react";
import axios from "axios"; // For making client request.

import css from './CrowdFundingForm.css';
 
class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: "", surname: "", email: "", intrest: ""};
  }
  
  handleForm = e => {
    axios.post(
        "https://formcarry.com/s/kpQBj4iY-3V", 
        this.state, 
        {headers: {"Accept": "application/json"}}
      )
      .then(function (response) {
        
        // access response.data in order to check formcarry response
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
  }
 
  handleFields = e => this.setState({ [e.target.name]: e.target.value });
 
  render() {
    return (
      <form className={css.FundingForm} onSubmit={this.handleForm}>
        <div class="success-message success-crowd"></div>
        <div class="error-message success-crowd"></div>
        <input type="email" id="email" name="email" placeholder="E-Mail address" required onChange={this.handleFields} />
        
        <input type="text" id="name" name="name" placeholder="First name" required onChange={this.handleFields} />
 
        <input type="text" id="surname" name="surname" placeholder="Last name" required onChange={this.handleFields} />
        <div className={css.FundingSelect}>
        <svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg"><path d="M6.53 7.472c.26.26.68.26.94 0l5.335-5.333c.26-.263.26-.684 0-.944-.26-.26-.683-.26-.943 0L7 6.056l-4.862-4.86c-.26-.26-.683-.26-.943 0-.26.26-.26.68 0 .943L6.53 7.47z" stroke="%234A4A4A" fill="%234A4A4A" fill-rule="evenodd"/></svg>
        <select id="intrest" name="intrest" required onChange={this.handleFields}>
            <option value="" selected disabled>Level of Interest</option>
            <option>£10 - £499</option>
            <option>£500 - £999</option>
            <option>£1,000 - £4,999</option>
            <option>£5,000 - £9,999</option>
            <option>£10,000 - £19,999</option>
            <option>£20,000 - £49,999</option>
            <option>£50,000 - £99,999</option>
            <option>£100,000+</option>
        </select>
        </div>

        <button type="submit">Send</button>
      </form>
    );
  }
}
 
export default Form;