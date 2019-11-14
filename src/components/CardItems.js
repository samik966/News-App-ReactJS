import React from 'react';

import './styles/CardItems.css';

function CardItems(props) {
  return (
   <React.Fragment>
     {props.newsList.map((news, i) => {
       return (
        <div className='card'>
          <div className='imgContainer'>
           <img src={news.urlToImage} alt={news.source.name} />
          </div>

          <div className='content'>
           <h4>{news.title}</h4>

          </div>
                
          </div>
    
        );

        })}
        </React.Fragment>
    );
}


export default CardItems;
