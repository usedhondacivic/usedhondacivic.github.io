import React from 'react'

export default class ProjectBase extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);
        window.addEventListener('scroll', this.handleScroll);

        this.setup();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCanvas);
        window.removeEventListener('scroll', this.handleScroll);
    }

    onActiveChange(active) {

    }

    resizeCanvas = (e) => { }

    handleScroll = (e) => { }

    setup() { }
}