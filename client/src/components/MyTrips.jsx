import React, { Component } from 'react'
import axios from 'axios';

// class MyTrips extends Component {
//   constructor(props) {
//     super(props)
//   }



  // componentDidMount() {
  //  axios.get('/trips/' + this.props.user.trips).then(res=>{
  //     console.log(res.data);
  //   })
  // }




  // render() {
  //   return (
  //     <>
  //     </>
  //   )
  

const MyTrips = props => {
  let trips;
  if (props.user.trips.length) {
    trips = props.user.trips.map((trip, i) => {
      return <h4 key={i}>{trip.tripName}</h4>
    })
  } else {
    trips = <h4>Create a New Trip!</h4>
  }
  return (
      <>
        <div>
          {trips} 
          {/* Why is this not showing up */}
        </div>
      {/* // Returns a list of trips 
        * // We will render the "nameTrip state"
        
      */}
      
      </>
  )
}


// let airlines; 
//     if (props.airlines.length) {
//         airlines = props.airlines.map((airline, i) => {
//             return <p key={i}>{airline.name}</p>
//         })
//     } else {
//         airlines = <p>No Airline Data!</p>
//     }
//     return (
//         <div>
//             <h3>All the Airlines:</h3>
//             {airlines}
//             <hr/>
//             <form onSubmit={props.handleSubmit}>
//                 <input onChange={props.handleAirlineNameChange} type="text" name="name" value={props.name} placeholder="Airline Name"/>
//                 <input onChange={props.handleAirlineDestinationsChange} type="text" destinations="destinations" value={props.destinations}/>
//                 <input onChange={props.handleAirlineFleetSizeChange} type="text" fleetsize="fleetsize" value={props.fleetsize}/>
//                 <input type="submit" value="Add Airline"/>
//             </form>
//         </div>
//     )
//   }
// }
export default MyTrips;

