import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input,Select,Button, checkbox, Table , Modal} from 'antd';
import Map from './Map';

import { fetchCheckboxListHighlyToxic } from 'actions/groupHighlyToxic'

const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup=checkbox.Group
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    checkboxListHighlyToxicResult: state.checkboxListHighlyToxicResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {

  },
})

export default class chemistry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // ifReset: true,
      showList:[],
      checkedValues:[]
    }
    this.onSearch = this.onSearch.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    // this.setCheckboxValues = this.setCheckboxValues.bind(this)
    // this.list = []
    //this.list = this.props.checkboxListHighlyToxicResult
    // this.showList = this.list
    // this.checkedKeys = []
    //
    // this.checkboxIdMapState = new Map()
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchCheckboxListHighlyToxic({},()=>{
      this.setState({
        showList:this.props.checkboxListHighlyToxicResult.list
      })
    }))
    this.setState({
      ifReset: false,
      checkedValues:this.props.checkedValue
    })
  }

  // setCheckboxValues(value) {
  //   console.log(value)
  //   this.checkedKeys = value.split(';')
  //   console.log('66', this.checkedKeys)
  //   var checkboxIdMapState = this.checkboxIdMapState
  //   if (this.checkedKeys.length != 0) {
  //     for (var i = 0; i < this.checkedKeys.length; i++) {
  //       checkboxIdMapState.put(this.checkedKeys[i], true)
  //     }
  //   }
  //   console.log(checkboxIdMapState)
  // }

  onSearch(e) {
    console.log(e.target.value)
    const filtervalue = this.props.checkboxListHighlyToxicResult.list
    let searchvalue = e.target.value
    let showList=[]
    //filter 过滤 ，code 或 name 中包含改字符即返回
    if (searchvalue) {
        showList = filtervalue.filter(item => (
        item.dicContent.indexOf(searchvalue) != -1) || (item.dicKey.indexOf(searchvalue) != -1)
      )
      this.setState({
        showList:showList
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onOk(this.state.checkedValues)
  }

  onChangeSelect(checkedValues) {
    this.setState({
      checkedValues:checkedValues
    })
  }

  footer(){
    return(
      <div>
        <Button size={'large'} onClick={this.handleSubmit}>保存</Button>
      </div>
    )
  }
  render() {
    const {
      checkedValue,
      visible,
      onCancel
    } = this.props
    // const checkboxIdMapState = this.checkboxIdMapState
    // if (this.state.ifReset) {
    //   this.setCheckboxValues(checkedValue)
    // }
    let checkOptions=[];
    if(this.state.showList.length>0){
      this.state.showList.map((item,index)=>{
        let obj={
          label:item.dicContent,
          value:item.dicContent,
        }
        checkOptions.push(obj)
      })
    }
    return (
    <Modal
        className="modal-header modal-body"
        visible={visible}
        title='许可证类型'
        onCancel={onCancel}
        footer={this.footer()}
    >
      <div className="modalcontent checklist-jxy">
        <FormItem>
          <Input placeholder="请输入搜索条件" name="keyword" onChange={this.onSearch}/>
        </FormItem>
        <div>
          <CheckboxGroup
            options={checkOptions}
            defaultValue={checkedValue}
            onChange={this.onChangeSelect}
          />
        </div>
      </div>
    </Modal>
    )
  }
}
