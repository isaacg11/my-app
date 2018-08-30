import React from 'react';
import axios from 'axios';
import ReactFilestack from 'filestack-react'
import bowser from 'bowser';


class Products extends React.Component {

    state = {}

    setValue(e) {   
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        axios.get(`/api/products`).then((res) => {
            this.setState({
                products: res.data,
                
            })
        })
    }

    saveProduct(result) {
        let productInfo = {
            description: this.state.description,
            price: this.state.price,
            img: result.filesUploaded[0].url
        }
            
        axios.post('/api/products', productInfo).then(() => {
            window.location.reload();
        }).catch((err) => {
            alert('there was an error')
        })
    }

    viewDetails(id) {
        axios.get('/api/locations').then((res) => {
            let IP = JSON.parse(res.data).geobytesipaddress;
            let info = bowser.getParser(window.navigator.userAgent);
            let environmentInfo = {
                ip: IP,
                browser: info.parsedResult.browser.name,
                os: info.parsedResult.os.name,
                timestamp: new Date()
            }
            
            axios.put(`/api/products/${id}`, environmentInfo).then(() => {
                window.location.href = `/details?product=${id}`;
            })
        })
    }

    render() {
        return (
            <div>
                <div style={{float: 'right'}}>
                    <a href="/admin">Admin</a>
                </div>
                <h1>Products</h1>
                <h5>Add new product</h5>
                <input type="text" name="description" placeholder="description" onChange={(e) => this.setValue(e)} />
                <input type="number" name="price" placeholder="price" onChange={(e) => this.setValue(e)} />
                <button>
                    <ReactFilestack
                        link
                        buttonText="upload image"
                        apikey={'ACjQcyBUUTh2se5JMaK3Dz'}
                        onSuccess={(result) => this.saveProduct(result)}                                                                
                        options={{
                            fromSources: ["local_file_system"],
                            accept: ["image/*"],
                            maxFiles: 1,
                            minFiles: 1
                        }}
                    />
                </button>

                <h5>View products</h5>
                <div>
                    {(this.state.products) ? this.state.products.map((product, index) => (
                        <div key={index} style={{border: '1px solid black', padding: '10px 10px 10px 10px', marginBottom: '10px'}}>
                            <img src={product.img} height="100" width="100" />
                            <div>
                                <button onClick={() => this.viewDetails(product._id)}>View Details</button>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        )
    }
}

export default Products;