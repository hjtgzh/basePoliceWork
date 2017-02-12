import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col, Form, Select, Input, DatePicker } from 'antd'
import BlastingUnit from './blastingUnit'
import BlastingStore from './blastingStore'
import BlastingProject from './blastingProject'
const Option=Select.Option
const FormItem=Form.Item
const TabPane=Tabs.TabPane

export default class groupBlastingUnit extends Component{
  constructor(props){
    super(props)
    this.state={
      activeSub:'BlastingUnit'
    }
    this._tabChange=this._tabChange.bind(this)
    // this.updateState=this.updateState.bind(this)
  }
  componentDidMount(){
    if($GLOBALCONFIG.tabCache[`/departmentDetail/groupBlastingUnit`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/departmentDetail/groupBlastingUnit`].val})
    }
  }

  _getTabMenus(){
    return [
      {name:'爆破单位',key:'BlastingUnit'},
      {name:'爆破仓库',key:'BlastingStore'},
      {name:'爆破项目',key:'BlastingProject'},
    ]
  }

  _tabChange(key){
    this.setState({ activeSub: key })
    const tab = {key: `/departmentDetail/groupBlastingUnit`, val: key}
    $GLOBALCONFIG.tabCache[`/departmentDetail/groupBlastingUnit`] = tab    
  }
  render(){
    const templateConfig = {
      BlastingUnit: (<BlastingUnit departmentId={this.props.departmentId} />),
      BlastingStore: (<BlastingStore departmentId={this.props.departmentId} />),
      BlastingProject: (<BlastingProject departmentId={this.props.departmentId} />),
    }
    return (
      <div className="detail-content">
        <Tabs defaultActiveKey="BlastingUnit" tabPosition="top" onChange={this._tabChange} activeKey={this.state.activeTab}>
          {
            this._getTabMenus().map((sub) => (
              <TabPane tab={sub.name} key={sub.key}>
              </TabPane>
            ))
          }
        </Tabs>
        <div className="tab-main">
          {templateConfig[this.state.activeSub]}
        </div>
      </div>
    )
  }
}