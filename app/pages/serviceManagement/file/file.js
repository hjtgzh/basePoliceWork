import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs,Modal,Spin } from 'antd'
import { updateTabList } from 'actions/tabList'
import {FILE_SUB_MENUS} from 'utils/config'
import Management from './fileManagement/fileManagement'
import Count from './fileCount/fileCount'

import Panel from 'components/panel'
import Gform from 'components/gForm'
import './style.css'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      
    })
)

// 声明组件  并对外输出
export default class file extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub:"fileManagement"
    }
    
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `档案号管理`,
        key: `/file$`,
      }))
    }
  }

  componentWillMount() {
    if($GLOBALCONFIG.tabCache[`/file`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/file`].val})
    }
  }
 
  //获取tabs项
  getTabMenus(){
    const menu=[]
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(FILE_SUB_MENUS[0])
    menu.push(FILE_SUB_MENUS[1])
    return menu
  }
  tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = {key: `/file`, val: key}
    $GLOBALCONFIG.tabCache[`/file`] = tab
  }
  render() {
    const templateConfig={
      fileManagement:(<Management/>),
      fileCount:(<Count/>)
    }
    return (
      <Panel>
      <Spin spinning={ false }>
        <Tabs 
          defaultActiveKey={this.state.activeSub} 
          className="right-nav-second" 
          onChange={this.tabChange}>
          {
            this.getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url}>
                 
                </TabPane>
              ))
            }
        </Tabs>
        <div className="tab-main">{templateConfig[this.state.activeSub]}</div>
        
        </Spin>
      </Panel>
    )
  }
}
