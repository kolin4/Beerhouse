import React from 'react';

class Spinner extends React.Component{
    render(){
        return (
            <div className={`${this.props.class}-container`}>
                <div className={this.props.class}></div>
            </div>
        )
    }
}


export default Spinner; 