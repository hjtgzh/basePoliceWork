import React, { Component } from 'react'
import {Input,Button,Row,Col,Table,Modal} from 'antd'
import { connect } from 'react-redux'
import {
	fetchHouseDah,
	fetchHouseAddBuildDah,
} from 'actions/houseAddressDetail'

@connect(
  (state) => ({
    config: state.config,
    houseDahResult: state.houseDahResult,
  })
)

export default class archives extends Component{
	constructor(props){
		super(props)
		this.state = {
			value:'',
			list:[
				{
					fdxm:'John Brown',
					fdsfzh:'11123333',
					fddh:'10086',
					dah:'china',
				}
			]
		}
		this.handleSearch = this.handleSearch.bind(this)
		this.bindHandle = this.bindHandle.bind(this)
		this.setText = this.setText.bind(this)
	}

	handleSearch(){
		this.props.dispatch(fetchHouseDah({keyword:this.state.value}))
	}

	bindHandle(record){
		this.props.dispatch(fetchHouseAddBuildDah({id:this.props.addressId,dah:record.dah},(result)=>{
			this.props.bindDah(record)
			
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
					dataIndex: 'fdxm',
					key:'fdxm',
					render: (text, record, index) => <span>{text}</span>,
				},
				{
					title:'身份证号	',
					dataIndex: 'fdsfzh',
					key:'fdsfzh'
				},
				{
					title:'电话		',
					dataIndex: 'fddh',
					key:'fddh'
				},
				{
					title:'档案号		',
					dataIndex: 'dah',
					key:'dah'
				},
				{
					title:'操作',
					dataIndex: 'handle',
					key:'handle',
					render: (text, record, index) => <a onClick={self.bindHandle.bind(this,record)}>绑定</a>,
				},
			]
	}
	

	render(){
		const houseDahResult = this.props.houseDahResult
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
	            <Button type='primary' onClick={this.handleSearch} loading={houseDahResult.loading}>搜索</Button>
	          </Col>
	        </Row>
	        <Table 
	        	className="tip-postion"
	        	pagination={false}
	        	dataSource={this.props.houseDahResult.list} 
	        	columns={this.columns()}
	        />
				</div>
			</Modal>
		)
	}
}