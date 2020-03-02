import React, { Component } from 'react';
import { firebase } from '../firebase'


export class Todolist extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            todos: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const todosRef = firebase.database().ref('todos');
        const todo = {
            title: this.state.text,
            }
        todosRef.push(todo);
        this.setState({
            text: '',
                    });
    }

    componentDidMount() {
        const todosRef = firebase.database().ref('todos');
        todosRef.on('value', (snapshot) => {
            let todos = snapshot.val();
            let newState = [];
            for (let todo in todos) {
                newState.push({
                    id: todo,
                    title: todos[todo].title,
                });
            }
            this.setState({
                todos: newState
            });
        });
    }

    render() {
        return (
            <div className="c-page">
                <h1>Todo list</h1>
                <div>
                    <form onSubmit={this.handleSubmit} className="c-form" >
                        <h3>dodaj zadanie</h3>
                        <input type="text" name="text" placeholder="tu wpisz" onChange={this.handleChange} value={this.state.text} />
                        <button className="c-btn">dodaj</button>
                        <hr />
                    </form>
                    <div>
                        <h2>lista</h2>
                        <div className="c-list-display">
                            <ul>
                                {this.state.todos.map((todo) => {
                                    return (
                                        <li key={todo.id}>
                                            <p>{todo.title}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}