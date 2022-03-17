import React, {Component} from 'react';

/* Stateless component or pure component
 * { product } syntax is the object destructing
 */
const Equipment = ({equipment}) => {

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        margin: '30px 10px 10px 30px'
    }

    //if the props for product is null, return Product doesn't exist
    if (!equipment) {
        return (<div style={divStyle}><h2> No Equipment was selected </h2></div>);
    }

    //Else, display the product data
    return (
        <div style={divStyle}>
            <h2> {equipment.serial_number} </h2>
            <p> {equipment.note} </p>
        </div>
    )
}

export default Equipment;
