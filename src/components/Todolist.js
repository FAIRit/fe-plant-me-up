import React, { Component } from 'react';
import { firebase } from '../firebase'


const priority = {
    color: 'red',
}

export class Todolist extends Component {



    constructor() {
        super();
        this.state = {
            text: '',
            checked: false,

            todos: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleCheckbox(e) {
        this.setState({
            checked: e.target.checked
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const todosRef = firebase.database().ref('todos');
        const todo = {
            title: this.state.text,
            important: this.state.checked
        }
        todosRef.push(todo);
        this.setState({
            text: '',
            checked: false
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
                    important: todos[todo].important
                });
            }
            this.setState({
                todos: newState
            });
        });
    }

    removeItem(todoId) {
        const todoRef = firebase.database().ref(`/todos/${todoId}`);
        todoRef.remove();
    }


    render() {
        return (
            <div className="c-page">
                <h1>Todo list</h1>
                <div>
                    <form onSubmit={this.handleSubmit} className="c-form" >
                        <h3>dodaj zadanie</h3>
                        <input type="text" name="text" placeholder="tu wpisz" onChange={this.handleChange} value={this.state.text} />
                        <input type="checkbox" id="important" checked={this.state.checked} onChange={this.handleCheckbox} />
                        <label htmlFor="important">WAŻNE</label>
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
                                            <p className={todo.important ? 'priority' : null}>{todo.title}
                                            </p>
                                            <button onClick={() => this.removeItem(todo.id)}>zrobione!</button>
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