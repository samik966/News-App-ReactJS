import React, { Component } from 'react';
import CardItems from './CardItems';

class Cards extends Component {
    render() {
        return (
            <CardItems newsList = {this.props.news} />
        );
    }
}

export default Cards;
