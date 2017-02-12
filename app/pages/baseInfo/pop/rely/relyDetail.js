import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, Tabs } from 'antd'
import Panel from 'components/panel'

// import TagAndButton from 'components/detailContent/tagAndButton'
import { updateTabList, deleteTabFromList } from 'actions/tabList'
import { RELY_SUB_MENUS } from 'utils/config'

import Basic from './detail/basic'
import RewaInfo from './detail/rewardInfo'

const TabPane = Tabs.TabPane

@connect(
    (state) => ({
      config: state.config,
    })
)
export default class relyDetail extends Component {
  constructor(props, context) {
    super(props)
    this.state = { activeSub: 'basic' }
    this.deleteTab = this.deleteTab.bind(this)
  }
  static contextTypes() {
    return {
      router: React.PropType.object.isRequired,
    }
  }
  componentDidMount() {
    const peopleID = this.props.peopleID || this.props.params.peopleID || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '个人详细信息',
        key: `/pop$/relyDetail/${peopleID}`,
      }))
    }
  }

  componentWillMount() {
    const relyId = this.props.peopleID || this.props.params.peopleID || 1
    if ($GLOBALCONFIG.tabCache[`/pop$/relyDetail/${relyId}`]) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/pop$/relyDetail/${relyId}`].val })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.peopleID !== nextProps.params.peopleID) {
      const peopleID = nextProps.params.peopleID || 1
      if ($GLOBALCONFIG.tabCache[`/pop$/relyDetail/${peopleID}`]) {
        this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/pop$/relyDetail/${peopleID}`].val })
      } else {
        this.setState({ activeSub: 'basic' })
      }
    }
  }

  deleteTab() {
    const peopleID = this.props.peopleID || this.props.params.peopleID || 1
    this.props.dispatch(deleteTabFromList({
      targetKey: `/pop$/relyDetail/${peopleID}`,
    }))
    hashHistory.push('/pop')
  }
  // 侧边栏
  _getTabMenus() {
    const CURRENT_SUB_MENU = []
    CURRENT_SUB_MENU.push(RELY_SUB_MENUS[0])
        /* if(allowRole.allow_shop_real_order){
            CURRENT_SUB_MENU.push(HOUSE_SUB_MENUS[1]);
        }
        if(allowRole.allow_shop_his_order){
            CURRENT_SUB_MENU.push(HOUSE_SUB_MENUS[2]);
        }
        if(allowRole.allow_shop_call_recode){
            CURRENT_SUB_MENU.push(HOUSE_SUB_MENUS[3]);
        }
        if (allowRole.allow_shop_account_recode) {
            CURRENT_SUB_MENU.push(HOUSE_SUB_MENUS[5]);
        }*/
    CURRENT_SUB_MENU.push(RELY_SUB_MENUS[1]);
    // console.log('CURRENT_SUB_MENU', CURRENT_SUB_MENU)
    return CURRENT_SUB_MENU
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const relyId = this.props.peopleID || this.props.params.peopleID || 1
    const tab = { key: `/pop$/relyDetail/${relyId}`, val: key }
    $GLOBALCONFIG.tabCache[`/pop$/relyDetail/${relyId}`] = tab
  }

  render() {
    const nameId = this.props.peopleID || this.props.params.peopleID || 1
    const templateConfig = {
      basic: (<Basic nameId={nameId} deleteTab={this.deleteTab} />),
      rewardInfo: (<RewaInfo nameId={nameId} />),
    }

    return (
      <Panel>
        <Spin spinning={false}>
          <div className="detail-wrapper">
            <div className="detail-tab">
              <Tabs
                defaultActiveKey={this.state.activeSub}
                activeKey={this.state.activeSub}
                className="right-nav-second"
                tabPosition="top"
                onChange={this._tabChange}
              >
                {
                  this._getTabMenus().map((sub) => (
                    <TabPane tab={sub.name} key={sub.url} />
                  ))
                }
              </Tabs>
              <div className="nav-second-nextContent">
                { templateConfig[this.state.activeSub]}
              </div>
            </div>
          </div>
        </Spin>
      </Panel>
    )
  }
}
