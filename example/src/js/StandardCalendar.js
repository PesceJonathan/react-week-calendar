import React from 'react';
import moment from 'moment';
// import WeekCalendar from "../../../dist/WeekCalendar"
import WeekCalendar from "../../../src/WeekCalendar"

export default class StandardCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUid: 4,
      selectedIntervals: [
        {
          uid: 1,
          start: moment({h: 10, m: 5}),
          end: moment({h: 12, m: 5}),
          value: "Booked by Smith"
        },
        {
          uid: 2,
          start: moment({h: 13, m: 0}).add(2,'d'),
          end: moment({h: 13, m: 45}).add(2,'d'),
          value: "Closed"
        },
      ]
    }
  }

  handleEventRemove = (event) => {
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({selectedIntervals});
    }

  }

  handleEventUpdate = (event) => {
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({selectedIntervals});
    }
  }

  handleSelect = (newIntervals) => {
    const {lastUid, selectedIntervals} = this.state;
    const intervals = newIntervals.map( (interval, index) => {

      return {
        ...interval,
        uid: lastUid + index
      }
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    })
  }

  render() {
    return <WeekCalendar
      startTime = {moment({h: 0, m: 0})}
      endTime = {moment({h: 23, m: 59})}
      numberOfDays= {7}
      selectedIntervals = {this.state.selectedIntervals}
      onIntervalSelect = {this.handleSelect}
      onIntervalUpdate = {this.handleEventUpdate}
      onIntervalRemove = {this.handleEventRemove}
    />
  }
}
