import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tabs } from 'antd'
import moment from 'moment'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import Pagination from 'components/pagination/pagination'
// 接入地图
import TypeMap from 'components/map/typeMap'
import { getSecurityMapPopContent } from 'components/map/mapUtils'
import getConfigItems from 'utils/getGformConfigItems'
import {
  updateTabList,
} from 'actions/tabList'
import {
  // 获取治安情况列表
  fetchSecurityList,
  // 获取治安情况详情
  fetchSecurityDetail,
} from 'actions/security'
import './style.css'
const TabPane = Tabs.TabPane;

const ajztItem = {
  '10': '呈请立案',
  '11': '案件移交',
  '12': '同意立案',
  '13': '不予立案',
  '14': '案件退回',
  '15': '呈请不立案',
  '16': '呈请移交',
  '20': '呈请破案',
  '21': '破案移交',
  '22': '同意破案',
  '23': '不同意破案',
  '24': '同意销案',
  '25': '不同意销案',
  '26': '呈请销案',
  '29': '破销案退回',
  '41': '事件作调解处理',
  '42': '事件作情况记录处理',
  '43': '事件转其他行政机关处理',
  '49': '事件作其他处理',
};

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取治安情况列表
    securityListSearchResult: state.securityListSearchResult,
  })
)

// 声明组件  并对外输出
export default class security extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'list',
    };
    this.pageData = {
      currentPage: 1,
      pageSize: 20,
    },
      this.searchKey = {
        gxdwid: '',  // 管辖单位
        privilegeid: '',  // 行政单位
        name: '',  // 关键词
        ajlb1: '', // 案件类别
        ajzt: '',  //案件类型
      }
    // 地图处理
    this.buildDataForMap = this.buildDataForMap.bind(this);
    // 设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
    this.setWinContent = this.setWinContent.bind(this);
    // Gfrom 搜索条件回调
    this.gFormSubmit = this.gFormSubmit.bind(this);
  }

  // 组件加载到dom前
  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/security']) {
      this.setState({ activeTab: $GLOBALCONFIG.tabCache['/security'].val })
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '治安情况',
        key: '/security$',
      }))
    }
    this.getSecurityList(this.pageData.currentPage, this.pageData.pageSize);
    getConfigItems(this, {
      XZQH: '',
      GXDW: sessionStorage.getItem('divisionid'),
    })
  }

  // 标题配置
  columns() {
    return [
      {
        title: '案件类别',
        dataIndex: 'ajlb',
        key: 'ajlb',
        width: '18%',
      },
      {
        title: '案件编号',
        dataIndex: 'ajbh',
        key: 'ajbh',
        width: '18%',
        render: function (text, record) {
          return (
            <p><span>{text}</span>
              <Link className="right" to={`/security$Tabs/${record.id}`}>详情</Link>
            </p>
          );
        },
      },
      {
        title: '案发时间',
        dataIndex: 'fssj',
        key: 'fssj',
        width: '10%',
        render: function (text, record) {
          return moment(record.fssj).format('YYYY-MM-DD');
        },
      },
      {
        title: '案发地址',
        dataIndex: 'afdz',
        key: 'afdz',
        width: '18%',
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwmc',
        key: 'gxdwmc',
        width: '18%',
      },
      {
        title: '案件状态',
        dataIndex: 'ajzt',
        key: 'ajzt',
        width: '10%',
        render: function (text, record) {
          return ajztItem[record.ajzt]
        },
      },
      //{
      //  title: '可防',
      //  dataIndex: 'kf',
      //  key: 'kf',
      //  width: '5%'
      //},
    ]
  }

  // 获取数据
  getSecurityList(currentpage, pagesize) {
    this.props.dispatch(fetchSecurityList({
      ...this.searchKey,
      pageNo: currentpage,
      pageSize: pagesize,
    }))
  }

  // 列表与地图模式切换的回调函数
  _typeChange = (key) => {
    this.setState({ activeTab: key })
    const tab = { key: '/security', val: key }
    $GLOBALCONFIG.tabCache['/security'] = tab
  }

  // 改变每页显示条数回调函数
  pageSizeChange(e, pageSize) {
    this.pageData.pageSize = pageSize;
    this.pageData.currentPage = 1;
    this.getSecurityList(this.pageData.currentPage, pageSize);
  }

  // 点击每页回调函数
  pageChange(currentPage) {
    this.pageData.currentPage = currentPage;
    this.getSecurityList(currentPage, this.pageData.pageSize);
  }

  // Gfrom搜索条件
  gFormConfig() {
    const { config } = this.props;
    return [
      {
        sort: 'superSelect',
        label: '行政区划',
        items: config.XZQH,
        key: 'xzqh',
        numResKey: 'xzqh',
        numReqKey: 'xzqhid',
        needNum: false,
        needMulti: false,
        needArrowIcon: false,
      },
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwid',
        needNum: false,
        needMulti: false,
        needArrowIcon: false,
      },
      {
        sort: 'singleSelect',
        label: '案件类别',
        items: [
          { name: '盗窃', id: '050200', lv: 1, pid: '' },
          { name: '抢劫', id: '050100', lv: 1, pid: '' },
          { name: '诈骗', id: '050300', lv: 1, pid: '' },
        ],
        key: 'ajlb1',
        needNum: false,
        needMulti: false,
        needArrowIcon: false,
      },
    ]
  }

  // 获取搜索结果
  gFormSubmit(query) {
    console.log(query)
    // 多选管辖单位
    const gxdwData = query.gxdw;
    if (gxdwData.length > 0) {
      const lvcode = query.gxdw[gxdwData.length - 1].lv;
      const gxdwidStr = [];
      for (let len = 0; len < gxdwData.length; len++) {
        const one = gxdwData[len];
        if (one.lv == lvcode) {
          gxdwidStr.push(one.id)
        }
      }
      this.searchKey.gxdwid = gxdwidStr.toString();
    } else {
      this.searchKey.gxdwid = sessionStorage.getItem('divisionid');
    }

    // 多选行政区划
    const xzqhData = query.xzqh;
    if (xzqhData.length > 0) {
      const lvcode = query.xzqh[xzqhData.length - 1].lv;
      const xzqhidStr = [];
      for (let len = 0; len < xzqhData.length; len++) {
        const one = xzqhData[len];
        if (one.lv == lvcode) {
          xzqhidStr.push(one.id)
        }
      }
      this.searchKey.privilegeid = xzqhidStr.toString();
    } else {
      this.searchKey.privilegeid = '';
    }

    // 多选案件类别
    //const ajlbData = query.ajlb1;
    // 多选案件类别
    // if(ajlbData.length>0){
    //  const ajlbidStr = [];
    //  for( let len = 0 ; len < ajlbData.length ; len++ ){
    //    const one = ajlbData[len];
    //    ajlbidStr.push(one.id)
    //  }
    //  this.searchKey.ajlb1= ajlbidStr.toString();
    // }else{
    //  this.searchKey.ajlb1= "";
    // }
    this.searchKey.ajlb1 = query.ajlb1.id || '';
    this.searchKey.name = query.keyword;

    this.pageData.currentPage = 1;
    this.getSecurityList(this.pageData.currentPage, this.pageData.pageSize);
  }

  // 处理地图数据
  buildDataForMap(marktype, data) {
    const dataForHtml = []
    const dataForMap = []
    data.map((item, index) => {
      const id = item.id
      const lon = item.jd || ''
      const lat = item.wd || ''
      const num = index + 1
      // 处理地图点位信息,确保地图点位坐标存在
      if (lon && lat) {
        dataForMap.push({
          id: id,
          title: item.ajbh || '',
          lon: lon,
          lat: lat,
          /* img: "",*/  // [type:string]可以放绝对地址以“http:”形式存放，可缺省为默认值
          marktype: marktype,
          content: '',
          num: num,
          size: { x: 35, y: 35 },
          sizeHover: { x: 35, y: 35 },
        })
      }
      // 处理地图左侧列表数据
      dataForHtml.push({
        id: id,
        content: item.ajbh || '',
        lon: lon,
        lat: lat,
        num: num,
        linkTo: `/security$Tabs/${id}`,
      })
    })
    return { dataForHtml: dataForHtml, dataForMap: dataForMap }
  }

  // 设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj, setContent) {
    this.props.dispatch(fetchSecurityDetail({ id: obj.id }, (result) => {
      const content = getSecurityMapPopContent(result.data)
      setContent(content)
    }))
  }

  render() {
    const {
      securityListSearchResult,
      } = this.props;
    const {
      currentPage,
      pageSize,
      } = this.pageData;
    const loading = securityListSearchResult.loading ? true : securityListSearchResult.loading;
    // 模拟地图数据
    const marktype = 'security';
    const { dataForHtml, dataForMap } = this.buildDataForMap(marktype, securityListSearchResult.list);
    return (
      <Panel>
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="security"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={securityListSearchResult.totalCount}
        />
        <div className="gform-next-div">
          <Tabs
            onChange={this._typeChange}
            defaultActiveKey={this.state.activeTab}
            tabPosition="top"
            className="list-map-tabs list-tabs"
          >
            <TabPane tab="列表" key="list">
              <TableList
                columns={this.columns()}
                dataSource={securityListSearchResult.list}
                scroll={{ y: true }}
                loading={loading}
              />
            </TabPane>
            <TabPane tab="地图" key="map">
              <TypeMap
                marktype={marktype}
                dataForHtml={dataForHtml}
                dataForMap={dataForMap}
                loading={loading}
                setWinContent={this.setWinContent}
              />
            </TabPane>
          </Tabs>
          <div className="ability-button">
            <Pagination
              totalCount={securityListSearchResult.totalCount}
              onShowSizeChange={this.pageSizeChange.bind(this)}
              onChange={this.pageChange.bind(this)}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>
        </div>
      </Panel>
    )
  }
}
