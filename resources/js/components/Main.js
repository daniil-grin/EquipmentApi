import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Equipment from "./Equipment";
import AddEquipment from "./AddEquipment";

/* Main Component */
class Main extends Component {

    constructor() {

        super();
        //Initialize the state in the constructor
        this.state = {
            equipments: [],
            currentEquipment: null
        }
        this.handleAddEquipment = this.handleAddEquipment.bind(this);
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
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <li style={listStyle} onClick={
                    () => this.handleClick(equipment)} key={equipment.id}>
                    {equipment.serial_number}
                </li>
            );
        })
    }

    handleClick(equipment) {
        //handleClick is used to set the state
        this.setState({currentEquipment: equipment});
    }

    handleAddEquipment(equipment) {

        /*Fetch API for post request */
        fetch('api/equipments/', {
            method: 'post',
            /* headers are important*/
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
        //update the state of products and currentProduct
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
                        <Equipment equipment={this.state.currentEquipment}/>
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

/* The if statement is required so as to Render the component
 * on pages that have a div with an ID of "root";
 */

if (document.getElementById('root')) {
    ReactDOM.render(<Main/>, document.getElementById('root'));
}
