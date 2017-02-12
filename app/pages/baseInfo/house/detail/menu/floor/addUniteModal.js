import React, { Component } from 'react'
import { Row, Col, Modal, Input, Icon, message, Select, Button } from 'antd'
import './buildRoomModal.css'

const Option = Select.Option

export default class AddUniteModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal : false,
      showSelectUnite : true,
      showSelectShangpu : false,
      showSelectDXS : false,
      roomsFields : {
        type : 1, //新增类型，默认为单元
        unitName : '',
        floorNumPerUnit : 1,
        roomNumPerFloor : 1,
      },
    }
    this.onAddUniteCancel = this.onAddUniteCancel.bind(this)
    this.onAddUniteOK = this.onAddUniteOK.bind(this)
    this.changeRoomsFields = this.changeRoomsFields.bind(this)
    this.changeUniteName = this.changeUniteName.bind(this)
    this.plusFieldNum = this.plusFieldNum.bind(this)
    this.minusFieldNum = this.minusFieldNum.bind(this)
    this.getIndexFromData = this.getIndexFromData.bind(this)
    this.isSameUniteName = this.isSameUniteName.bind(this)
    this.getCurMaxUnitNum = this.getCurMaxUnitNum.bind(this)
    this.uniteTypeChange = this.uniteTypeChange.bind(this)
  }
  //组件加载完毕
  componentDidMount(){

  }
  //props更新函数
  componentWillReceiveProps(nextProps){
    if (this.state.showModal != nextProps.visiable) {
      const roomsFields = {
        type : 1,
        unitName : '',
        floorNumPerUnit : 1,
        roomNumPerFloor : 1,
      }
      this.setState({"showModal" : nextProps.visiable,"roomsFields" : roomsFields})
    }
  }
  //弹窗取消
  onAddUniteCancel(){
    this.props.onAddUniteCancle()
  }
  //弹窗确认
  onAddUniteOK(){
    const uniteType = this.state.roomsFields.type
    const floorNumPerUnit = this.state.roomsFields.floorNumPerUnit
    const roomNumPerFloor = this.state.roomsFields.roomNumPerFloor
    const roomsObjList = []
    if (uniteType === "3") {//地下室
      for(let j = 0; j < floorNumPerUnit; j++){
        for(let k = 0; k < roomNumPerFloor; k++){
          const roomObj = {}
          roomObj.dy = -1
          roomObj.dyjc = "地下室"
          roomObj.lcs = -(j + 1)
          roomObj.lcjc = -(j + 1) + "层"
          roomObj.wz = k + 1
          if (k + 1 < 10) {
            roomObj.fjmc = (j + 1) + "0" + (k + 1) + "室"
          } else {
            roomObj.fjmc = (j + 1) + "" + (k + 1) + "室"
          }
          roomsObjList.push(roomObj)
        }
      }
    }else if(uniteType === "2"){//商铺
      for(let j = 0; j < floorNumPerUnit; j++){
        for(let k = 0; k < roomNumPerFloor; k++){
          const roomObj = {}
          roomObj.dy = 0
          roomObj.dyjc = "商铺"
          roomObj.lcs = j + 1
          roomObj.lcjc = (j + 1) + "层"
          roomObj.wz = k + 1
          if (k + 1 < 10) {
            roomObj.fjmc = (j + 1) + "0" + (k + 1) + "室"
          } else {
            roomObj.fjmc = (j + 1) + "" + (k + 1) + "室"
          }
          roomsObjList.push(roomObj)
        }
      }
      
    }else{//单元
      const uniteshowname = this.state.roomsFields.unitName.trim()
      if (uniteshowname === '') {
        message.warning("请输入单元名称",3)
        return
      }
      if (this.isSameUniteName(uniteshowname)) {
        message.warning("单元名称已存在",3)
        return
      }
      const maxUniteNum = this.getCurMaxUnitNum()
      console.log(maxUniteNum)
      for(let j = 0; j < floorNumPerUnit; j++){
        for(let k = 0; k < roomNumPerFloor; k++){
          const roomObj = {}
          roomObj.dy = maxUniteNum + 1
          roomObj.dyjc = (maxUniteNum + 1) + "单元"
          roomObj.lcs = j + 1
          roomObj.lcjc = (j + 1) + "层"
          roomObj.wz = k + 1
          if (k + 1 < 10) {
            roomObj.fjmc = (j + 1) + "0" + (k + 1) + "室"
          } else {
            roomObj.fjmc = (j + 1) + "" + (k + 1) + "室"
          }
          roomsObjList.push(roomObj)
        }
      }
    }
    this.props.onAddUniteOk(roomsObjList)
  }
  //选择新增类型回调 (1：单元，2：商铺，3：地下室)
  uniteTypeChange(value){
    console.log(value)
    const roomsFields = {type :value, unitName : "", floorNumPerUnit : "1", roomNumPerFloor : "1"}
    this.setState(
      { 
        showSelectUnite : value === "1", 
        showSelectShangpu : value === "2", 
        showSelectDXS : value === "3", 
        roomsFields : roomsFields
      }
    )
  }

  getCurMaxUnitNum(){
    const { data } = this.props
    const unitNums = data.map((uniteObj) =>(
      uniteObj.dy
      )
    )
    return unitNums.length > 0? Math.max.apply(null, unitNums) : 0;
  }
  //获取商铺、地下室在当前data数组中的索引，若无，返回-1
  getIndexFromData(dataUnite){
    const { data } = this.props
    for(let i = 0; i < data.length; i++){
      if (data[i].dy == dataUnite) {
        return i
      }
    }
    return -1
  }
  //校验单元名是否重名
  isSameUniteName(uniteName){
    const { data } = this.props
    for(let i = 0; i < data.length; i++){
      if (data[i].dyjc == uniteName) {
        return true
      }
    }
    return false
  }
  //单元名称change事件
  changeUniteName(e){
    e.stopPropagation()
    e.preventDefault()
    const uniteName = e.target.value
    this.state.roomsFields.unitName = uniteName
    this.setState(this.state.roomsFields)
  }
  //建房参数change事件
  changeRoomsFields(e){
    e.stopPropagation()
    e.preventDefault()
    const minNum = e.target.min || 1
    const maxNum = e.target.max || 99
    const inputName = e.target.name
    const inputValue = parseInt(e.target.value) || 1
    var curValue = 0
    if (isNaN(inputValue)) {
        curValue = minNum
    }else if (minNum >= inputValue) {
        message.warning("系统默认最小值"+minNum)
        curValue = minNum
    }else if (inputValue >= maxNum ) {
        message.warning("系统默认最大值"+maxNum)
        curValue = maxNum
    }else{
        curValue = inputValue
    }
    this.state.roomsFields[inputName] = curValue
    this.setState(this.state.roomsFields)
   
  }
  //参数字段“+1”事件
  plusFieldNum(e){
    e.stopPropagation()
    e.preventDefault()
    const inputNode = e.currentTarget.parentNode.querySelector("input")
    const maxNum = inputNode.max || 99
    const inputName = inputNode.name
    var inputValue = parseInt(inputNode.value) || 1
    if (inputValue < maxNum) {
        inputValue++
    }else{
        message.warning("系统默认最大值"+maxNum)
    }
    this.state.roomsFields[inputName] = inputValue
    this.setState(this.state.roomsFields)
  }
  //参数字段“-1”事件
  minusFieldNum(e){
    const inputNode = e.currentTarget.parentNode.querySelector("input")
    const minNum = inputNode.min || 1
    const inputName = inputNode.name
    var inputValue = parseInt(inputNode.value)
    if (inputValue > minNum) {
      inputValue--
    }else{
       message.warning("系统默认最小值"+minNum)
    }
    this.state.roomsFields[inputName] = inputValue
    this.setState(this.state.roomsFields)
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    const hasDXS = this.getIndexFromData("-1") === -1? false : true
    const hasShangPu = this.getIndexFromData("0") === -1? false : true
    return (
      <div>
        {this.state.showModal ?
          <Modal
            className="modal-header modal-body"
            title="新增单元" 
            visible={this.state.showModal} 
            closable={false}
            footer = { <div> 
                          <Button type="primary" loading={ this.props.loading } onClick={ this.onAddUniteOK }>确定</Button> 
                          <Button onClick={ this.onAddUniteCancel }>取消</Button> 
                        </div>  
                     }
          >
              <table className="add-floor-info">
                <tbody>
                  <tr>
                    <td className="jfTitle">
                      <span>新增类型</span>
                    </td>
                    <td>
                      <Select 
                      className="uniteTypeSelect"
                      defaultValue="1" 
                      placeholder="选择单元类型"
                      onChange={this.uniteTypeChange}
                      >
                        <Option value="1" >单元</Option>
                        <Option value="2" disabled={hasShangPu}>商铺</Option>
                        <Option value="3" disabled={hasDXS}>地下室</Option>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>  
              {this.state.showSelectUnite?
                <table className="add-floor-info">
                  <tbody> 
                    <tr>
                      <td colSpan="2" className="floor-trbg">
                        <span className="left">地面户室：</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="jfTitle">单元名称</td>
                      <td>
                        <Input  className="nunber_iput" className="unitName" onChange={this.changeUniteName} value={this.state.roomsFields.unitName}/>
                      </td>
                    </tr>
                    <tr>
                      <td className="jfTitle">每单元层数</td>
                      <td>
                        <button className="jfMinus" onClick={this.minusFieldNum}><Icon type="minus"/></button>
                        <Input type="number" className="nunber_iput" min="1" max="99" name="floorNumPerUnit" onChange={this.changeRoomsFields} value={this.state.roomsFields.floorNumPerUnit}/>
                        <button className="jfPlus" onClick={this.plusFieldNum}><Icon type="plus"/></button>
                      </td>
                    </tr> 
                     <tr>
                      <td className="jfTitle">每层户室数</td>
                      <td>
                        <button className="jfMinus" onClick={this.minusFieldNum}><Icon type="minus"/></button>
                        <Input type="number" className="nunber_iput" min="1" max="99" name="roomNumPerFloor" onChange={this.changeRoomsFields} value={this.state.roomsFields.roomNumPerFloor}/>
                        <button className="jfPlus" onClick={this.plusFieldNum}><Icon type="plus"/></button>
                      </td>
                    </tr>
                  </tbody>
                </table>: null
              }
              {this.state.showSelectShangpu?
                <table className="add-floor-info">
                  <tbody> 
                    <tr>
                      <td colSpan="2" className="floor-trbg">
                        <span className="left">底部商铺</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="jfTitle">层数</td>
                      <td>
                        <button className="jfMinus" onClick={this.minusFieldNum}><Icon type="minus"/></button>
                        <Input type="number" className="nunber_iput" min="1" max="99" name="floorNumPerUnit" onChange={this.changeRoomsFields} value={this.state.roomsFields.floorNumPerUnit}/>
                        <button className="jfPlus" onClick={this.plusFieldNum}><Icon type="plus"/></button>
                      </td>
                    </tr>
                    <tr>
                      <td className="jfTitle">每层商铺数</td>
                      <td>
                        <button className="jfMinus" onClick={this.minusFieldNum}><Icon type="minus"/></button>
                        <Input type="number" className="nunber_iput" min="1" max="99" name="roomNumPerFloor" onChange={this.changeRoomsFields} value={this.state.roomsFields.roomNumPerFloor}/>
                        <button className="jfPlus" onClick={this.plusFieldNum}><Icon type="plus"/></button>
                      </td>
                    </tr>
                  </tbody>
                </table> : null
              }
              {this.state.showSelectDXS?
                <table className="add-floor-info">
                  <tbody>  
                    <tr>
                      <td colSpan="2" className="floor-trbg">
                        <span className="left">地下空间</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="jfTitle">层数</td>
                      <td>
                        <button className="jfMinus" onClick={this.minusFieldNum}><Icon type="minus"/></button>
                        <Input type="number" className="nunber_iput" min="1" max="99" name="floorNumPerUnit" onChange={this.changeRoomsFields} value={this.state.roomsFields.floorNumPerUnit}/>
                        <button className="jfPlus" onClick={this.plusFieldNum}><Icon type="plus"/></button>
                      </td>
                    </tr>
                    <tr>
                      <td className="jfTitle">每层房间数</td>
                      <td>
                        <button className="jfMinus" onClick={this.minusFieldNum}><Icon type="minus"/></button>
                        <Input type="number" className="nunber_iput" min="1" max="99" name="roomNumPerFloor" onChange={this.changeRoomsFields} value={this.state.roomsFields.roomNumPerFloor}/>
                        <button className="jfPlus" onClick={this.plusFieldNum}><Icon type="plus"/></button>
                      </td>
                    </tr>
                  </tbody>
                </table> : null
              }
          </Modal> : null
        }
      </div>  
    )
  }
}
