import React from 'react';
import TabPills from './TabPills';
const home = props => {
    const category = props.category
    .map( items => items.category )

    const categories  = category.filter(function(c, i) {
        return (category.indexOf(c) >=  i )
    })


    return (
      <div>        
        <TabPills isloading= {props.isLoading} cat = {categories}  getarticle = {props.setArticle}  filterarticle= {props.filterArticle} country= {props.country}/>   
      </div>
    );
}

export default home;
