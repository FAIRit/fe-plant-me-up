import React, { Component } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      momentContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false,
    };
  }

  render() {
    return (
      <div className="c-page">
        <h1>kalendarz</h1>
        <div className="c-site-calendar"></div>
      </div> //---pierwszy div koniec
    );
  }
}
