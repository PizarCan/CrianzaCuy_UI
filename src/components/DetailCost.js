import React, { Component } from 'react';
import CostService from "../services/cost.service";

class DetailCostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: []
    }
  }

  componentDidMount = () => {
    CostService.showDetailCost('47238670').then(json => this.state({details: json}))
  }

  render() {
    const { details } = this.state
    return (
      <div>
        {details.map(x => <div><strong>{x.Nombre}</strong></div>)}
      </div>
    )
  }
}

export default DetailCostList;