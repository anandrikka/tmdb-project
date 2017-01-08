import React, {Component, PropTypes} from 'react';
import { W154ImageUrl } from '../utilities/AppConstants';

class Crew extends Component {
    
    processCrewMembers(crewMembers) {
        let crew = {};
        for (let i = 0; i < crewMembers.length; i++) {
            const crewMember = crewMembers[i];
            const department = crewMember.department;
            if (crew[department]) {
                crew[department].push(crewMember);
            } else {
                crew[department] = [];
                crew[department].push(crewMember);
            }
        }
        return crew;
    }
    
    render() {
        const crew = this.processCrewMembers(this.props.crew);
        if (this.props.crew.length > 0) {
            return (
                <div>
                    <h5 className="center-align">CREW MEMBERS</h5>    
                    {
                        this.props.crew.map((cItem, index) => {
                            const profile_path = cItem.profile_path;
                            let imageTag;
                            if(profile_path && profile_path !== null) {
                                const src = W154ImageUrl + cItem.profile_path;
                                imageTag = <img src={src} className="responsive-img"/>
                            }else {
                                let name = '';
                                let nameSplit = cItem.name.split(' ');
                                if(nameSplit.length > 0) {
                                    nameSplit.forEach(function(n){
                                        name = name + n.substr(0, 1);
                                    })
                                }else {
                                    name = cItem.name.substr(0, 2);
                                }
                                imageTag = (<div className="responsive-img valign-wrapper"><h5 className="valign">{name}</h5></div>);
                            }
                            return (
                                <CrewMember imageTag={imageTag} member={cItem} key={"crew"+index}
                                    goto={this.props.goto} />
                            )
                        })
                    }
                </div>
            );
        }
        return (<div></div>)
        
    }
}

Crew.propTypes = {
    crew: React.PropTypes.array.isRequired
};

export default Crew;

class CrewMember extends Component {
    render() {
        return (
            <div className="col s12 m6 l4">
                <div className="card horizontal crew-card">
                    <div className="card-image pointer"
                        onClick={() => this.props.goto(this.props.member.id)}>
                        {this.props.imageTag}
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <p><b>{this.props.member.name}</b></p>
                            <p>{this.props.member.job}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CrewMember.propTypes = {
    member: React.PropTypes.object.isRequired,
    imageTag: React.PropTypes.element.isRequired
}