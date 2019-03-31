import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    axios.get('/todos')
      .then((response) => {
        console.log(results.body)
      })
      .catch((error) => {
        console.log('could not retrieve todos [client] :', error);
      })
  }

  render() {

    return (
      <div>
        <p>
          I'm so lonely without anything to complete
        </p>
        <button onClick={this.clickHandler}>GET TODOS</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
