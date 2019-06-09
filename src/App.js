import React, { Component } from 'react';
import './App.css';

function UserCard (props) {
  let info = (
    <div>
      <span>{props.user.name.first}</span>
      {" "}
      <span>{props.user.name.last}</span>
    </div>
  );

  return (
  <div>
    <img alt={props.user.id} src={props.user.picture.large}></img>
    <div>
      {props.hide === false ? info : null}
    </div>
    <button onClick={props.onClick}>Hide Details</button>
  </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isHidden: true
    };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api?results=25')
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      this.setState({
        users: json.results
      });
    })
  }

  onClick = () => {
    let opposite = this.state.isHidden;
    this.setState({
      isHidden: !opposite
    })
  };

  render() {
    return (
      <div className="App">
        <div>
          {this.state.users.map((user, index) => 
            <UserCard
            key={index}
            user={user}
            onClick={this.onClick}
            hide={this.state.isHidden} />
          )}
        </div>
      </div>
    );
  }
}

export default App;