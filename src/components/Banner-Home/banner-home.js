import React from 'react';

class BannerHome extends React.Component {
    render() {
        return(
            <div className="banner-home-container">
                <img src={this.props.image} alt="banner" />
            </div>
        );
    }
}

export default BannerHome;