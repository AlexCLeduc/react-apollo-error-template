import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";


const App = ({ 
  first_query,
  second_query,
}) => {

  if(first_query.loading || second_query.loading){
    return <div> Loading ... </div>;
  }


  if(first_query.people && !second_query.people){
    debugger;
    return <div> Bug is happenning </div>
  }

  return <div> Bug didn't happen </div>;

};


const first_query = gql`
  query {
    people {
      name
    }
  }
`;
const first_dec = graphql(first_query, { name: "first_query" })

const second_query =  gql`
query {
  people {
    id
    # try changing the field to 'not_called_id' and see the bug dissapear
    #not_called_id
  }
}
`;

const second_dec = graphql(second_query, { name: "second_query" });


export default compose(first_dec, second_dec)(App);
