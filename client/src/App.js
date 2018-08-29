import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {}

  componentDidMount() {
    axios.get('/api/todos').then((res) => {
      this.setState({
        todos: res.data
      }, () => {
        console.log(this.state)
      })
    })
  }

  setValue(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  save() {
    axios.post('/api/todos', this.state).then(() => {
      window.location.reload()
    })
  }

  render() {
    return (
      <div>
        <h1>To Do List</h1>
        <input 
          placeholder="description..." 
          name="description" 
          onChange={(e) => this.setValue(e)}/>
        <button onClick={() => this.save()}>Submit</button>

        <ul>
          {(this.state.todos) ? this.state.todos.map((td, index) => (
            <li key={index}>{td.description}</li>
          )): null}
        </ul>
      </div>
    );
  }
}

export default App;
