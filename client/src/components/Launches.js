import React, { Component, Fragment  } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

import MissionKey from "./MissionKey"
import LaunchItem from "./LaunchItem";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LAUNCHES_QUERY = gql`
query LaunchesQuery {
    launches{
        flight_number
        mission_name
        launch_date_local
        launch_success
       
    }
}
`;

export class Launches extends Component {
  
    render() {
        return (
            <Fragment>
                <h1 className="display-4 my-3">Launches </h1>
                <MissionKey />  
                <Query query={LAUNCHES_QUERY}>
                    {({ loading, error, data}) => {
                        if (loading) return  <div className="sweet-loading">
                        <ClipLoader
                          css={override}
                          size={150}
                          color={"#123abc"}
                         
                            />
                             </div>
                        if (error) console.log(error);
                        console.log(data)
                           

                        return <Fragment>
                            {
                                data.launches.map(launch => (
                                    <LaunchItem key={launch.flight_number} launch={launch} />
                                ))
                                }
                            </Fragment>
                        }}
                </Query>
            </Fragment>
        )
    }
}

export default Launches;