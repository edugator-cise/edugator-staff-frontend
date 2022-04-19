import { Component } from "react";
import "./FormStyles.css"

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    //https://www.codegrepper.com/code-examples/javascript/how+to+get+current+date+in+react+js
    //Current method for pulling current date
    const current = new Date();
    const date = `${
      current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`;

    this.state = {
      title: "",
      author: "",
      visibility: "public",
      date: date,
    };
  }
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    let pageJsonData = [];
    pageJsonData.push(JSON.stringify(this.state, undefined, 2));
    this.props.jsonData.forEach((content) => {
      pageJsonData.push(JSON.stringify(content, undefined, 2));
    });
    let exportData = pageJsonData.join(",\n");
    console.log(exportData);
    alert(exportData);
    event.preventDefault(); //Prevents page fresh on submit, disable if needed
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="paper-style">
        <div>
          <label className="label-style">Content Title:</label>
          <input
            className="input-style"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleInput}
          />
        </div>
        <div>
          <label className="label-style">Author:</label>
          <input
            className="input-style"
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleInput}
          />
        </div>
        <div>
          <label className="label-style">Visibility:</label>
          <select
            className="input-style"
            name="visibility"
            value={this.state.visibility}
            onChange={this.handleInput}
          >
            <option value="public">Public (Visible to Students)</option>
            <option value="private">Private (Staff Only)</option>
          </select>
        </div>
        <button type="submit" className="btn-style">Submit</button>
      </form>
    );
  }
}

export default RegistrationForm;
