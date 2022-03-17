import React, {Component} from 'react';
import Equipment from "./Equipment";
import InputMask from 'react-input-mask';

class AddEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEquipment: {
                equipment_type_id: null,
                serial_number: '',
                note: ''
            },
            mask: '9',
            equipmentTypes: []
        }

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

    handleInput(key, e) {
        let state = Object.assign({}, this.state.newEquipment);
        state[key] = e.target.value;
        this.setState({newEquipment: state});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.newEquipment);
    }

    onSelectChange(key, e) {
        let state = Object.assign({}, this.state.newEquipment);
        state[key] = e.target.value;
        this.setState({newEquipment: state});
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index]
        let option =  optionElement.getAttribute('mask');
        let mask = '';
        option.split('').forEach(char => {
            switch(char) {
                case 'N':
                    mask += '9'
                    break;
                case 'A':
                    mask += 'a'
                    break;
                case 'a':
                    mask += 'a'
                    break;
                case 'X':
                    mask += '*'
                    break;
                case 'Z':
                    mask += '*'
                    break;
            }
        });
        this.state.mask = mask;
    };

    renderEquipmentTypes() {
        return this.state.equipmentTypes.map(type => {
            return (
                <option key={type.id} mask={type.mask} value={type.id}>
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
                        <select style={inputStyle} onChange={(e) => this.onSelectChange('equipment_type_id', e)} required>
                            <option mask='X' key='' value="">Select type</option>
                            {this.renderEquipmentTypes()}
                        </select>
                    </label>

                    <label>
                        Серийный номер:
                        <InputMask
                            required
                            style={inputStyle}
                            onChange={(e) => this.handleInput('serial_number', e)}
                            mask={this.state.mask}
                            maskChar=""
                            ref={this.state.serial_number}
                        />
                    </label>

                    <label>
                        Заметки:
                        <textarea style={inputStyle} onChange={(e) => this.handleInput('note', e)}/>
                    </label>
                    <input style={inputStyle} type="submit" value="Submit"/>
                </form>
            </div>)
    }
}

export default AddEquipment;
