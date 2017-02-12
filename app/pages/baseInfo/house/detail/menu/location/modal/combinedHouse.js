import React, { Component } from 'react'
import {Row,Col,Input,Select,Modal,Form,AutoComplete} from 'antd'
import { connect } from 'react-redux'

import {
  fetchHousebzdz,
  fetchHouseCombineBuilding
} from 'actions/houseAddressDetail'

const FormItem = Form.Item
const Option = Select.Option
const AOption = AutoComplete.Option

@Form.create({
  onFieldsChange(props, items) {
    console.log(items)
  },
})

@connect(
  (state) => ({
    config: state.config,
    houseBzdzResult: state.houseBzdzResult,
    houseCombineBuildingResult:state.houseCombineBuildingResult
  })
)

export default class combinedHouse extends Component{
	constructor(props){
		super(props)
		this.state={
      fbldid:''
		}
    this.searchDz = this.searchDz.bind(this)
    this.saveDz = this.saveDz.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}

  handleSubmit() {
    this.props.dispatch(fetchHouseCombineBuilding({bldid:this.props.addressId,fbldid:this.state.fbldid},()=>{
      const result = this.props.houseCombineBuildingResult
      this.props.bindBuilding({fbldid:result.id,fbzdz:result.fbzdz})
    }))
  }
  //搜索地址
  searchDz(value){
    this.props.dispatch(fetchHousebzdz({keyword:value}))
  }
  //保存地址id
  saveDz(e){
    this.state.fbldid=e
  }

	render(){
    const {getFieldDecorator} = this.props.form
    const {houseBzdzResult,houseCombineBuildingResult} = this.props
		return(
      <Modal 
        className="modal-header" 
        title={this.props.title} 
        visible={this.props.visible} 
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        confirmLoading={houseCombineBuildingResult.loading}
        >
  			<div className="combinedHouse-lzr">
  				<Row gutter={16}>
  					<Col span="3">
              <span className='combinedHouse-address'>主地址</span>
            </Col>
            <Col span="21">
              <Input className="mainAddress" value={this.props.mainAddress} placeholder="地名办命名的道、路、街、巷" readOnly disabled />
            </Col>
          </Row>
          <Row gutter={16}>
           	<Col span="3">
              <span className='combinedHouse-address'>辅地址</span>
            </Col>
            <Col span="21">
              <AutoComplete
                style={{width:'100%'}}
                onChange={this.searchDz}
                onSelect={this.saveDz}
              >
              {
                houseBzdzResult.list.map(sub=>(
                  <AOption key={sub.id}>{sub.bzdz}</AOption>
                ))
              }
              </AutoComplete>
            </Col>
          </Row>
  			</div>
      </Modal>
		)
	}
}