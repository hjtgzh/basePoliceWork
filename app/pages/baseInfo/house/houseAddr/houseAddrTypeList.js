/**
 * Created by Administrator on 2016-12-28.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs ,Icon,Pagination,Row ,Col} from 'antd'
import TableList from 'components/tableList/tableList'
import {
  fetchRoomCheckList,
  updateHouseCheckListQuery,
  resetHouseCheckListQuery } from 'actions/house'

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    roomCheckSearchResult: state.roomCheckSearchResult,
    amList: state.amList,
  })
)

// 声明组件  并对外输出
export default class houseRoomTypeList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,

    }
  }
  // 组件已经加载到dom中
  componentDidMount() {
    // console.log('子列表已加载')
    // this.props.dispatch(fetchRoomCheckList({ currentPage: 1}))
  }
  componentWillReceiveProps(nextProps) {
    // console.log('传来的数据'+nextProps)
  }
  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
        width:50,
      },
      {
        title: '建筑物地址',
        dataIndex: 'address',
        key: 'address',
        width:350,
        render: function(text,record){
          // debugger
          // console.log(record)
          return (
            <div>
              <Row gutter={16}>
                <Col span={2} style={{width:"20px"}}>
                  <Icon type="environment-o left" style={{color:
                    record.houseStatus == "完成访查" ? "#0f0" :
                    record.houseStatus == "已建房未访查" ? "#f0f" :
                    record.houseStatus == "已标注未建房" ? "blue" : "gray",
                    }}
                  />
                </Col>
                <Col span={18} className="left addr-ellipsis">
                  <span>{text}</span>
                </Col>
                <Col span={4}>
                  <Link className="right" to={`/house$Detail/${record.id}`}>详情</Link>
                </Col>
              </Row>
              
            </div>
          )
        }
      },
      {
        title: '行政区划',
        dataIndex: 'division',
        key: 'division',
        width:120,
      },
      {
        title: '管辖单位',
        dataIndex: 'institutions',
        key: 'institutions',
        width:100,
      },
      {
        title: '管辖警员',
        dataIndex: 'policeName',
        key: 'policeName',
        width:100,
      },
      {
        title: '房屋状态',
        dataIndex: 'houseStatus',
        key: 'houseStatus',
        width: 120,
      },
      {
        title: '地址属性',
        dataIndex: 'addressType',
        key: 'addressType',
        width: 120,
      },
    ]
  }
  render(){
    const {
      houseCheckSearchResult,
      loading,
    } = this.props
    // console.log(houseCheckSearchResult)
    // console.log(houseCheckSearchResult.loading)
    const houseResultList = []
    if(houseCheckSearchResult){
      for(let item in houseCheckSearchResult.list){
        houseResultList.push({
          id: houseCheckSearchResult.list[item].id, 
          address: houseCheckSearchResult.list[item].bzdz, 
          division: houseCheckSearchResult.list[item].qxmc,
          institutions: houseCheckSearchResult.list[item].pcsmc,
          policeName: houseCheckSearchResult.list[item].cjr,
          houseStatus: houseCheckSearchResult.list[item].lzzt == '0' ? '完成访查' : houseCheckSearchResult.list[item].lzzt == '3' ? '已建房未访查' : houseCheckSearchResult.list[item].lzzt == '0' ? '已标注未建房' : '已建房访查中',
          addressType: houseCheckSearchResult.list[item].dzlx == '1' ? '标准地址' : houseCheckSearchResult.list[item].dzlx == '0' ? '非标准地址' : houseCheckSearchResult.list[item].dzlx == '2' ? '不规范地址' : '集体户地址',
        })
      }   
    }
    // console.log(houseResultList)
    return(
      <TableList
        columns={this.columns()}
        dataSource={houseResultList}
        loading={houseCheckSearchResult.loading}
        totalCount={houseCheckSearchResult.totalCount}
        scroll={{x:1000,y: true}}
        pagination={false}
      />
    )
  }


}