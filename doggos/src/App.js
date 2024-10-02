import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';

// const fetchDogs = (breed) => {
//     return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
//     .then(res => res)
//     .catch(err => console.error(err))
// }

const fetchDogs = (breed) => {
    if (!breed) {
        return axios.get('https://dog.ceo/api/breeds/image/random')
    }
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
}

const ensureArray = (data) => Array.isArray(data) ? data : [data];
export default class App extends React.Component{
    constructor(){
        super();
        this.state = {
            doggos: [],
            breed: ""
        }
    }

    // Without random dog image stretch goal
    // componentDidMount(){
    //     fetchDogs(this.state.breed)
    //     .then(res => this.setState({doggos: res.data.message}))
    //     .catch(err => console.error(err))
    // }

    componentDidMount(){
        fetchDogs(this.state.breed)
            .then(res => {
                this.setState({ doggos: ensureArray(res.data.message) });
            })
            .catch(err => console.error(err))
    }
    
    // Without random dog image stretch goal
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.breed !== this.state.breed) {
    //         fetchDogs(this.state.breed)
    //             .then(res => this.setState({ doggos: res.data.message }))
    //             .catch(err => console.error(err))
    //     }
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.breed !== this.state.breed) {
            fetchDogs(this.state.breed)
                .then(res => {
                    this.setState({ doggos: ensureArray(res.data.message) });
                })
                .catch(err => console.error(err));
        }
    }
    
    // Without random dog image stretch goal
    // searchDogs = breed =>{
    //     fetchDogs(breed)
    //     .then(res => this.setState({doggos: res.data.message, breed: breed}))
    //     .catch(err => console.error(err))
    // }

    searchDogs = breed => {
        fetchDogs(breed)
            .then(res => {
                this.setState({ doggos: ensureArray(res.data.message), breed: breed });
            })
            .catch(err => console.error(err));
    }
    
    render(){
        return(
            <div>
                <h1>Doggos Search</h1>
                <SearchForm searchDogs={this.searchDogs}/>
                {this.state.doggos.map((dog, index) => <img key={index} width="226" src={dog} alt="dog"/>)}
            </div>
        )
    }
}