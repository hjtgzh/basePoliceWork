import React, { Component } from 'react'
import {Input,Button,Row,Col,Table,Modal} from 'antd'
import { connect } from 'react-redux'
import {
  fetchHouseAddZrq,
} from 'actions/houseAddressDetail'

@connect(
  (state) => ({
    config: state.config,
    houseDelZrqResult: state.houseDelZrqResult,
  })
)

export default class bundDuty extends Component{
	constructor(props){
		super(props)
		this.state = {
		}
    this.bindHandle = this.bindHandle.bind(this)
	}

  bindHandle(record){
    this.props.dispatch(fetchHouseAddZrq({zrqdm:record.zrqdm,id:this.props.addressId},(result)=>{
      this.props.bindResult(record)
    }))
  }

	columns() {
    const pcsmc = this.props.pcsmc
		return [
				{
					title:'责任区名称',
					dataIndex: 'gxdwqc',
					key:'gxdwqc',
				},
				{
					title:'责任区管辖单位	',
					dataIndex: 'pcsmc',
					key:'pcsmc',
          render: (text, record, index) => <span>{pcsmc}</span>,
				},
				{
					title:'操作',
					dataIndex: 'handle',
					key:'handle',
					render: (text, record, index) => <a onClick={this.bindHandle.bind(this,record)}>绑定</a>,
				},
			]
	}
	
	render(){
		return(
      <Modal className="modal-header" title={this.props.title} visible={this.props.visible} onCancel={this.props.onCancel}>
          <Table 
            className="tip-postion"
            pagination={false}
          	dataSource={this.props.list} 
          	columns={this.columns()}
          />
      </Modal>
		)
	}
}