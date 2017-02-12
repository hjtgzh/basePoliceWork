import React, { Component } from 'react'
import { Row, Col, Modal, Input, Icon, message, Form, Button} from 'antd'
const FormItem = Form.Item;


@Form.create({
  onFieldsChange(props, items) {

  },
})
export default class EditRoomInfoModal extends Component{
  constructor(props){
		super(props)
	  this.state = {
	    showModal : false,
	  }
	  this.editRoomInfoOK = this.editRoomInfoOK.bind(this)
	  this.editRoomInfoCancel = this.editRoomInfoCancel.bind(this)
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
      const { roomObj,uniteObj } = this.props
      if (value.trim() == '') {
        callback("请输入房间名称。")
        return
      }
      if (roomObj.roomname == value) {
         callback("请更改房间名称。")
         return
      }
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
  editRoomInfoCancel(){
    this.props.onEditRoomCancle()
  }
  //弹窗确认
  editRoomInfoOK(){
  	const _self = this
    this.props.form.validateFields((err, values) => {
      if(!err){
        const { roomObj } = this.props
      	const fjmc = values["roomname"]
        const params = {"id" : roomObj.fjid, "fjmc" : fjmc }
        _self.props.onEditRoomOk(params)
      }
    })
  }

  render(){
  	const { getFieldDecorator } = this.props.form
    const { roomObj } = this.props
  	const formItemLayout = {
  	  labelCol: {span: 6},
      wrapperCol: {span: 14},
  	}
  	return(
  		<div>
	  	  {this.state.showModal? 
		  	  <Modal 
		        className="editRoomInfoModal" 
		        title="修改房间信息" 
		        visible={this.state.showModal}
            closable={false} 
	          footer = { <div> 
                        <Button type="primary" loading={ this.props.loading } onClick={ this.editRoomInfoOK }>确定</Button> 
                        <Button onClick={ this.editRoomInfoCancel }>取消</Button> 
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
                  {validator: this.checkRoomName}
                ],
		      	  	initialValue : roomObj.roomname,
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