import React, {Component} from 'react';
import Equipment from "./Equipment";

class AddEquipment extends Component {
    constructor(props) {
        super(props);
        /* Initialize the state. */
        this.state = {
            newEquipment: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            },
            equipmentTypes: []
        }

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        fetch('/api/equipment-types')
            .then(response => {
                return response.json()
            })
            .then(types => {
                this.setState({equipmentTypes: types})
            });
    }

    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {

        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.newEquipment);
        state[key] = e.target.value;
        this.setState({newEquipment: state});
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload
        e.preventDefault();
        /*A call back to the onAdd props. The control is handed over
         *to the parent component. The current state is passed
         *as a param
         */
        this.props.onAdd(this.state.newEquipment);
    }

    renderEquipmentTypes() {
        return this.state.equipmentTypes.map(type => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <option mask={type.mask} onChange={(e) => this.handleInput('equipment_type_id', e)} value={type.id}>
                    {type.title}
                </option>
            );
        })
    }

    render() {
        const divStyle = {}
        const inputStyle = {
            margin: '0px 10px 0px 10px'
        }
        return (
            <div style={divStyle}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Тип оборудования:
                        <select>
                            {this.renderEquipmentTypes()}
                        </select>
                        {/*<input style={inputStyle} type="number"*/}
                        {/*       onChange={(e) => this.handleInput('equipment_type_id', e)}/>*/}
                    </label>

                    <label>
                        Серийный номер:
                        {/*On every keystroke, the handeInput method is invoked */}
                        <input style={inputStyle} type="text" onChange={(e) => this.handleInput('serial_number', e)}/>
                    </label>

                    <label>
                        Заметки:
                        <input style={inputStyle} type="text" onChange={(e) => this.handleInput('note', e)}/>
                    </label>
                    <input style={inputStyle} type="submit" value="Submit"/>
                </form>
            </div>)
    }
}

export default AddEquipment;
