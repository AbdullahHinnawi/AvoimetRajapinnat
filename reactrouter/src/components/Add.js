import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";



const Add = () => {

  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };
  const handleEventCategoryChange = (e) => {
    setEventCategory(e.target.value);
  };
  const handleEventAddressChange = (e) => {
    setEventAddress(e.target.value);
  };
  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };
  const handleEventTimeChange = (e) => {
    setEventTime(e.target.value);
  };


  const eventNameError = () => {
    return eventName === '';
  };
  const eventCategoryError = () => {
    return eventCategory === '';
  };
  const eventAddressError = () => {
    return eventAddress === '';
  };
  const eventDateError = () => {
    return eventDate === '';
  };
  const eventTimeError = () => {
    return eventTime === '';
  };


  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if(eventNameError() || eventCategoryError() || eventAddressError() || eventDateError() || eventTimeError()){
      setError(true);
      setSuccess(false);
    }else {
      const event = {
        name: eventName,
        category: eventCategory,
        address: eventAddress,
        date: eventDate,
        time: eventTime
      };

      setEventName('');
      setEventCategory('');
      setEventAddress('');
      setEventDate('');
      setEventTime('');

      console.log("NEW event OBJECT: ", event);
      axios.post("http://localhost:3001/events/", event).then(res => {
        console.log("#### Add event response ", res);
        setError(false);
        setSuccess(true);
        setSubmitted(false);

      }).catch(err => {
        console.log("Error: ", err);
      });
    }

  };


    return (
        <Styles>
          <div className="wrapper">
                <h3 className="left">Add Event</h3>
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Name</label><br/>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={eventName}
                        onChange={handleEventNameChange}
                    />
                    <div className="errorMessage">
                      {submitted && eventNameError() ? 'Event name is required' : ''}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label><br/>
                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={eventCategory}
                        onChange={handleEventCategoryChange}
                    />
                    <div className="errorMessage">
                      {submitted && eventCategoryError() ? 'Event category is required' : ''}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Address</label><br/>
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={eventAddress}
                        onChange={handleEventAddressChange}
                    />
                    <div className="errorMessage">
                      {submitted && eventAddressError() ? 'Event address is required' : ''}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Date</label><br/>
                    <input
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={eventDate}
                        onChange={handleEventDateChange}
                    />
                    <div className="errorMessage">
                      {submitted && eventDateError() ? 'Event date is required' : ''}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Time</label><br/>
                    <input
                        type="time"
                        placeholder="Time"
                        name="time"
                        value={eventTime}
                        onChange={handleEventTimeChange}
                    />
                    <div className="errorMessage">
                      {submitted && eventTimeError() ? 'Event time is required' : ''}
                    </div>
                  </div>
                  <div className="form-group">
                  <input
                      type="submit"
                      value="Add Event"
                      className="btn p-2  mt-3"
                  />
                  </div>
                </form>

                <div>
                  <p id="errorMessage">
                    {submitted && error ? "❗Please fill out all required fields" : ''}
                  </p>
                   <p className="successMessage">
                     {success ? "✅ Event successfully added" : ''}
                   </p>
                </div>


          </div>
        </Styles>
    );

};
export default Add;

const Styles = styled.div`
.btn{
background-color: #24a0ed
}
.successMessage{
color: green;
  font-size: 1em;
}
.errorMessage {
  color: red;
  font-size: 0.75em;
}
#errorMessage{
color: red;
  font-size: 1em;
}
`;


/*
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        category:'',
        address:'',
        date:'',
        time:'',
      message: "",
      visibleSuccess: false,
      visibleError: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  toggleSuccess() {
    this.setState({
      visibleSuccess: !this.state.visibleSuccess
    });
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const event = {
      name: this.state.name,
      category: this.state.category,
      address: this.state.address,
      date: this.state.date,
      time: this.state.time
    };
    this.setState({
      name: '',
      category: '',
      address:'',
      date:'',
      time:''

    });

    console.log("NEW event OBJECT: ", event);
    axios.post("http://localhost:3001/events/", event)
    .then(res => {
      console.log("#### Add event response ", res);
      this.setState({
        message: "Event added successfully!"
      });
    })
    .catch(err => {
      console.log("Error: ", err);
    });
  }
  render() {

    return (
        <Styles>
          <div className="wrapper">
                <h3 className="left">Add Event</h3>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Name</label><br/>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label><br/>
                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={this.state.category}
                        onChange={this.onChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Address</label><br/>
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Date</label><br/>
                    <input
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={this.state.date}
                        onChange={this.onChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Time</label><br/>
                    <input
                        type="time"
                        placeholder="Time"
                        name="time"
                        value={this.state.time}
                        onChange={this.onChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                  <input
                      type="submit"
                      value="Add Event"
                      className="btn p-2  mt-3"
                  />
                  </div>
                </form>

            <div>
              <Alert
                  isOpen={this.state.visibleSuccess}
                  toggle={this.toggleSuccess.bind(this)}
                  className=" message"
                  color="success"
              >
                {this.state.message}
              </Alert>
            </div>

          </div>
        </Styles>
    );
  }
}
export default Add;

const Styles = styled.div`
.btn{
background-color: #24a0ed
}
.message{
color: green
}
`;


 */
