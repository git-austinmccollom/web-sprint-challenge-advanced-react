import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(props) {
    super(props);
    this.state = { 
      plants: [],
      // filteredPlants: [],
      search: ''
     }
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  componentDidMount() {
    axios.get(`http://localhost:3333/plants`)
      .then( (res) => {
        console.log(res.data.plantsData)
        this.setState({plants: res.data.plantsData})
      })
      .catch( (err) => {
        console.log(err)
        debugger
      })
  }

  handleChange = (evt) => {
    this.setState({ search: evt.target.value })
  }

  // componentDidUpdate(search) {
  //     if (this.state.search.length > 0) {
  //       console.log("search run")
  //       const re = new RegExp(search, 'i')
  //       const filtered = this.state.plants.filter( (p) => {
  //         return(
  //           p.name.match(re)
  //         )
  //       })
  //       console.log(filtered);
  //       this.setState({
  //         filteredPlants: filtered
  //       })
  //     }
  // }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        <div className={'search-row'}>
          <label className={'search-box'}>
            <input
              placeholder='Search'
              name='search'
              type='text'
              value={this.state.search}
              onChange={this.handleChange}
            />
          </label>
        </div>
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
