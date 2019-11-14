import React, { Component } from 'react';
import Home from './components/home';
import * as config from './config/config';
import Cards from './components/Cards';
import loader from './Loader-2.gif';
import errorimg from './ErrorImage.jpg';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources : [],
            articles : [],
            category : '',
            country : 'in',
            loading: true,
            error : false,

        }
    }
    isLoading = (val) => {
        this.setState({loading : val});
    }

    setSources = () => {
        fetch(config.URL + config.PARAM[1] + '?apiKey=' + config.API_KEY)
            .then(response => response.json())
            .then(data => {this.setState({sources : data.sources})})
    }

    fetchArticle = (category) => {
        let country = '';
        if(this.state.country === 'global'){
            
            config.COUNTRY.map(c => {
                if(config.COUNTRY[0].code !== 'global')
                    country += '&country='+c.code;
            })
            this.setState({country: 'global'});
        }
        else{
            country = '&country='+this.state.country;
        }


        this.setState({category: category})
        fetch(config.URL + config.PARAM[0] + '?category=' + category + country +'&apiKey=' + config.API_KEY)
            .then( res => res.json() )
            .then(data => {
                if(data.totalResults === 0)
                    this.setState({loading : false, error: true})
                else
                    this.setState({articles : data.articles, loading: false, error: false})
            })
            .catch((error) => {
                this.setState({loading :false, error: true });
            })
    }

    filterArticle = (country) => {
        if(country === 'global'){
            country='';
            config.COUNTRY.map((c,i) => {
                if(config.COUNTRY[0].code !== 'global')
                    country += '&country='+c.code;
            })
            this.setState({country: 'global'});
        }
        else{          
            this.setState({country:country});           
            country = '&country='+country;
        }


        fetch(config.URL + config.PARAM[0] + '?category=' + this.state.category + country +'&apiKey=' + config.API_KEY)
            .then( res => res.json() )
            .then(data => {
                if(data.totalResults === 0)
                    this.setState({articles:[], loading : false, error: true})
                else
                    this.setState({articles : data.articles, loading: false, error: false})
            })
            .catch((error) => {                                                   this.setState({articles: [], loading :false, error: true });
            })
    }

    componentDidMount() {
        this.setSources();
        this.fetchArticle('general');

    }

  render() {
      let content ='';
    
      content = <div style={styles.loader}>
          <img style= {styles.image} alt = {'loader'}  src= {loader} />
          </div>
        

    return (
        <React.Fragment>
        
        {this.state.loading ? content : null }
        {/*<p style={{paddingTop:100}}>{this.state.country}</p> */}
        {(!this.state.loading && this.state.error) ? <img src= {errorimg} alt='error' style={{paddingTop:100, width:'100%' }} /> : null }
        
        <div>
            <Home isLoading = {this.isLoading} category = {this.state.sources} setArticle = {this.fetchArticle} filterArticle= {this.filterArticle} country= {this.state.country} />
            <Cards news = {this.state.articles} />
    
        </div>
      </React.Fragment>
    );
  }
 
}


const styles = {
    loader : {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: '999999',
        top: 0,
        left: 0,
        overflow: "hidden",
        color:'white',
    backgroundColor: 'rgba(255,255,255,0.75)',
    },
    image : {
        width: 100,
        height: 100,
    }
}

export default App;
