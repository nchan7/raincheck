import React from 'react';
import axios from 'axios';

class NewTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tripName: '',
            zipStart: '',
            startTime: '',
            travelTime: '',
            zipDest: '',
            returnTime: '',
            returnTravelTime: ''        
        }
        this.handleZipStartChange = this.handleZipStartChange.bind(this)
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
        this.handleTravelTimeChange = this.handleTravelTimeChange.bind(this)
        this.handleZipDestChange = this.handleZipDestChange.bind(this)
        this.handleReturnTimeChange = this.handleReturnTimeChange.bind(this)
        this.handleReturnTravelTimeChange = this.handleReturnTravelTimeChange.bind(this)
        this.handleNewTripSubmit = this.handleNewTripSubmit.bind(this)
    }
    // Functions to handle the NewTrip Form submissions
  handleZipStartChange(e) { 
    this.setState({
        zipStart: e.target.value
    })
  }
  handleStartTimeChange(e) { 
    this.setState({
        startTime: e.target.value
    })
  }
  handleTravelTimeChange(e) { 
    this.setState({
        travelTime: e.target.value
    })
  }
  handleZipDestChange(e) { 
    this.setState({
        zipDest: e.target.value
    })
  }
  handleReturnTimeChange(e) { 
    this.setState({
        returnTime: e.target.value
    })
  }
  handleReturnTravelTimeChange(e) { 
    this.setState({
        returnTravelTime: e.target.value
    })
  }

  handleNewTripSubmit(e) {
    e.preventDefault()
    axios.post('/trips', {
        tripName: this.state.tripName,
        zipStart: this.state.zipStart, 
        startTime: this.state.startTime,
        travelTime: this.state.travelTime,
        zipDest: this.state.zipDest,
        returnTime: this.state.returnTime,
        returnTravelTime: this.state.returnTravelTime
    }).then(res => {
        if (res.data.type === 'error') {
            this.setState({
                message: res.data.message
            })
        } else {
            this.setState({
                message: res.data.message
            })
        }
    }).catch(err => {
        this.setState({
            message: "Trip not saved. Try again."
        })
    })
}
  render() {

      return (
          <>
      {/* // Let's return the form that allows people to save a trip. Below is sample code*/}
            <div className="">
            <h3>Create a New Trip</h3>
            <form onSubmit={this.handleNewTripSubmit}>
                <input onChange={this.handleTripNameChange}
                    value={this.state.tripName}
                    type="text"
                    name="tripName"
                    placeholder="Trip title..." /><br />
                <input onChange={this.handleZipStartChange}
                    value={this.state.zipStart}
                    type="number"
                    name="zipStart"
                    placeholder="Enter your origin zipcode" /><br />
                <input onChange={this.handleStartTimeChange}
                    value={this.state.startTime}
                    type="time"
                    name="startTime"
                    placeholder="Enter your departure time" /><br />
                <input onChange={this.handleTravelTimeChange}
                    value={this.state.travelTime}
                    type="number"
                    name="travelTime"
                    placeholder="Enter your estimated travel time..." /><br />
                <input onChange={this.handleZipDestChange}
                    value={this.state.zipDest}
                    type="number"
                    name="zipDest"
                    placeholder="Enter your destination zipcode" /><br />
                <input onChange={this.handleReturnTime}
                    value={this.state.returnTime}
                    type="time"
                    name="returnTime"
                    placeholder="Enter your return trip start time" /><br />
                <input onChange={this.handleReturnTravelTime}
                    value={this.state.returnTravelTime}
                    type="number"
                    name="returnTravelTime"
                    placeholder="Enter your estimated travel time..." /><br />
                <input type="submit" value="Save Trip!" />
            </form>
            </div>
            </>
        )
            
            
    }
            
}
       
export default NewTrip;
        