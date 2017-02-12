import React, { Component } from 'react'
import { Row, Col, Modal, Input, Icon, message, Form, Button} from 'antd'
const FormItem = Form.Item;


@Form.create({
  onFieldsChange(props, items) {

  },
})
export default class AddFloorModal extends Component{
  constructor(props){
		super(props)
	  this.state = {
	    showModal : false,
	  }
	  this.addFloorOK = this.addFloorOK.bind(this)
	  this.addFloorCancel = this.addFloorCancel.bind(this)
    this.checkRoomName = this.checkRoomName.bind(this)
    this.checkFloorNum = this.checkFloorNum.bind(this)
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
  //验证roomname是否重名
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
  //验证楼层是否存在
  checkFloorNum(rule, value, callback){
    if(value != ''){
      if (value < 0) {
        callback("楼层编号不能为负数。")
        return
      }
      const { uniteObj } = this.props
      uniteObj.floors.forEach(function(floorObj,index){
        if (Math.abs(value) == Math.abs(floorObj.floor)) {
          callback("该单元内已存在该楼层编号,请修改。")
          return
        }
      })
    }
    callback()
  }
  //弹窗取消
  addFloorCancel(){
    this.props.onAddFloorCancel()
  }
  //弹窗确认
  addFloorOK(){
  	const _self = this
    this.props.form.validateFields((err, values) => {
      if(!err){
        const { uniteObj } = this.props
        const fjmc = values["roomname"]
        const lcs = uniteObj.dy == "-1"? -values["floorNum"] : values["floorNum"]
        const lcjc = values["floorNum"] + "层"
        const wz = 1
        const { dy,dyjc } = uniteObj

        const params = {"wz" : wz, "lcs" : lcs, "lcjc" :lcjc, "dy" : dy, fjmc : fjmc, "dyjc" : dyjc}
        _self.props.onAddFloorOk(params)
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
  	        title="新增楼层" 
  	        visible={this.state.showModal}
            closable={false} 
            footer = { <div> 
                          <Button type="primary" loading={ this.props.loading } onClick={ this.addFloorOK }>确定</Button> 
                          <Button onClick={ this.addFloorCancel }>取消</Button> 
                        </div>  
                     }
  	      >
  	      	<Form horizontal>
              <FormItem
                {...formItemLayout}
                label="楼层编号"
                hasFeedback
               >
                {getFieldDecorator('floorNum',{
                  rules: [
                    {required : true, message: "请输入楼层编号"},
                    {validator: this.checkFloorNum},
                  ],
                })(
                  <Input type="number"  min="1" max="99" placeholder="请输入楼层号,只能为数字"/>
                )}
              </FormItem>
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
  	      	  	<Input type="text" placeholder="请输入新增楼层的房间名称"/>
  	      	  )}
  	      	  </FormItem>
  	      	</Form>
  	      </Modal> : null
        } 
  	  </div>
  	)
  }
}