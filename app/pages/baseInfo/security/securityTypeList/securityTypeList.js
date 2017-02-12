import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {} from 'antd'

import TypeList from '../common/typeList'
import {
  fetchSecurityList, //获取列表
} from 'actions/security'

import TableList from 'components/tableList/tableList'
import moment from 'moment'

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    securityListSearchResult:state.securityListSearchResult
  })
)
export default class SecurityTypeList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      currentpage: 1,
      pagesize: 3,
    }
    this.params ={
      gxdwid : 330106,
      currentPage : 1,
      pageSize : 10,
    }
  }

  componentWillMount() {
    this.getSecurityList(this.state.currentpage, this.state.pagesize);
  }

  getSecurityList(currentpage, pagesize){
    this.props.dispatch(fetchSecurityList({
      pageNo: currentpage,
      pageSize: pagesize,
      gxdwid:"",
      privilegeid:"",
      name:"",
      ajlb1:"",
      ajzt:"",
    }))
  }

//改变每页显示条数回调函数
  pageSizeChange(e, pageSize) {
    this.setState({
      pagesize: pageSize
    })
    this.getSecurityList("1", pageSize)
  }

  //点击每页回调函数
  pageChange(currentPage) {
    this.setState({
      currentpage: currentPage
    })
    this.getSecurityList(currentPage, this.state.pagesize)
  }

  //列表表头配置
  columns() {
    const _self = this
    return [
      {
        title: '案件类别',
        dataIndex: 'ajlb',
        key: 'ajlb',
        width: '18%'
      },
      //{
      //  title: '案件名称',
      //  dataIndex: 'ajmc',
      //  key: 'ajmc',
      //  width: '10%'
      //},
      {
        title: '案件编号',
        dataIndex: 'ajbh',
        key: 'ajbh',
        width: '18%',
        render: function (text, record, index) {
          return (
            <span>{text}
              <Link className="btn-detail-jxy" to={`/security$Tabs/${record.id}`}>详情</Link>
            </span>
          );
        },
      },
      {
        title: '案发时间',
        dataIndex: 'fssj',
        key: 'fssj',
        width: '18%',
        render: function (text, record, index) {
          return moment(record.fssj).format("YYYY-MM-DD");
        },
      },
      {
        title: '案发地址',
        dataIndex: 'afdz',
        key: 'afdz',
        width: '18%'
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdw',
        key: 'gxdw',
        width: '18%'
      },
      {
        title: '案件状态',
        dataIndex: 'ajzt',
        key: 'ajzt',
        width: '10%'
      },
      //{
      //  title: '可防',
      //  dataIndex: 'kf',
      //  key: 'kf',
      //  width: '5%'
      //},
    ]
  }

  render() {
    const {
      securityListSearchResult
      }=this.props
    const {
      currentPage,
      pageSize
      }=this.params
    console.log(securityListSearchResult)
    const loading = securityListSearchResult.loading ? true : securityListSearchResult.loading;
    return (
      <TableList
        columns={this.columns()}
        dataSource={securityListSearchResult.list}
        totalCount={securityListSearchResult.totalCount}
        loading={loading}
        currentPage={securityListSearchResult.pageNo}
        pageSize={securityListSearchResult.pageSize}
        scroll={{y: true}}
        onShowSizeChange={this.pageSizeChange.bind(this)}
        onChange={this.pageChange.bind(this)}
      />
    )
  }

}