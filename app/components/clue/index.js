import React, { Component } from 'react'
import { Row, Col,Tabs,Button} from 'antd'
import { Link ,hashHistory} from 'react-router'
import WindowSize from 'components/windowSize'
import ClueList from './clueDetail/clueList'
import NewClue from './clueDetail/newClue'

import './style.css'

const TabPane = Tabs.TabPane;

export default class clue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:"",
      address: "鄂尔多斯东胜区纺织街道23号4幢",
    }
    this.updateState=this.updateState.bind(this)
    this.newClue = this.newClue.bind(this)
  }
  componentDidMount() {
  }

  /*title(){
    const type =this.props.type
    switch(type){
      case 'address':
        return  (<span>
                  <span>{this.state.address}</span>
                </span>)
      case 'people':
        return  (<span>
                  <span className="detail-box-name">翁沛洋</span>
                  <span className="idnumber">330106200308152112</span>
                </span>)
      default:
        return null
    }
  }*/

  newClue(){
    // const nextLocation = hashHistory.createLocation({pathname:`/cue$/newClue/${'newClue'}${this.props.type}:${this.props.id}`,state:{type:111}})
    // hashHistory.push(nextLocation)
  }

  updateState(){
    this.setState({})
  }
  render() {
    const location = this.props.locationType || 'clue' 
    return (
      <div className="detail-content">
        {/*<Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
              <div className="title-wrap">
                {this.title()}
              </div>
            </Col>
          }
        </Row>*/}
        <div className="list-tab" style={{height:$GLOBALCONFIG.PAGEHEIGHT-170+'px',overflowY:'auto',overflowX:'hidden'}}>
          <WindowSize updateState={this.updateState}/>
          <ClueList clueType={this.props.clueType} id={this.props.id}/>
        </div>
        <div className="ability-button">
          <Button>
            <Link to={`/${location}$/newClue/${'newClue'}${this.props.type}:${this.props.id}`}>
              新增线索
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}
