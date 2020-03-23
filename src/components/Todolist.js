import React, { Component } from "react";
import { firebase } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      checked: false,
      todos: []
    };
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleCheckbox = e => {
    this.setState({
      checked: e.target.checked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const todosRef = firebase.database().ref("todos");
    const todo = {
      title: this.state.text,
      important: this.state.checked
    };
    todosRef.push(todo);
    this.setState({
      text: "",
      checked: false
    });
  };

  componentDidMount() {
    const todosRef = firebase.database().ref("todos");
    todosRef.on("value", snapshot => {
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
        <h1>Dodaj nowe zadanie:</h1>
        <div>
          <form onSubmit={this.handleSubmit} className="u-form">
            <input
              type="text"
              name="text"
              placeholder="tu wpisz"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <input
              type="checkbox"
              id="important"
              checked={this.state.checked}
              onChange={this.handleCheckbox}
            />
            <label htmlFor="important">WAŻNE</label>
            <button className="btn">dodaj</button>
          </form>
          <hr />
          <div>
            <div className="list-display">
              <ul>
                {this.state.todos.map(todo => {
                  return (
                    <li className="list-item" key={todo.id}>
                      <span className="list-star">&#10045;</span>
                      <h3 className={todo.important ? "priority" : null}>
                        {todo.title}
                      </h3>
                      <button
                        className="btn--remove"
                        onClick={() => this.removeItem(todo.id)}
                      >
                        <FontAwesomeIcon icon="check-circle" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
