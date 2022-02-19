import React from "react";
import './App.css';
class App extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
      items1: [],
      items2: [],
			DataisLoaded: false,
      DataisLoaded1: false,
      DataisLoaded2: false,
      icao: "EGCC",
      setICAO: "EGCC",
      lat: 0,
      lon: 0
		};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}
  
  handleChange(event) {
    this.setState({icao: event.target.value});
  }

  
  handleSubmit(event) {
    fetch(
      "https://avwx.rest/api/metar/" + this.state.icao + "?token=HX35cJh9UjbDRHNaCm6QqVI_qgyGq3Z_vuDCcZkbgCc")
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                items: json,
                DataisLoaded: true,
                setICAO: this.state.icao.toUpperCase(),
                
              });
              console.log(this.state.items);
            })

            fetch(
              "https://avwx.rest/api/station/" + this.state.icao + "?token=HX35cJh9UjbDRHNaCm6QqVI_qgyGq3Z_vuDCcZkbgCc")
                    .then((res1) => res1.json())
                    .then((json1) => {
                      this.setState({
                        items1: json1,
                        DataisLoaded1: true
                      });
                    })
    event.preventDefault();
    event.target.reset();

  }

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
    
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
      fetch(
        "https://avwx.rest/api/station/near/" + this.state.lat + "," + this.state.lon + "?token=HX35cJh9UjbDRHNaCm6QqVI_qgyGq3Z_vuDCcZkbgCc")
              .then((res2) => res2.json())
              .then((json2) => {
                this.setState({
                  items2: json2,
                  DataisLoaded2: true
                });
                console.log(json2);
                this.setState({
                  icao: json2[0].station.icao,
                  setICAO: json2[0].station.icao,
                })
      }).then(() =>{
        fetch(
          "https://avwx.rest/api/metar/" + this.state.icao + "?token=HX35cJh9UjbDRHNaCm6QqVI_qgyGq3Z_vuDCcZkbgCc")
                .then((res) => res.json())
                .then((json) => {
                  this.setState({
                    items: json,
                    DataisLoaded: true
                  });
                }).then(() => {
                  fetch(
                    "https://avwx.rest/api/station/" + this.state.icao + "?token=HX35cJh9UjbDRHNaCm6QqVI_qgyGq3Z_vuDCcZkbgCc")
                          .then((res1) => res1.json())
                          .then((json1) => {
                            this.setState({
                              items1: json1,
                              DataisLoaded1: true
                            });
                          })
                })
      })

        

          

    })
   
	}

  
	render() {
		const { DataisLoaded, items, items1} = this.state;
		if (!DataisLoaded) return <div className="loading-div">
			<h1 className="loading-heading"> Please wait... </h1> <p className="locationjank">If you don't allow location this won't load, sorry</p> </div> ;
		return (
		<div className = "App ">
      <div className ="topbit">
        <div className="logodiv">
          <img className="avtarlogo" src="logo.svg" alt="Our logo"/>
        </div>
        <div className="airportdiv">
          <h1 className="airporttext">Showing results for: <span className="airportname">{items1.name}</span></h1>
        </div>
      </div>
      <form className = 'p-8 icao-form' onSubmit={this.handleSubmit}>
        <label>
          <input type="text" onChange={this.handleChange} id="rounded-email" className="icao-search rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" autoComplete="off" placeholder="ENTER ICAO HERE"/>
        </label>
      </form>
      <div className = 'text-center my-10 text-2xl grid grid-cols-3 grid-rows-3	gap-10	p-8'>
        <div className = 'avtarinfo'>
          The temperature at {this.state.setICAO} is {items.temperature.value}°C
        </div>
        <div className='avtarinfo'>
          The wind speed at {this.state.setICAO} is {items.wind_speed.value} knots {items.wind_direction.value ? "at " + items.wind_direction.value + "°" : ""}
        </div>
        <div className='avtarinfo'>
          The QNH at {this.state.setICAO} is {items.altimeter.value} hPa
        </div>
        <div className='avtarinfo'>
          The dewpoint at {this.state.setICAO} is {items.dewpoint.value} °C
        </div>
        <div className='avtarinfo'>
          The flight rules at {this.state.setICAO} are currently {items.flight_rules}
        </div>
        <div className='avtarinfo'>
          The visibiity at {this.state.setICAO} is currently {items.visibility.value} sm
        </div>

      </div>
    <div className="tosdiv"><a href="/tos.html" className="navlink">Terms of Service</a></div>
    <div className="versionnumber">Version 0.2</div>
    <div className="smsexplaindiv">Text us on <a className="navlink" href="sms:+447700155872">+447700155872</a> an ICAO code to get the data for that airport</div>
    </div>
	);
}
}

export default App;


