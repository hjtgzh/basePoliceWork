import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import { house_submenu } from 'utils/config'
import HouseAddrList from './houseAddrList'
import HouseRoomList from './houseRoomList'
import AddressList from './addressList'

const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
    })
)

// 声明组件  并对外输出
export default class house extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { activeSub: 'houseAddrList'}
  }

  // 组件已经加载到dom中
  componentDidMount() {
   const houseId = this.props.houseId || this.props.params.houseId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `实有房屋`,
        key: `/house$`,
      }))
    }
  }

  componentWillMount() {
    if($GLOBALCONFIG.tabCache[`/house`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/house`].val})
    }
  }

  _getTabMenus(){
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(house_submenu[0])
    menu.push(house_submenu[1])
    menu.push(house_submenu[2])
    return menu
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = {key: `/house`, val: key}
    $GLOBALCONFIG.tabCache[`/house`] = tab
  }

  
  render() {
    let { loading } = this.props.houseDetailResult || false
    if(loading == 'undefined'){
      loading = false
    }
    // debugger
    const { dispatch } = this.props
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const templateConfig = {
      houseAddrList: (<HouseAddrList houseId={1} />),
      houseRoomList: (<HouseRoomList houseId={1} />),
      addressList: (<AddressList houseId={1} />),
    }

    // console.log(this.state.activeSub);

    return (
      <Panel>
        <Spin spinning={ false }>
          <Tabs 
            className="right-nav-second" 
            defaultActiveKey={this.state.activeSub} 
            tabPosition="top" 
            onChange={this._tabChange} >
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url} >
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
