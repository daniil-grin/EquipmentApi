import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Equipment from "./Equipment";
import AddEquipment from "./AddEquipment";

/* Main Component */
class Main extends Component {

    constructor() {

        super();
        this.state = {
            equipments: [],
            currentEquipment: null
        }
        this.handleAddEquipment = this.handleAddEquipment.bind(this);
        this.handleDeleteEquipment = this.handleDeleteEquipment.bind(this);
    }

    /*componentDidMount() is a lifecycle method
     * that gets called after the component is rendered
     */
    componentDidMount() {
        fetch('/api/equipments')
            .then(response => {
                return response.json();
            })
            .then(equipments => {
                this.setState({equipments});
            });
    }

    renderEquipment() {
        const listStyle = {
            listStyle: 'none',
            fontSize: '18px',
            lineHeight: '1.8em',
        }
        return this.state.equipments.map(equipment => {
            return (
                <li style={listStyle} onClick={
                    () => this.handleClick(equipment)} key={equipment.id}>
                    {equipment.serial_number}
                </li>
            );
        })
    }

    handleClick(equipment) {
        this.setState({currentEquipment: equipment});
    }

    handleAddEquipment(equipment) {
        fetch('api/equipments/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(equipment)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState((prevState) => ({
                    equipments: prevState.equipments.concat(data),
                    currentEquipment: data
                }))
            })
    }

    handleDeleteEquipment(equipment) {
        fetch('api/equipments/'+equipment.id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipment)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(this.state.equipments);
                console.log(data.id);
                this.setState((prevState) => ({
                    equipments: prevState.equipments.filter(equipment => equipment.id !== data.id),
                    currentEquipment: data
                }))
            })
    }

    render() {

        const mainDivStyle = {
            display: "flex",
            flexDirection: "row"
        }

        const divStyle = {
            justifyContent: "flex-start",
            width: '32%',
            background: '#f0f0f0',
            padding: '20px 20px 20px 20px',
            margin: '30px 10px 10px 30px'
        }

        return (
            <div>
                <div style={mainDivStyle}>
                    <div style={divStyle}>
                        <h2>All equipment:</h2>
                        <ul>
                            {this.renderEquipment()}
                        </ul>
                    </div>
                    <div style={divStyle}>
                        <h2>Equipment:</h2>
                        <Equipment equipment={this.state.currentEquipment} onDelete={this.handleDeleteEquipment}/>
                    </div>
                    <div style={divStyle}>
                        <h2>Add new equipment:</h2>
                        <AddEquipment onAdd={this.handleAddEquipment}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main/>, document.getElementById('root'));
}
