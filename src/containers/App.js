import React, { Component } from "react";
import CardArray from "../components/CardArray";
import Searchbox from "../components/Searchbox";
import './App.css';
import Scroll from "../components/Scroll";

class App extends Component {

    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    onSearchChange = (event) => { 
        this.setState({searchfield: event.target.value});
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }

    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter( robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });

        return this.getHTML(filteredRobots);
    }

    getHTML(filteredRobots){
        var html;
        if(0 === filteredRobots.length){
            html = (
                <div className="tc">
                    <h1 className='f1'>RoboFriends</h1>
                    <Searchbox searchChange={this.onSearchChange} />
                    <h3>No robofriends found. You will be forever alone. :(</h3>
                </div>
            );
        }
        else{
            html = (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <Searchbox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardArray robots = {filteredRobots} />
                    </Scroll>
                </div>
            );
        }

        return html;
    }
}

export default App;