import React from "react";

export default class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchDogs(this.state.search);
        this.setState({
            search: ''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.search} onChange={this.handleChange} />
                <button type="submit">Search</button>
            </form>
        )
    }
}