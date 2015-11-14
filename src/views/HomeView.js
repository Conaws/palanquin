import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from 'actions';
import {Link}                 from 'react-router';
import {divStyle, center, PalanquinImage}           from 'styles';
import Modal from 'react-modal';
import * as R from 'ramda';
import * as l from 'lodash-fp';
import {Motion, spring} from 'react-motion';



const blue = '#337ab7';

const flatButton  =  { cursor: 'pointer', padding: 12, margin:20, minWidth: 100, maxWidth: 200, color: blue, minHeight: 50, border: "1px solid black", borderRadius: 5};


const parent = {
        minHeight: '100vh',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-end',
        overflow: 'scroll'
        };


const child1 = {alignSelf: 'flex-end', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}


const child2= {alignSelf: 'center', flexWrap: 'wrap', display: 'flex', justifyContent: 'center', flex: 1}
const innerchild = {alignSelf: 'center', backgroundColor: 'purple', fontSize: 40}

const child3 = {alignSelf: 'flex-start', backgroundColor: 'orange', display: 'flex', alignItems: 'flex-end'}


        //   <div style={{alignSelf: 'flex-end', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}}>
        //       <div style={{fontSize: 40}}>
        //       <strong>Bottom</strong>
        //       </div>
        //   </div>
        //   <div style={{alignSelf: 'flex-end', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}}>
        //       <div style={{fontSize: 40}}>
        //       <strong>Bottom</strong>
        //       </div>
        //   </div>

        // </div>

const bluebox = (inner) => { return <Motion 
          defaultStyle={{x: 0, z: 0, y: 0}} 
          style={{x: spring(720, [20, 9]), z: spring(400), y: spring(300)}}>
            {value => {
              let viz = {
                backgroundColor: 'purple',
                display: 'flex',
                border: '2px solid blue',
                borderRadius: 15, 
                justifyContent: 'center',
                width: value.y,
                height: value.z,
                opacity: (value.z / 400),
                transform: `rotate(${value.x}deg)`
              }
              return(<div style={viz}>{inner}</div>)}}
        </Motion>  
}

const box = (inner) => { return <Motion 
          defaultStyle={{x: 0, z: 0}} 
          style={{x: spring(720, [20, 12]), z: spring(400, [20, 12])}}>
            {value => {
              let viz = {
                backgroundColor: 'purple',
                whiteSpace: 'nowrap',
                display: 'flex',
                justifyContent: 'center', 
                border: '2px solid red',
                marginTop: 15,
                marginBottom: 15,
                height: value.z / 6,
                opacity: (value.z / 400),
                transform: `rotate(${value.x}deg)`
              }
              return(<div style={viz}>{inner}</div>)}}
        </Motion>  
}




// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const mapStateToProps = (state) => ({
  poem : state.poem,
  routerState : state.router,
  poemlist : state.poemlist
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});


export class HomeView extends React.Component {
  constructor(props){
    super(props)
    this.state = {visible: false}
    console.log(this.state)
  }
  static propTypes = {
    actions  : React.PropTypes.object,
    poem     : React.PropTypes.object,
    poemlist : React.PropTypes.array
  }

  closeMe(){
    this.setState({visible: false}); 
  }


  render () {

    let {poemLoad} = this.props.actions;
    return (
        <div style={parent}>
        {(this.state.visible)? bluebox(
                <div>
                <h1>Hello</h1>
                <div onClick={() => {
                  this.setState({visible: false}); 
                  console.log(this.state)}}
                  style={flatButton}>
                    Nevermind
                  </div>
                </div>) : ""}
          <div>
            {bluebox(
              <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems:'center', color: 'white'}}>          
              <img style={{height: 75}} src={PalanquinImage}/>
              {box(<div style={{fontSize: 40, display: 'flex', flexDirection: 'column', justifyContent:'center', padding: 5}}>Palanquin</div>)}
              <strong>{l.sample(["Better Than A Camel", "The Original Luxury Transportation", "Because You're Too Good For Walking"])}</strong>
              <div style={{flexGrow:1}}>   
                <Link to={"/map"}>
                  <div style={flatButton}>
                    {l.sample(["Your Chariot Awaits", "Summon the Serfs"])}
                  </div>
                </Link>
              </div>
                <div style={{overflow: 'hidden', border: '2px solid white', width: 200}}>
                  <img style={{height:75, marginRight:-200}} src={PalanquinImage} />
                </div>
              </div>
            )}
          </div>
        </div>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
