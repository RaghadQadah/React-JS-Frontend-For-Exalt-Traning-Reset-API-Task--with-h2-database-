import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PersonList extends Component {

    constructor(props) {
        super(props);
        this.state = {persons: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('persons')
            .then(response => response.json())
            .then(data => this.setState({persons: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/person/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPerson = [...this.state.persons].filter(i => i.id !== id);
            this.setState({persons: updatedPerson});
        });
    }

    render() {
        const {persons, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const personList = persons.map(person => {
            return <tr key={person.id}>
                <td style={{whiteSpace: 'nowrap'}}>{person.name}</td>
                <td>{person.jobs}</td>
                <td>{person.age}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="grey" tag={Link} to={"/persons/" + person.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(person.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/persons/new">Add Person</Button>
                    </div>
                    <h3>Person List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th >name</th>
                            <th >job</th>
                            <th >Age</th>
                            <th >Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {personList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default PersonList;