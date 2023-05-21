import React from 'react';
import '../css/Loader.css';


export class Loader extends React.Component {
    render() {
        return (
            <div className="loading">
                <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div className="inner three"></div>
                </div>
            </div>
        )
    }
}
