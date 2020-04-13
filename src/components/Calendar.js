import React, { Component } from "react";
import moment from "moment";
import "moment/locale/pl";
import { EventCalendar } from "../components/utilities/EventCalendar";

export class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateContext: moment(),
      today: moment(),

      selectedDay: null,
      isEventAdded: false,
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [],
      showEvents: false,
    };
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  };
  month = () => {
    return this.state.dateContext.format("MMMM");
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  currentDate = () => {
    console.log("currentDate: ", this.state.dateContext.get("date"));
    return this.state.dateContext.get("date");
  };
  currentDay = () => {
    return this.state.dateContext.format("D");
  };

  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf("month").format("d");
    return firstDay;
  };

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext,
    });
  };

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext,
    });
  };

  MonthDisplay = () => {
    return <span className="label-month">{this.month()}</span>;
  };

  YearDisplay = () => {
    return <span className="label-year">{this.year()}</span>;
  };

  onDayClick = (e, day) => {
    this.setState({
      selectedDay: day,
      isEventAdded: true,
    });
  };

  render() {
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">
          {day}
        </td>
      );
    });

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <td key={i * 80} className="emptySlot">
          {""}
        </td>
      );
    }

    console.log("blanks: ", blanks);

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = d === this.currentDay() ? "day current-day" : "day";
      let selectedClass = d === this.state.selectedDay ? " selected-day " : "";
      daysInMonth.push(
        <td key={d} className={className + selectedClass}>
          <span
            onClick={(e) => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }

    console.log("days: ", daysInMonth);

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElems = rows.map((d, i) => {
      return <tr key={i * 100}>{d}</tr>;
    });

    return (
      <div className="c-page">
        <h1>kalendarz</h1>
        <div className="c-site-calendar">
          <div className="c-site-calendar-header">
            <p
              onClick={(e) => {
                this.prevMonth();
              }}
            >
              &#10094;
            </p>
            <div>
              <this.MonthDisplay />
              &nbsp;
              <this.YearDisplay />
            </div>
            <p
              onClick={(e) => {
                this.nextMonth();
              }}
            >
              &#10095;
            </p>
          </div>
          <table className="c-site-calendar-body">
            <tbody>
              <tr>{weekdays}</tr>
              {trElems}
            </tbody>
          </table>
          {this.state.isEventAdded && (
            <EventCalendar
              inEventAdded={this.state.isEventAdded}
              onUpdate={() => this.setState({ isEventAdded: false })}
            />
          )}
        </div>
      </div> //---pierwszy div koniec
    );
  }
}
