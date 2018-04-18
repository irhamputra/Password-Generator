import React, {Component} from "react";
import "./App.css";
import Clipboard from "clipboard";

class App extends Component {
    state = {passwords: []};

    componentDidMount() {
        this.getPasswords();

        this.clipboard = new Clipboard('.more');
        this.clipboard.on("success", () => {
            console.log("Success: copied")
        })
    }


    getPasswords = () => {
        fetch('/api/passwords')
            .then(res => res.json())
            .then(passwords => this.setState({passwords}))
    };

    render() {
        const {passwords} = this.state;
        return (
            <div className="container App">
                {passwords.length ? (
                    <div className="row">
                        <h3>5 Strongest RPD's Password</h3>
                        <hr/>
                        <ul className="passwords">
                            {passwords.map((password, i) => {
                                return (
                                    <li className="flex-box" key={i}>
                                        {password}
                                        <button data-clipboard-text={password} data-clipboard-action="copy" ref="copy"
                                                className="more">Copy
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                        <button className="button-more" onClick={this.getPasswords}>Get More</button>
                    </div>
                ) : (
                    <div>
                        <h3>Loading...</h3>
                        <button className="more" onClick={this.getPasswords}>Try Again?</button>
                    </div>
                )}
            </div>
        )
    }
}

export default App;
