import React, { Component } from 'react'
import { Row, Col, Modal, Input, Icon, message, Form, Button} from 'antd'
const FormItem = Form.Item;


@Form.create({
  onFieldsChange(props, items) {

  },
})
export default class AddRoomModal extends Component{
  constructor(props){
		super(props)
	  this.state = {
	    showModal : false,
	  }
	  this.addRoomOK = this.addRoomOK.bind(this)
	  this.addRoomCancel = this.addRoomCancel.bind(this)
    this.checkRoomName = this.checkRoomName.bind(this)
  }
  //组件加载完毕
  componentDidMount(){

  }
  //props更新函数
  componentWillReceiveProps(nextProps){
  	if (this.state.showModal !== nextProps.visiable) {
  		this.setState({showModal : nextProps.visiable})
  	}
  }

  checkRoomName(rule, value, callback){
    if(value){
      if (value.trim() == '') {
        callback("请输入房间名称。")
        return
      }
      const { uniteObj } = this.props
      uniteObj.floors.forEach(function(floorObj,index){
        floorObj.rooms.forEach(function(roomObj,index){
          if (value === roomObj.roomname) {
            callback("该单元内已存在该房间名称,请修改。")
            return
          }
        })
      })
    }
    callback()
  }
  //弹窗取消
  addRoomCancel(){
    this.props.onAddRoomCancel()
  }
  //弹窗确认
  addRoomOK(){
  	const _self = this
    this.props.form.validateFields((err, values) => {
      if(!err){
        const { uniteObj, floorObj } = this.props
        const fjmc = values["roomname"]
        const wz = ((floorObj.rooms.pop()||{}).location || 0) + 1
        const lcs = floorObj.floor
        const lcjc = lcs + "层"
        const { dy,dyjc } = uniteObj
        const params = {"wz" : wz, "lcs" : lcs, "lcjc" :lcjc, "dy" : dy, fjmc : fjmc, "dyjc" : dyjc}
        _self.props.onAddRoomOk(params)
      }
    })
  }

  render(){
  	const { getFieldDecorator } = this.props.form
  	const formItemLayout = {
  	  labelCol: {span: 6},
      wrapperCol: {span: 14},
  	}
  	return(
  		<div>
        {this.state.showModal ? 
  	  	  <Modal 
  	        className="editRoomInfoModal"
  	        title="新增房间" 
  	        visible={this.state.showModal} 
            closable={false}
            footer = { <div> 
                          <Button type="primary" loading={ this.props.loading } onClick={ this.addRoomOK }>确定</Button> 
                          <Button onClick={ this.addRoomCancel }>取消</Button> 
                        </div>  
                     }
  	      >
  	      	<Form horizontal>
  	      	  <FormItem
  	      	    {...formItemLayout}
  	      	    label="房间名称"
  	      	    hasFeedback
  	      	   >
  	      	  {getFieldDecorator('roomname',{
  	      	  	rules: [
                  {required : true, message: "请输入房间名称"},
                  {validator: this.checkRoomName},
                ],
  	      	  })(
  	      	  	<Input type="text" />
  	      	  )}
  	      	  </FormItem>
  	      	</Form>
  	      </Modal> : null
        } 
  	  </div>
  	)
  }
}