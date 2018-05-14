
import React, { Component } from 'react';

// components & containers
import Header from '../../components/Header/Header.jsx';
import ImageHolder from '../../containers/ImageHolder/ImageHolder.jsx';
import UploadHolder from '../../containers/UploadHolder/UploadHolder.jsx';
import ImageStorage from '../../lib/ImageStorage.js';
import ImageViewer from '../../components/ImageViewer/ImageViewer.jsx';

// styles
import classes from '../../styles/App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        // get images if existing
        this.storage = new ImageStorage();
        this.images = this.storage.getImages();
        this.displayIdx = 0;
        
        // App state
        this.state = {
            num_images: this.images.length,
            imageDisplay: false // track whether we are displaying image
        };

        // callback for refresh
        this.reloadState = this.reloadState.bind(this);
        this.closeImage = this.closeImage.bind(this);
    }

    closeImage() {
        // setState renders the component
        this.setState({ imageDisplay: false });
    }
    
    displayImage(idx) {
        this.setState({ imageDisplay: true, displayIdx: idx });
    }
    
    reloadState() {
        this.setState({num_images: this.state.num_images + 1});
    }

    render() {

        this.images = this.storage.getImages();
    
        let imageHolders = [];
        let i = 0;

        this.images.forEach(img => { // ES6 arrow function
            imageHolders.push(
                <div
                    onClick={this.displayImage.bind(this, i)}
                    key={i}>

                    {/* Imageholder for each image */}
                    <ImageHolder
                        reload={this.reloadState}
                        idx={i}
                        className="img-holder"
                        src={img.data}
                        storage={this.storage} />
                </div>);
            i++;
        });

        let imageDisplay = [];

        if (this.state.imageDisplay) {
            // display the full image
            imageDisplay.push(
            <ImageViewer images={this.images} displayIdx={this.state.displayIdx}
                    key="1"
                    closeImage={this.closeImage} />
            );
        }
        else {
            // display thumbnails
            imageDisplay.push(
                <div key="1" className="wrapper">
                  {imageHolders}
                  <UploadHolder reload={this.reloadState}
                storage={this.storage} />
                </div>
            );
        }

        return(
            <div className="app">
                <Header />
                {imageDisplay}
            </div>
        );
    }
}

export default App;
