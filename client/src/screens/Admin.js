import React from 'react';
import axios from 'axios';

class Admin extends React.Component {

    state = {}

    componentDidMount() {
        axios.get(`/api/products`).then((res) => {
            this.setState({products: res.data}, () => {
                console.log(this.state)
            })
        })
    }

    render() {
        return (
            <div>
                {(this.state.products) ? this.state.products.map((product, index) => (
                    <div key={index} style={{border: '1px solid black', padding: '10px 10px 10px 10px', marginBottom: '10px'}}>
                        <p><b>Description</b>: {product.description}</p>
                        <p><b>ID</b>: {product._id}</p>
                        <button onClick={() => window.location.href = `/tracking?browser=${product._id}`}>View tracking info</button>
                    </div>
                )) : null}
            </div>
        )
    }
}

export default Admin;

