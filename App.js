import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from  './components/header/Header';
import Home from './components/main/home/home';
import Beers from './components/main/beers/Beers';
import Modal from './components/main/beers/modal';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div className="App"> 
              <Header />
              <main>
                <div className='container'>
                   <Route path='/' exact  component={Home}/> 
                   <Route path='/beers'  component={Beers}/>
                   <Route path='/beers/:id'  component={(props)=><Modal props={props} itemData={this.props.parseData}/>} />
                </div>   
              </main>  
            
       </div>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = state =>{ 
  return{
    parseData: state.beers.parseData
  }
}

export default connect(mapStateToProps)(App);
