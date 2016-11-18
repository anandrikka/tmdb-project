import React, {Component, PropTypes} from 'react';

class MatericalCard extends Component {

    constructor(props) {
        super(props);
    }    

    render() {
        var details = this.props.details || {};
        return (
            <div className="col-md-4 col-sm-6 col-xs-12">
                <article className="material-card Brown">
                    <h2>
                        <span>{details.title}</span>
                        <strong>
                            <i className="fa fa-fw fa-star"></i>
                            The Deer Hunter
                        </strong>
                    </h2>
                    <div className="mc-content">
                        <div className="img-container">
                            <img className="img-responsive" src={
                                "https://image.tmdb.org/t/p/w500/"+details.poster_path}/>
                        </div>
                        <div className="mc-description">
                            He has appeared in more than 100 films and television shows, including The Deer Hunter, Annie Hall, The Prophecy trilogy, The Dogs of War ...
                        </div>
                    </div>
                    <a className="mc-btn-action">
                        <i className="fa fa-bars"></i>
                    </a>
                    <div className="mc-footer">
                        <h4>
                            Social
                        </h4>
                        <a className="fa fa-fw fa-facebook"></a>
                        <a className="fa fa-fw fa-twitter"></a>
                        <a className="fa fa-fw fa-linkedin"></a>
                        <a className="fa fa-fw fa-google-plus"></a>
                    </div>
                </article>
            </div>
        );
    }
}

MatericalCard.propTypes = {
    details: React.PropTypes.object.isRequired
};

export default MatericalCard;