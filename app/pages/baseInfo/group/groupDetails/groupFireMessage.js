/**
 * Created by 余金彪 on 2016/12/14.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd'
import {groupFireMessageNew, getGroupFireEquipment} from 'actions/department'
import GroupFireMessageIndex from './groupFireMessageModal/groupFireMessageIndex'
import GroupFireEquipmentIndex from './groupFireMessageModal/groupFireEquipmentIndex'
const TabPane = Tabs.TabPane
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    searchGroupFireMessage: state.searchGroupFireMessage,
    searchGroupFireEquipment: state.searchGroupFireEquipment,
  })
)
export default class groupFireMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'groupFireMessageIndex',
    }
    this.typeChange = this.typeChange.bind(this)
  }

  componentDidMount() {

  }

  componentWillMount() {
    if($GLOBALCONFIG.tabCache[`/groupFireMessage`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/groupFireMessage`].val})
    }
  }
  typeChange = (key) => {
    this.setState({activeTab: key})
    const tab = {key: `/groupFireMessage`, val: key}
    $GLOBALCONFIG.tabCache[`/groupFireMessage`] = tab
  }


  render() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const templateConfig = {
      groupFireMessageIndex: (<GroupFireMessageIndex departmentId={departmentId} />),
      groupFireEquipmentIndex: (<GroupFireEquipmentIndex  departmentId={departmentId} />),
    }
    return (
      <div className="nav-second-nextContent">
        <div className="gform-next-div">
          <Tabs className="list-map-tabs" defaultActiveKey="groupFireMessageIndex" tabPosition="top"
                onChange={this.typeChange}>
            <TabPane tab="消防基本信息" key="groupFireMessageIndex"> </TabPane>
            <TabPane tab="消防器材" key="groupFireEquipmentIndex"></TabPane>
          </Tabs>
          <div className="tab-main">
            {templateConfig[this.state.activeTab]}
          </div>
        </div>
      </div>
    )
  }
}

