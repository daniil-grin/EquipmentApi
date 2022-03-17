import React, {Component} from 'react';
import DeleteEquipment from "./DeleteEquipment";

const Equipment = ({equipment, onDelete}) => {

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        margin: '30px 10px 10px 30px'
    }

    if (!equipment) {
        return (<div style={divStyle}><h2> No Equipment was selected </h2></div>);
    }

    return (
        <div style={divStyle}>
            <h2> Serial Number: {equipment.serial_number} </h2>
            <p> Type: {equipment.title}</p>
            <DeleteEquipment equipment={equipment} onDelete={onDelete}/>
            <p> Note: {equipment.note} </p>
        </div>
    )
}

export default Equipment;
