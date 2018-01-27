import React from 'react';

class SingleItem extends React.Component {
    render (){
        let style;
        if ( this.props.imgUrl === 'https://images.punkapi.com/v2/keg.png') {
            style={
                width:'32%'
            }
        }
        return (
            <div  className='col-1-4' onClick={this.props.parseData}>
                <div className='singleItem'  onClick={this.props.click}>
                    <img style={style} alt='beer' src={this.props.imgUrl} /> 
                    <div className='item-description'>
                        <h5>{this.props.name}</h5>  
                        <p>{this.props.tagline}</p>
                    </div>
            
                </div>
            </div>
        )
    }

}


export default SingleItem
