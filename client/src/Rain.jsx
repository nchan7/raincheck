import React, { Component } from "react";
import ReactRain from "react-rain-animation";
import "react-rain-animation/lib/style.css";
export class Rain extends Component {
    render() {
        return (
            <>
                <h1>Raincheck
                </h1>
                <ReactRain numDrops="100" />

            </>
        );
    }
}

export default Rain;
