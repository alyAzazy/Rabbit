import React, { Component } from 'react';

export default class Product extends Component {
    render() {
        return (
            <div>
                <p>Name: {this.props.product.name}</p>
                <p>Price: {this.props.product.price}</p>
                <img alt-text="" src={this.props.product.photo_url}></img>
            </div>
        )
    }
}