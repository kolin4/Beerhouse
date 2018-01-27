import React from 'react';
import Wraper from '../../wraper';
import Spinner from './spinner';
import AlsoLike from './alsoLike';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'; 

class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
            isData : false,
            modalItem : this.props.itemData.data
        }
    }
     
    componentWillMount() {
       // works when user manualy put adress    
        if (this.props.itemData.data === undefined){
            let itemId = this.props.props.match.params.id;
            if (itemId >= 235){
                this.props.props.history.push('/beers/');
            }

            // checking for data  in localStorage

            let localData = JSON.parse(localStorage.getItem('allBeers'));
          
            if (localData !== null){
                // localData exist
                for ( let items of localData ){                    
                    if ( items.id === +itemId ){
                    // find correct data in localStorage 
                        
                        this.setState({
                            modalItem:items
                        })
                        return this.forceRender(items) 
                    }                  
                }
            }
            // no data in localStorage, fetching new data
            axios.get(`https://api.punkapi.com/v2/beers/${itemId}`)
                .then( response => {
                                    
                    let singleItem = {
                        name:response.data[0].name,
                        tagline: response.data[0].tagline,
                        imgUrl: response.data[0].image_url,
                        description : response.data[0].description,
                        brewerTips: response.data[0].brewers_tips,
                        ibu:response.data[0].ibu,
                        abv:response.data[0].abv,
                        ebc:response.data[0].ebc,
                        id:response.data[0].id
                     }
                

                    this.forceRender(singleItem) 
                    this.setState({
                        modalItem:singleItem
                    })
                })
                .catch( error =>{
                   
                    
                    this.props.props.history.push('/beers/');
                })    
            
        } else {
                        
           this.forceRender(this.props.itemData.data);
        }
    }


    forceRender = (item)=> {

        const similarBeers = [];
        let itemFindSimilar = item;
            
        let url = `https://api.punkapi.com/v2/beers?abv_gl=${itemFindSimilar.abv}&ibu_gl=${itemFindSimilar.ibu}$ebc_gt=${itemFindSimilar.ebc}`;

        
        axios.get(url)
            .then(response =>{

                const data = response.data;
               
                const beersWithFullData = [];
                                
                while (beersWithFullData.length < 3){
                    let randomItem = data[Math.floor(Math.random()* (data.length-0))];
                    if (( beersWithFullData.indexOf(randomItem) === -1) && (randomItem.name !== this.props.itemData.name)) {
                        beersWithFullData.push(randomItem);
                    }
                }    
             
                for ( let items of beersWithFullData){
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
                    similarBeers.push(singleItem)
                }
               
              this.setState({
                    data:similarBeers,
                    isData: true
                })
                
            })
        
    }
  
    closeModal = (event)=>{        
        if (event.target.dataset.id === 'backdrop'){
            this.props.props.history.push('/beers/');
        }
        
    }
    
    render(){
        let modalItem = this.state.modalItem || {};                 
        let style;
        if (modalItem.imgUrl === 'https://images.punkapi.com/v2/keg.png'){
            style = {
                width :'32%'
            }
        }

        let alsoLikeBoxes = (
            <Wraper>
                <div className='modal-item-alsoLike-container'>
                     <Spinner class='loaderMini' />
                </div>
                <div className='modal-item-alsoLike-container'>
                    <Spinner class='loaderMini' /> 
                </div>
                <div className='modal-item-alsoLike-container'>
                    <Spinner class='loaderMini' />  
                </div>
            </Wraper>    
        );
        if (this.state.isData){
                       
            alsoLikeBoxes = this.state.data.map ( (elem,index )=>{
                
                return (
                   
                        <div key={elem.id}  className='modal-item-alsoLike-container'>
                            <Link to={`/beers/${elem.id}`} >
                                 <AlsoLike parseData={()=>this.props.parseData(elem)} name={elem.name} imgUrl={elem.imgUrl}/>
                            </Link>
                        </div>                     
                )
            })
        }

        
        return (
        <div data-id='backdrop' onClick={this.closeModal} className='modal'>
            <div className='modal-item-container'>
                <div className='modal-item-details'>
                    <img style={style} alt='beer' src={modalItem.imgUrl} />
                    <div className='item-details'>
                        <div className='item-details-title'>
                            <h4 className='item-details-name'>{modalItem.name}</h4>
                            <p className='item-details-tagline'>{modalItem.tagline}</p>  
                        </div>    
                        <div className='item-details-spans'>
                            <p><strong>IBU:</strong>{modalItem.ibu}</p>
                            <p><strong>ABV:</strong>{modalItem.abv}</p>
                            <p><strong>EBC:</strong>{modalItem.ebc}</p>
                        </div>
                        <div  className='item-details-description'>
                            <h5>Description</h5>
                            <p>{modalItem.description}</p>   
                        </div>
                        
                        <div className='item-details-brewerTip'>
                             <h5>Brewer Tip</h5>
                             <p>{modalItem.brewerTips}</p>
                        </div>
                        
                      
                    </div>  
                </div>
                <div className='modal-item-alsoLike-title'>
                    <p>You may also like:</p>
                </div>
                <div className='modal-item-alsoLike'>                    
                    {alsoLikeBoxes}
                </div>          
            </div>
            
          
            
            </div> 
        )
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        parseData: (data)=> dispatch({type:'parseData', data:{data}})
    }
}


export default  connect(null,mapDispatchToProps)(Modal);



