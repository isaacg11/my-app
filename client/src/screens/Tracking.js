import React from 'react';
import axios from 'axios';

class Tracking extends React.Component {

    state = {}

    componentDidMount() {
        if(window.location.search) {
            axios.get(`/api/products/${window.location.search.split('=')[1]}`).then((res) => {
                let info = res.data[0].tracking_info;
                this.setState({trackingInfo: info})
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Tracking Info</h1>
                {(this.state.trackingInfo) ? this.state.trackingInfo.map((info, index) => (
                    <div key={index} style={{border: '1px solid black', padding: '10px 10px 10px 10px', marginBottom: '10px'}}>
                        <p><b>Click#</b>: {index+1}</p>
                        <p><b>IP</b>: {info.ip}</p>
                        <p><b>Browser</b>: {info.browser}</p>
                        <p><b>OS</b>: {info.os}</p>
                        <p><b>Timestamp</b>: {info.timestamp}</p>
                    </div>
                )): null}
            </div>
        )
    }
}

export default Tracking;

