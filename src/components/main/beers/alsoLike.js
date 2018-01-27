import React from 'react'

class AlsoLike extends React.Component {
    render (){
        let style;
        if (this.props.imgUrl === 'https://images.punkapi.com/v2/keg.png'){
            style = {
                width :'32%'
            }
        }
        return (
            <div onClick={this.props.parseData} className='modal-item-alsoLike-container-item'>
                <img style={style} src={this.props.imgUrl}  alt='beer-you-might-like'/>
                <p>{this.props.name}</p>
            </div>
        )
    }
}


export default AlsoLike;