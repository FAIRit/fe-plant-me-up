import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class SinglePlantTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textarea: "",
      date: new Date().toISOString().slice(0, 10),
      events: []
    };
  }

  handleAddEvent = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddDecsription = e => {
    this.setState({
      textarea: e.target.value
    });
  };

  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const plantId = this.props.match.params.plantId;
    const eventsRef = firebase.database().ref(`plants/${plantId}/events`);
    const event = {
      title: this.state.text,
      description: this.state.textarea,
      date: this.state.date
    };
    eventsRef.push(event);
    this.setState({
      text: "",
      textarea: "",
      date: new Date().toISOString().slice(0, 10)
    });
  };

  componentDidMount() {
    const eventsRef = firebase.database().ref("events");
    eventsRef.on("value", snapshot => {
      let events = snapshot.val();
      let newState = [];
      for (let event in events) {
        newState.push({
          id: event,
          title: events[event].title,
          description: events[event].description,
          date: events[event].date
        });
      }
      this.setState({
        events: newState
      });
    });
  }

  removeEvent(eventId) {
    const eventRef = firebase.database().ref(`/events/${eventId}`);
    eventRef.remove();
  }

  render() {
    return (
      <div className="c-single-plant-timeline">
        <div>
          <form onSubmit={this.handleSubmit} className="u-form">
            <input
              type="text"
              name="text"
              placeholder="dodaj wydarzenie"
              onChange={this.handleAddEvent}
              value={this.state.text}
            />

            <input
              type="date"
              value={this.state.date}
              onChange={this.handleDate}
            />
            <textarea
              type="textarea"
              name="textarea"
              placeholder="dodaj opis"
              onChange={this.handleAddDecsription}
              value={this.state.textarea}
              rows={2}
              cols={30}
            />
            <button className="btn">dodaj</button>
          </form>
        </div>
        <div>
          <div className="c-timeline-list-display list-display">
            <ul>
              {this.state.events.map(event => {
                return (
                  <li className="list-item" key={event.id}>
                    <span className="list-star">&#10045;</span>
                    <h3>
                      {event.date} - {event.title}
                    </h3>
                    <p className="list-add-text">{event.description}</p>
                    <button
                      className="btn--remove"
                      onClick={() => this.removeEvent(event.id)}
                    >
                      <FontAwesomeIcon icon="times-circle" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
