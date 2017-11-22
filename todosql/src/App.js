import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      data: [],
      updateTodo: ""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/get/', )
      .then((data) => {
        // console.log(data)
        // var newData = []
        // data.push(newData)
        this.setState({
          data: data.data
        })

      })
      .catch((err) => console.log(err));
  }


  remove(i) {
    // var todo = {
    //   idnew_tables: i
    // }
    //console.log(todo)
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  }


  add() {
    console.log("btn prss")

    var todo = {
      name: this.state.todo
    }
    axios.post('http://localhost:3000/add/', todo)
      .then((data) => {
        console.log(data)
        this.setState({
          todo: ""
        })
      })
      .catch((err) => console.log(err));

  }

  updatehandle(i) {
    var todo = {
      name: this.state.updateTodo
    }
    // var updateString = this.state.updateTodo
    axios.put(`http://localhost:3000/update/${i}`, todo)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err));

  }

  render() {
    var data = this.state.data
    console.log(this.state.updateTodo)
    console.log(data)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />
        <input type="text" value={this.state.todo} onChange={(event) => this.setState({ todo: event.target.value })}>

        </input>

        <button onClick={this.add.bind(this)}>add</button>

        <div>
          {
            data.map((val, i) => (
              <div key={i}>
                <p >
                  <input type="text" defaultValue={val.name} onChange={(event) => this.setState({ updateTodo: event.target.value })} />
                  <button onClick={this.updatehandle.bind(this, val.idnew_table, val.name)}>update</button>
                  <button onClick={this.remove.bind(this, val.idnew_table)}>  x</button>
                </p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
