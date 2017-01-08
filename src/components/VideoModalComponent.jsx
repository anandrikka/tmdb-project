import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

class VideoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.modalClass = modalClass;
        this.resizeListener = this.resizeListener.bind(this);
    }    

    componentDidMount () {
        window.addEventListener('resize', this.resizeListener);
    }

    resizeListener(event) {
        const state = this.state;
        if(window.innerWidth < 900 && window.innerWidth > 720) {
            state.modalClass.content.width = '480px';
            state.modalClass.content.height = '320px';
        }else if(window.innerWidth <= 600) {
            state.modalClass.content.width = '320px';
            state.modalClass.content.height = '240px';
        }else if(window.innerWidth > 900) {
            state.modalClass.content.width = '640px';
            state.modalClass.content.height = '360px';
        }
        this.setState(state);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.resizeListener);
    }
    

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                shouldCloseOnOverlayClick={true}
                contentLabel="Modal"
                style={this.state.modalClass} onRequestClose={this.props.closeDialog}>
                <div className="relative">
                    <i className="fa fa-times-circle-o fa-2x pointer" style={{position:'absolute', left: '100%', color: 'white', bottom: '95%'}} onClick={this.props.closeDialog}></i>
                    {
                         this.props.video && this.props.video.key ? (
                            <ReactPlayer 
                                width={this.state.modalClass.content.width}
                                height={this.state.modalClass.content.height}
                                url={'https://www.youtube.com/watch?v='+this.props.video.key} playing 
                                controls={true}/>
                        ): (
                            <div style={{backgroundColor: '#fff', padding: '20px'}} className="center-align"> No Trailer To Play !!</div>
                        )
                    }
                    
                </div>
            </Modal>
        );
    }
}

VideoModal.propTypes = {
    //video: React.PropTypes.object.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired
};

export default VideoModal;

const modalClass = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex:999
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        padding: '0 !important',
        width: '640px',
        height: '360px',
        zIndex: 9999,
        right: '0 !important',
        bottom: '0 !important',
        border: 'none !important',
        overflow: 'none !important',
        borderRadius: '0 !important',
        backgroundColor: 'transparent'
    }
};