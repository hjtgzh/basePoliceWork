import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Spin } from 'antd'
import Panel from 'components/panel'

import { updateTabList } from 'actions/tabList'
import { SECURITY_SUB_MENUS } from 'utils/config'

import CaseReview from './detail/caseReview'
import CaseRecord from './detail/caseRecord'
import CaseLog from './detail/caseLog'
//import AddressList from './addressList'

const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

// 声明组件  并对外输出
export default class goodsTabs extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {activeSub: 'caseReview'}
  }

  // 组件已经加载到dom中
  componentDidMount() {
    const securityId = this.props.securityId || this.props.params.securityId || 1
     if (this.props.params) {
     // 若非嵌套，则执行
     this.props.dispatch(updateTabList({
       title: `治安详情`,
       key: `/security$Tabs/${securityId}`,
       })
     )}
    // this.props.dispatch(fetchGoodsDetail({ securityId: securityId}))
  }
  
  componentWillMount(){
    const securityId = this.props.securityId || this.props.params.securityId || 1
    if($GLOBALCONFIG.tabCache[`/securityTabs/${securityId}`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/securityTabs/${securityId}`].val})
    }
  }

  _getTabMenus() {
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(SECURITY_SUB_MENUS[0])
    menu.push(SECURITY_SUB_MENUS[1])
    menu.push(SECURITY_SUB_MENUS[2])
    return menu
  }

  _tabChange = (key) => {
    this.setState({activeSub: key})
    const securityId = this.props.params.securityId || 1
    const tab = {key: `/securityTabs/${securityId}`, val: key}
    $GLOBALCONFIG.tabCache[`/securityTabs/${securityId}`] = tab
  }


  render() {
    //let { loading } = this.props.goodsDetailResult || false
    /*if(loading == 'undefined'){
     loading = false
     }*/
    // debugger
    //const { dispatch } = this.props
    const securityId = this.props.securityId || this.props.params.securityId || 1
    const templateConfig = {
      caseReview: (<CaseReview securityId={securityId}/>),
      caseRecord: (<CaseRecord securityId={securityId}/>),
      caseLog: (<CaseLog securityId={1}/>),
    }

    // console.log(this.state.activeSub);

    return (
      <Panel>
        <Spin spinning={ false }>
          <Tabs 
            className="right-nav-second" 
            defaultActiveKey={this.state.activeSub} 
            tabPosition="top" 
            onChange={this._tabChange}>
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url}>
                </TabPane>
              ))
            }
          </Tabs>
          <div className="tab-main">
            {templateConfig[this.state.activeSub]}
          </div>
        </Spin>
      </Panel>
    )
  }
}