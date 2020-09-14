import React from "react";
import axios from 'axios';

class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            events: []
            }
        };

    componentDidMount() {
        axios.get('http://localhost:3001/events/')
        .then(res => {
            console.log(res.data);
            this.setState({events: res.data});
            console.log("Events",this.state.events);
        })
        .catch(error => console.log(error));

    }


    render() {
        return(
            <div className="App">
                {this.state.events.map(event => (
                    <div key={event.id} >
                        <div>
                            <h3>{event.name}</h3>
                            <p>{event.category}</p>
                            <p>{event.address}</p>
                            <p>{event.date} | {event.time}</p>
                            <hr/>
                        </div>
                    </div>
                ))}


            </div>

        );
    }

}

export default List