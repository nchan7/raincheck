import React from 'react';
import axios from 'axios';

class EditTrip extends React.Component {
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
            // tripId: ''
        }
        this.handleTripNameChange = this.handleTripNameChange.bind(this)
        this.handleZipStartChange = this.handleZipStartChange.bind(this)
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
        this.handleTravelTimeChange = this.handleTravelTimeChange.bind(this)
        this.handleZipDestChange = this.handleZipDestChange.bind(this)
        this.handleReturnTimeChange = this.handleReturnTimeChange.bind(this)
        this.handleReturnTravelTimeChange = this.handleReturnTravelTimeChange.bind(this)
        this.handleEditTripSubmit = this.handleEditTripSubmit.bind(this)
        this.populatePlaceholderValues = this.populatePlaceholderValues.bind(this)
    }

    // Functions to handle the EditTrip Form submissions
    handleTripNameChange(e) {
        this.setState({
            tripName: e.target.value
        })
    }
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
    handleEditTripSubmit(e) {
        e.preventDefault()
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.put(`/trips/${this.props.match.params.id}`, {
            tripName: this.state.tripName,
            zipStart: this.state.zipStart, 
            startTime: this.state.startTime,
            travelTime: this.state.travelTime,
            zipDest: this.state.zipDest,
            returnTime: this.state.returnTime,
            returnTravelTime: this.state.returnTravelTime
        }, config).then(res => {
            axios.get("/trips", config)
                .then(res => {
                    let trips = res.data
                    let user = Object.assign(this.props.user)
                    user.trips = trips
                    this.props.liftUser(user)
                })
        }).then(()=> {
            this.props.history.push('/trips/mytrips')
        }).catch(err => {
            this.setState({
                message: "Trip not saved. Try again.",
                err: err
            })
        })
    }

    populatePlaceholderValues() {        
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.get(`/trips/${this.props.match.params.id}`, config).then(res => {
            console.log(res.data)
            this.setState({
                tripName: res.data.trip.tripName,
                zipStart: res.data.trip.zipStart, 
                startTime: res.data.trip.startTime,
                travelTime: res.data.trip.travelTime,
                zipDest: res.data.trip.zipDest,
                returnTime: res.data.trip.returnTime,
                returnTravelTime: res.data.trip.returnTravelTime
            })

        }).catch(err => {
            this.setState({
                message: "Data not aquired from db.",
                err: err
            })
        })
    }
    
    componentDidMount() {
        this.populatePlaceholderValues()
    }
    
    render() {
        return (
            <>
      {/* // Let's return the form that allows people to save a trip. Below is sample code*/}
            <div className="">
            <h3>Edit a Trip</h3>
            <form onSubmit={this.handleEditTripSubmit}>
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
                    type="datetime-local"
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
                
                <input onChange={this.handleReturnTimeChange}
                    value={this.state.returnTime}
                    type="datetime-local"
                    name="returnTime"
                    placeholder="Enter your return trip start time" /><br />
                
                <input onChange={this.handleReturnTravelTimeChange}
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

export default EditTrip;