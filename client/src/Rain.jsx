import React, { Component } from "react";
import ReactRain from "react-rain-animation";
import "react-rain-animation/lib/style.css";
export class Rain extends Component {
    render() {
        return (
            <>
                <h1>hello</h1>
                <ReactRain numDrops="50" />

            </>
        );
    }
}

export default Rain;
