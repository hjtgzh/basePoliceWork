import React, { Component } from 'react'
import {Input,Button,Row,Col,Table,Modal,message} from 'antd'
import { connect } from 'react-redux'

import {
	fetchHouseHh,
	fetchHouseAddBuildHh,
} from 'actions/houseAddressDetail'

@connect(
  (state) => ({
    config: state.config,
    houseHhResult: state.houseHhResult,
  })
)
export default class houseNumber extends Component{
	constructor(props){
		super(props)
		this.state = {
			value:'',
			list:[
				{
					xm:'John Brown',
					sfzh:'23333',
					hhid:'10086',
					dz:'china',
				}
			]
		}
		this.handleSearch = this.handleSearch.bind(this)
		this.bindHandle = this.bindHandle.bind(this)
		this.setText = this.setText.bind(this)
	}

	handleSearch(){
		this.props.dispatch(fetchHouseHh({keyword:this.state.value}))
	}

	bindHandle(record){
		this.props.dispatch(fetchHouseAddBuildHh({id:this.props.addressId,hh:record.hh},(result)=>{
			this.props.bindHh(record)
			
		}))
	}

	setText(e){
		this.setState({value:e.target.value})
	}
	columns() {
		const self = this
		return [
				{
					title:'姓名',
					dataIndex: 'xm',
					key:'xm',
					render: (text, record, index) => <span>{text}</span>,
				},
				{
					title:'身份证号	',
					dataIndex: 'sfzh',
					key:'sfzh'
				},
				{
					title:'户号		',
					dataIndex: 'hhid',
					key:'hhid'
				},
				{
					title:'参考地址		',
					dataIndex: 'dz',
					key:'dz'
				},
				{
					title:'操作',
					dataIndex: 'handle',
					key:'handle',
					render: (text, record, index) => <a onClick={self.bindHandle.bind(this,{
						hh:record.hhid,
						hhxm:record.xm,
						dhhm:record.dhhm,
						sfzh:record.sfzh,
					})}>绑定</a>,
				},
			]
	}
	

	render(){
		const houseHhResult = this.props.houseHhResult
		return(
			<Modal className="modal-header" title={this.props.title} visible={this.props.visible} onCancel={this.props.onCancel}>
				<div className="detail-content detail-content-input">
				  <Row gutter={16}>
						<Col span={20}>
	            <Input placeholder="请输入姓名或身份证" maxLength='20' value={this.state.value} onChange={this.setText}
	              onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} 
	            />
	          </Col>
	          <Col span={4}>
	            <Button type='primary' onClick={this.handleSearch} loading={houseHhResult.loading}>搜索</Button>
	          </Col>
	        </Row>
	        <Table 
	        	pagination={false}
	        	dataSource={this.props.houseHhResult.list} 
	        	columns={this.columns()}
	        />
				</div>
			</Modal>
		)
	}
}