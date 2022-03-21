import React, {Component} from 'react';
import Equipment from "./Equipment";
import InputMask from 'react-input-mask';

class DeleteEquipment extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props);
        this.props.onDelete(this.props.equipment);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Delete"/>
            </form>
        )
    }
}

export default DeleteEquipment;
