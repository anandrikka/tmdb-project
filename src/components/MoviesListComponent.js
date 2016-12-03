import React, {Component, PropTypes} from 'react'

class MoviesListComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activePage: 1
        }
        this.pageSelect = this.pageSelect.bind(this);
    }

    componentDidMount() {
        let type = this.props.params.type || 'latest';
        this.props.fetchMovies(type).then(() => {
            let posters = [];
            for (let movie in this.props.moviesData.search.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.moviesData.search.list[movie].poster_path);
            }
            axios.all(posters).then(function () {
                this.setState({
                    loading: false,
                    activePage: 1
                })
            }.bind(this))
        })
    }

    pageSelect(page) {
        this.setState({
            loading: true
        });
        this.props.fetchLatestMovies(page).then(() => {
            let posters = [];
            for (let movie in this.props.moviesData.search.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.moviesData.search.list[movie].poster_path);
            }
            axios.all(posters).then(function () {
                this.setState({
                    loading: false,
                    activePage: page
                })
            }.bind(this))
        }, () => {
            this.setState({
                loading:false
            })
        })
    }
    
    render() {
        return (
            <div className="container" style={{marginTop:'20px'}}>
                <div className="row">
                    <LoadingComponent isLoading={this.state.loading}></LoadingComponent>
                    {
                        this.props.moviesData.search.list.map((item, index) => {
                            return (
                                <div className="col s12 m2 l4" key={index}>
                                    <RevealCardComponent item={item} genres = {this.props.appData.movieGenres}>
                                    </RevealCardComponent>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    !this.state.loading ? (
                        <div style={{ float: 'right'}}>
                            <PaginationComponent
                                pages={this.props.moviesData.search.totalPages}
                                activePage={this.state.activePage} pageSelect={this.pageSelect}>
                            </PaginationComponent>    
                        </div>
                    ) : ''
                }
                <div style={{clear:'both'}}></div>
            </div>
        );
    }
}

MoviesListComponent.propTypes = {

}

export default MoviesListComponent;