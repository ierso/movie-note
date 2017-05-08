import React, { Component } from 'react';

export default class Size extends Component{
    state = {
    }
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        };
    }

    handleResize(e) {
        this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))

    }

    render() {

        return (
            <span>
                {this.state.windowWidth} x {this.state.windowHeight}
            </span>
        );
    }
}