
import React from 'react';
import axios from 'axios';

class Details extends React.Component {

    state = {}

    componentDidMount() {
        if(window.location.search) {
            axios.get(`/api/products/${window.location.search.split('=')[1]}`).then((res) => {
                this.setState({selectedProduct: res.data[0]})
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Product Details</h1>
                <img src={(this.state.selectedProduct) ? this.state.selectedProduct.img : null} height="100" width="100" />
                <p><b>Description</b>: {(this.state.selectedProduct) ? this.state.selectedProduct.description : null}</p>
                <p><b>Price</b>: ${(this.state.selectedProduct) ? this.state.selectedProduct.price : null}</p>

            </div>
        )
    }
}

export default Details;

