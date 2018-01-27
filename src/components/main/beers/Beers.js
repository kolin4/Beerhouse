import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import SingleItem from './singleItem';
import Spinner from './spinner';
import EndList from './endList';
import Error from './error.js';
import {Link} from 'react-router-dom';
import Wraper from '../../wraper';
import { connect } from "react-redux";

class Beers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isData : false,
            hasMoreItems : true,  
            error:false,
        }
        
    }
   
    loadItems = (page) =>{
        const data = [...this.state.data];
    
        let url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`;
       
        
        axios.get(url)
        .then( (response)=>{
            if (response.data.length === 0){
                this.setState({
                    hasMoreItems: false
                })
            }
                  
            for ( let items of response.data){
                let singleItem = {
                    name:items.name,
                    tagline: items.tagline,
                    imgUrl: items.image_url,
                    description : items.description,
                    brewerTips: items.brewers_tips,
                    ibu:items.ibu,
                    abv:items.abv,
                    ebc:items.ebc,
                    id:items.id
                }
                data.push(singleItem)
            }
            
            localStorage.setItem('allBeers',JSON.stringify(data));  
            this.setState({
                data,
                isData : true,
                error: false
            })
        })
        .catch( (error) =>{
            console.error(error);

            // checking for data  in localStorage
            let tempData = JSON.parse(localStorage.getItem('allBeers'));

            if (tempData === null) {
                this.setState({
                    error:true
                })
                return
            }
            this.setState({
                data:tempData,            
                isData:true
                
            })
            
        })
    }
    
    render(){
          
        let items =  this.state.isData ? this.state.data.map( (elem,index)=>{
            return (
                <Link className='singleItem-link' key={elem.id} to={`/beers/${elem.id}`} >
                     <SingleItem click={ ()=> this.props.parseData(elem)} name={elem.name} tagline={elem.tagline} imgUrl={elem.imgUrl} />
                </Link>
            )
        }) : <div></div>;
       
        return( 
            <Wraper >           
            <div className='row'>
            {!this.state.error ?  (
                <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems}
                hasMore={this.state.hasMoreItems}    
                loader={ <Spinner key='spinner' class='loaderMini'/>}  
                threshold={20}>              
                    {items}
            </InfiniteScroll>
            
            
            ) : <Error />}
            {!this.state.hasMoreItems ? <EndList /> : null} 
            </div>
            </Wraper>
            
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        parseData: (data)=> dispatch({type:'parseData', data:{data}})
    }
}


export default connect(null,mapDispatchToProps)(Beers);