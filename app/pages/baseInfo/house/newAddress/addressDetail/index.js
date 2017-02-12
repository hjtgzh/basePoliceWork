import React, { Component } from 'react'
import { Button, Form, Input,Icon, Select, Row,Modal, Col,Popover ,message,AutoComplete} from 'antd'
//发送数据请求
import {
  fetchAddressResult,
  fetchPublicResult,
  fetchPoliceResult,
  fetchAreaResult,
  fetchCountryResult,
  fetchStreetResult,
  fetchRoadResult,
  fetchHouseMarkResult,
  fetchHouseMarkNameResult,
  fetchAddressSubmitResult
} from 'actions/house'
import ButtonLayout from './component/buttonLayout'
import InputModal from './component/inputModalClose'
import { connect } from 'react-redux'
import './style.less'
const Option = Select.Option
const createForm = Form.create
const FormItem = Form.Item
const InputGroup = Input.Group;

let searchData = {}
let isSearchAddr = true
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
       searchAddressResult: state.searchAddressResult,
       publicStationResult: state.publicStationResult,
       policeStationResult: state.policeStationResult,
       AreaResult: state.AreaResult,
       countryResult: state.countryResult,
       streetResult: state.streetResult,
       roadResult: state.roadResult,
       houseMarkResult: state.houseMarkResult,
       houseMarkNameResult: state.houseMarkNameResult,
       addressSubmitResult: state.addressSubmitResult,
    })
)

@Form.create({
  onFieldsChange(props, items) {
    // console.log(props)
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addressClass:'1',
      addressName:'',
      poblicStation:'',
      publicStationGrade:'',
      policeStation:'',
      areaStation:'',
      areaStationGrade:'',
      countryStation:'',
      countryStationGrade:'',
      villageStation:'',
      villageStationGrade:'',
      roadStation:'',
      houseMarkStation:'',
      houseMarkStationGrade:'',
      houseMarkNameStation:'',
      addressFullName:'宿迁市',
      group:'',
      roadNumberB:'',
      roadNumberE:'',
      houseNumber:'',
      houseClass:'幢',
      isShowAddressResult:false,
      showSupplement:false,
      overVisible:{//联动弹窗
        unit:false,
        police:false,
        division:false,
        country:false,
        village:false,
        road:false, 
        houseMark:false, 
        houseMarkName:false, 
      }
    }
    this.handleReset = this.handleReset.bind(this)
    this.userExists = this.userExists.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.poblicClick = this.poblicClick.bind(this)
    this.policeClick = this.policeClick.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }
  componentWillReceiveProps(nextProps){
    // console.log(this.props.isSubmit+'===this.props.isSubmit')
    // console.log(nextProps.isSubmit+'===nextProps.isSubmit')
    // console.log(nextProps.isSubmit==true)
    // console.log(this.props.ifSubmit+'===this.props.ifSubmit')
    // console.log(nextProps.ifSubmit+'===nextProps.ifSubmit')
    // console.log(this.props.ifSubmit!==nextProps.ifSubmit)
    if(nextProps.isSubmit && this.props.ifSubmit!==nextProps.ifSubmit){
      this.handleSubmit()
    }
  }
  componentDidMount() {
  }
  //控制单个信息弹窗的显隐
  handleVisibleChange(name,visible){
    const overVisible = this.state.overVisible
    switch(name){
      case 'unit':
        this.props.dispatch(fetchPublicResult({ parentdm: '' }))
        overVisible['unit']=visible
        break
      case 'police':
        if(this.state.publicStationGrade == ''){
          message.warning('请选择分局')
          overVisible['police']=false
        }
        else{
          overVisible['police']=visible
        }
        break
      case 'division':
        this.props.dispatch(fetchAreaResult({ parentdm: '' }))
        overVisible['division']=visible
        break
      case 'country':
        if(this.state.areaStationGrade == ''){
          message.warning('请选择行政区划')
          overVisible['country']=false
        }
        else{
          overVisible['country']=visible
        }
        break
      case 'village':
        if(this.state.countryStationGrade == ''){
          message.warning('请选择街道、镇')
          overVisible['village']=false
        }
        else{
          overVisible['village']=visible
        }
        break
      case 'road':
        let streetArr = this.props.streetResult
        for(let item in streetArr){
          if(streetArr[item].xzqhqc == this.state.villageStation){
            const _self = this
            this.props.dispatch(fetchRoadResult({ cjwhId: streetArr[item].id,sblx: 1},function(res){
              if(res){
                if(res.data.list.length == 0){
                  message.warning('不存在道路')
                  overVisible['road']=false
                }
                else if(_self.state.villageStationGrade == ''){
                  message.warning('请选择社区、居委会')
                  overVisible['road']=false
                }
                else{
                  overVisible['road']=visible
                }
                _self.setState({overVisible:overVisible})
              }
            }))
          }
        }
        if(this.state.villageStationGrade == ''){
          message.warning('请选择社区、居委会')
          overVisible['road']=false
        }
        else{
          overVisible['road']=visible
        }
        break
      case 'houseMark':
        let commonStreetArr = this.props.streetResult
        for(let item in commonStreetArr){
          if(commonStreetArr[item].xzqhqc == this.state.villageStation){
            const self = this
            this.props.dispatch(fetchHouseMarkResult({ cjwhId: commonStreetArr[item].id,sblx: 2 },function(res){
              if(res){
                if(res.data.list.length == 0){
                  message.warning('不存在小区、自然村')
                  overVisible['houseMark']=false
                }
                else if(self.state.villageStationGrade == ''){
                  message.warning('请选择社区、居委会')
                  overVisible['houseMark']=false
                }
                else{
                  overVisible['houseMark']=visible
                }
                self.setState({overVisible:overVisible})
              }
            }))
          }
        }
        if(this.state.villageStationGrade == ''){
          message.warning('请选择社区、居委会')
          overVisible['houseMark']=false
        }
        else{
          overVisible['houseMark']=visible
        }
        break
      case 'houseMarkName':
        let houseMarkArr = this.props.houseMarkResult
        for(let item in houseMarkArr.list){
          if(houseMarkArr.list[item].mc == this.state.houseMarkStation){
            const that=this
            this.props.dispatch(fetchHouseMarkNameResult({ xqId: houseMarkArr.list[item].id },function(res){
              if(res){
                if(res.data.list.length == 0){
                  message.warning('不存在补充小区、自然村')
                  overVisible['houseMarkName']=false
                }
                else if(that.state.houseMarkStationGrade == ''){
                  message.warning('请选择小区、自然村')
                  overVisible['houseMarkName']=false
                }
                else{
                  overVisible['houseMarkName']=visible
                }
                that.setState({overVisible:overVisible})
              }
            }))
          }
        }
        if(this.state.houseMarkStationGrade == ''){
          message.warning('请选择小区、自然村')
          overVisible['houseMarkName']=false
        }
        else{
          overVisible['houseMarkName']=visible
        }
        break    
    }
    this.setState({overVisible:overVisible})
  }
  handleReset(e) {
    e.preventDefault();
    document.querySelector(".ant-tabs-tab-active .anticon-close").click()
  }

  handleSubmit(e) {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      // console.log(values);
      let formData = values;
      const submitData={
              fjdm:this.state.publicStationGrade || '',
              pcsdm:this.state.policeStationGrade || '',
              qxdm:this.state.areaStationGrade || '',
              xzjddm:this.state.countryStationGrade || '',
              cjwhdm:this.state.villageStationGrade || '',
              jlxdm:this.state.roadStationGrade || '',
              xqbzwdm:this.state.houseMarkStationGrade || '',
              xqbzwbcdm:this.state.houseMarkNameStationGrade || '',
              czmc:this.state.group || '',
              mph:this.state.roadNumberE ? (this.state.roadNumberB + '+' + this.state.roadNumberE + '号') : (this.state.roadNumberB + '号'),
              sf:'江苏省',
              cs:'宿迁市',
              lz:this.state.houseNumber || '',
              bzdz:this.state.addressFullName || '',
              jd:'',
              wd:'',
              bcdz:this.state.additionAddress || '',
              dzlx:this.state.addressClass || '',
            }
      this.props.getFormData(submitData)
    });
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  handleSelectChange(value) {
    // console.log(value)
    if(value == 2){
      this.setState({
        showSupplement: true,
        addressClass: '0',
      })
    }
    else if(value == 1){
      this.setState({
        showSupplement: false,
        addressClass: '1',
      })
    }
    else if(value ==3){
      this.setState({
        showSupplement: false,
        addressClass: '3',
      })
    }
    else{
      this.setState({
        houseClass:value,
        addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation
          +(this.state.houseNumber ? this.state.houseNumber+value : '')
      })
    }
  }

  handleNumberChange(name,e){
    // console.log(name)
    switch(name){
      case 'group':
        // console.log(e.target.value)
        this.setState({
          group:e.target.value,
          addressFullName:'',
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(e.target.value ? e.target.value+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        break
      case 'roadNumberB':
        // console.log(e.target.value)
        this.setState({
          roadNumberB:e.target.value,
          addressFullName:'',
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(e.target.value ? e.target.value+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        break
      case 'roadNumberE':
        // console.log(e.target.value)
        this.setState({
          roadNumberE:e.target.value,
          addressFullName:'',
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(e.target.value ? '-'+e.target.value+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        break
      case 'houseNumber':
        // console.log(this.state.houseClass)
        this.setState({
          houseNumber:e.target.value,
          addressFullName:'',
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(e.target.value ? e.target.value+this.state.houseClass : '')
        })
        break
      case 'additionAddress':
        this.setState({
          additionAddress:e.target.value,
        })
        break
    }
  }
  //弹窗内部 分局 点击后的回调事件
  poblicClick(value,grade){
    // debugger
    const overVisible = this.state.overVisible
    let name=""
    for (let n in overVisible){
      if(overVisible[n]==true){//确定当前弹出的页面
        name=n
        break
      }
    }
    // console.log(overVisible)
    // console.log(name+":"+value+"grade:"+grade)
    // const 
    switch(name){
      case 'unit':
        this.props.dispatch(fetchPoliceResult({ parentdm: grade }))
        this.setState({
          poblicStation:value,
          publicStationGrade:grade,
          policeStation:'请选择派出所'
        })
        overVisible['unit']=false
        overVisible['police']=true
        break
      case 'police':
        this.setState({
          policeStation:value,
          policeStationGrade:grade,
        })
        overVisible['police']=false
        break
      case 'division':
        this.props.dispatch(fetchCountryResult({ parentdm: grade }))
        this.setState({
          areaStation:value,
          areaStationGrade:grade,
          addressFullName:'',
          addressFullName:'宿迁市'+value
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        overVisible['division']=false
        overVisible['country']=true
        break
      case 'country':
        this.props.dispatch(fetchStreetResult({ parentdm: grade }))
        this.setState({
          countryStation:value,
          countryStationGrade:grade,
          addressFullName:'宿迁市'+this.state.areaStation
          +value
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        overVisible['country']=false
        overVisible['village']=true
        break
      case 'village':
        this.setState({
          roadStation:'',
          houseMarkStation:'',
          villageStation:value,
          villageStationGrade:grade,
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation
          +value
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        overVisible['village']=false
        break
      case 'road':
        this.setState({
          roadStation:value,
          roadStationGrade:grade,
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(this.state.group ? this.state.group+'组' : '')+value
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        overVisible['road']=false
        break
      case 'houseMark':
        this.setState({
          houseMarkStation:value,
          houseMarkStationGrade:grade,
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +value+this.state.houseMarkNameStation
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        overVisible['houseMark']=false
        break
      case 'houseMarkName':
        this.setState({
          houseMarkNameStation:value,
          houseMarkNameStationGrade:grade,
          addressFullName:'宿迁市'+this.state.areaStation
          +this.state.countryStation+this.state.villageStation
          +(this.state.group ? this.state.group+'组' : '')+this.state.roadStation
          +(this.state.roadNumberB ? this.state.roadNumberB+'号'+(this.state.roadNumberE ? '-'+this.state.roadNumberE+'号' : '') : '')
          +this.state.houseMarkStation+value
          +(this.state.houseNumber ? this.state.houseNumber+this.state.houseClass : '')
        })
        overVisible['houseMarkName']=false
        break
    }
    this.setState({overVisible:overVisible})
  }
  //派出所 窗口控制
  policeClick(value,grade){
    this.setState({policeStation:value})
    const overVisible = this.state.overVisible
    let name=""
    for (let n in overVisible){
      if(overVisible[n]==true){//确定当前弹出的页面
        name=n
        break
      }
    } 
    switch(name){
      case 'police':
        overVisible['police']=false
        break
    }
    this.setState({overVisible:overVisible})
  }


  //地址下拉信息的选中
  onSelect(value){
    for(let item in searchData){
      if(searchData[item].bzdz==value){
        // console.log(searchData[item])
        this.setState({
          poblicStation:searchData[item].fjmc,
          policeStation:searchData[item].pcsmc,
          areaStation:searchData[item].qxmc,
          countryStation:searchData[item].xzjdmc,
          villageStation:searchData[item].cjwhmc,
          group:searchData[item].czmc.split('组')[0],
          roadNumberB:searchData[item].mph.split('号')[0].split('-')[0] || searchData[item].mph.split('号')[0],
          roadNumberE:searchData[item].mph.split('-')[1] ? searchData[item].mph.split('-')[1].split('号')[0] : '',
          roadStation:searchData[item].jlxmc,
          houseMarkStation:searchData[item].xqbzwmc,
          houseMarkNameStation:searchData[item].xqbzwbcmc,
        })
      }
    }
    isSearchAddr=false
  }
  inputChange(val){
    const inputThis=this
    isSearchAddr ? this.props.dispatch(fetchAddressResult({ standArdAddress: val },function(res){
      if(res){
        const inputArr = []
        for( let item in res.data){
          inputArr.push(res.data[item].bzdz)
        }
        //数组去重
        // console.log(Array.from(new Set(inputArr)))
        searchData = res.data
        inputThis.setState({
          dataSource:Array.from(new Set(inputArr))
        })
      }
    })) : null
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const {
      ifSubmit,
      isSubmit,
      getFormData, 
      searchAddressResult,
      publicStationResult,
      policeStationResult,
      AreaResult,
      countryResult,
      streetResult,
      roadResult,
      houseMarkResult, 
      houseMarkNameResult
    } = this.props
    //获取 分局 列表
    const publicStationList = []
    if(publicStationResult){
      for(let item in publicStationResult){
        if(item == 'loading') break
        publicStationList.push({
          grade: publicStationResult[item].gxdwdm, 
          content: publicStationResult[item].gxdwqc,
          key: publicStationResult[item].gxdwqc,
        })
      }   
    }
    //获取 派出所（管辖单位）列表
    const policeStationList = []
    if(policeStationResult){
      for(let item in policeStationResult){
        if(item == 'loading') break
        policeStationList.push({
          grade: policeStationResult[item].gxdwdm, 
          content: policeStationResult[item].gxdwqc,
          key: policeStationResult[item].gxdwqc,
        })
      }   
    }
    const searchAddressArr = []
    if(searchAddressResult){ 
      for(let item in searchAddressResult){
        searchAddressArr.push({
          bzdz: searchAddressResult[item].bzdz
        })
      }   
    }
    //获取 行政区划 列表
    const areaList = []
    if(AreaResult){
      for(let item in AreaResult){
        if(item == 'loading') break
        areaList.push({
          grade: AreaResult[item].xzqhdm, 
          content: AreaResult[item].xzqhqc,
          key: AreaResult[item].xzqhqc,
        })
      }   
    }
    //获取 区县 列表
    const countryList = []
    if(countryResult){
      for(let item in countryResult){
        if(item == 'loading') break
        countryList.push({
          grade: countryResult[item].xzqhdm, 
          content: countryResult[item].xzqhqc,
          key: countryResult[item].xzqhqc,
        })
      }   
    }
    //获取 街道 列表
    const streetList = []
    if(streetResult){
      for(let item in streetResult){
        if(item == 'loading') break
        streetList.push({
          id: streetResult[item].id,
          grade: streetResult[item].xzqhdm,
          content: streetResult[item].xzqhqc,
          key: streetResult[item].xzqhqc,
        })
      }   
    }
    //获取 道路 列表
    const roadList = []
    if(roadResult){
      for(let item in roadResult.list){
        if(item == 'loading') break
        roadList.push({
          grade: roadResult.list[item].id,
          content: roadResult.list[item].mc,
          key: roadResult.list[item].mc,
        })
      }   
    }
    //获取 小区、自然村 列表
    const houseMarkList = []
    if(houseMarkResult){
      for(let item in houseMarkResult.list){
        if(item == 'loading') break
        houseMarkList.push({
          grade: houseMarkResult.list[item].id,
          content: houseMarkResult.list[item].mc,
          key: houseMarkResult.list[item].mc,
        })
      }   
    }
    //获取 补充小区、自然村 列表
    const houseMarkNameList = []
    if(houseMarkNameResult){
      for(let item in houseMarkNameResult.list){
        if(item == 'loading') break
        houseMarkNameList.push({
          grade: houseMarkNameResult.list[item].id,
          content: houseMarkNameResult.list[item].mc,
          key: houseMarkNameResult.list[item].mc,
        })
      }   
    }
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    }
    const selectAfter =(
      <Select defaultValue="幢" style={{width:60}} onChange={this.handleSelectChange}>
        <Option value="幢">幢</Option>
        <Option value="号">号</Option>
        <Option value="户">户</Option>
        <Option value="栋">栋</Option>
        <Option value="号楼">号楼</Option>
      </Select>
    )
    return (
      <div className="nav-second-nextContent" style={{marginTop:"10px"}}>
        <Form horizontal className="div-flex-scroll">
          <FormItem {...formItemLayout} label="快捷输入" className="specialFormItem"> 
            <AutoComplete
              dataSource={this.state.dataSource}
              onSelect={this.onSelect.bind(this)}
              onChange={this.inputChange.bind(this)}
              placeholder='智能查询地址'
            />
          </FormItem>
          <FormItem {...formItemLayout} label="地址属性">
            <Select
              id="select" 
              size="large" 
              defaultValue="1"
              onChange={this.handleSelectChange}
            >
              <Option value="1">标准地址</Option>
              <Option value="2">非标准地址</Option>
              <Option value="3">虚拟地址</Option>
            </Select>
          </FormItem>

          <FormItem  {...formItemLayout} label="管辖单位">
            <Row gutter={16}>
              <Col span="12">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={publicStationList} onClick={this.poblicClick} loading={false}/>} 
                    visible={this.state.overVisible['unit']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'unit')}
                    trigger="click" placement="bottom">
                    {getFieldDecorator('poblic',{
                      initialValue:this.state.poblicStation,
                      // valuePropName:this.state.poblicStationGrade
                    })
                      (<Input placeholder='请选择分局' readOnly/>)
                    }   
                  </Popover>
                </FormItem> 
                
              </Col>
              <Col span="12">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={policeStationList} onClick={this.poblicClick} loading={policeStationResult.loading}/>} 
                    visible={this.state.overVisible['police']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'police')}
                    trigger="click" 
                    placement="bottom">
                    {getFieldDecorator('police',{initialValue:this.state.policeStation})
                      (<Input placeholder='请选择派出所' readOnly/>)
                    }
                  </Popover>
                </FormItem> 
                
              </Col>
            </Row>
          </FormItem>

          <FormItem  {...formItemLayout} label="行政区划">
            <Row gutter={16}>
              <Col span="4">
                <Input defaultValue="江苏省" readOnly disabled />
              </Col>
              <Col span="4">
                <Input defaultValue="宿迁市" readOnly disabled />
              </Col>
              <Col span="4">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={areaList} onClick={this.poblicClick} loading={false}/>} 
                    visible={this.state.overVisible['division']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'division')}
                    trigger="click" placement="bottom">
                    {getFieldDecorator('area',{initialValue:this.state.areaStation})
                      (<Input placeholder='请选择行政区划' readOnly/>)
                    }
                  </Popover>
                </FormItem>  
              </Col>
              <Col span="6">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={countryList} onClick={this.poblicClick} loading={countryResult.loading}/>}
                    visible={this.state.overVisible['country']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'country')} 
                    trigger="click" 
                    placement="bottom">
                    {getFieldDecorator('country',{initialValue:this.state.countryStation})
                      (<Input placeholder='请选择街道、镇' readOnly/>)
                    }
                  </Popover>
                </FormItem>  
              </Col>
              <Col span="6">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={streetList} onClick={this.poblicClick} loading={streetResult.loading}/>}
                    visible={this.state.overVisible['village']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'village')} 
                    trigger="click" 
                    placement="bottom">
                    {getFieldDecorator('village',{initialValue:this.state.villageStation})
                      (<Input placeholder='请选择社区、居委会' readOnly/>)
                    }
                  </Popover>
                </FormItem>   
              </Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="村组信息">
            {getFieldDecorator('group',{initialValue:this.state.group})
              (<Input addonAfter="组" onChange={this.handleNumberChange.bind(this,'group')} placeholder="地名办命名的道、路、街、巷" />)
            }
          </FormItem>

          <FormItem {...formItemLayout} label="道路地址"
            hasFeedback>
            <Row gutter={16}>
              <Col span="12">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={roadList} onClick={this.poblicClick} loading={roadResult.loading}/>}
                    visible={this.state.overVisible['road']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'road')}  
                    trigger="click" 
                    placement="bottom">
                    {getFieldDecorator('road',{initialValue:this.state.roadStation})
                      (<Input placeholder='默认道路' readOnly/>)
                    }
                  </Popover>
                </FormItem>  
              </Col>
              <Col span="6">
                <FormItem>
                  {getFieldDecorator('roadNumberB',{initialValue:this.state.roadNumberB})
                    (<Input addonAfter="号" placeholder="请输入道路号" onChange={this.handleNumberChange.bind(this,'roadNumberB')} />)
                  }
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  {getFieldDecorator('roadNumberE',{initialValue:this.state.roadNumberE})
                    (<Input addonBefore="-" addonAfter="号" placeholder="请输入道路号" onChange={this.handleNumberChange.bind(this,'roadNumberE')}/>)
                  }
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="区域地址"
            hasFeedback>
            <Row gutter={16}>
              <Col span="8">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={houseMarkList} onClick={this.poblicClick} loading={houseMarkResult.loading}/>} 
                    visible={this.state.overVisible['houseMark']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'houseMark')}
                    trigger="click" 
                    placement="bottom">
                    {getFieldDecorator('houseMark',{initialValue:this.state.houseMarkStation})
                      (<Input placeholder='小区、自然村' readOnly/>)
                    }
                  </Popover>
                </FormItem>    
              </Col>
              <Col span="8">
                <FormItem>
                  <Popover 
                    content={<ButtonLayout arrs={houseMarkNameList} onClick={this.poblicClick} loading={houseMarkNameResult.loading}/>} 
                    visible={this.state.overVisible['houseMarkName']} 
                    onVisibleChange={this.handleVisibleChange.bind(this,'houseMarkName')}
                    trigger="click" 
                    placement="bottom">
                    {getFieldDecorator('houseMarkName',{initialValue:this.state.houseMarkNameStation})
                      (<Input placeholder='补充小区、自然村' readOnly/>)
                    }
                  </Popover>
                </FormItem> 
              </Col>
              <Col span="8">
                <FormItem>
                  {getFieldDecorator('houseNumber',{initialValue:this.state.houseNumber})
                    (<Input placeholder="请输入楼栋号" addonAfter={selectAfter} onChange={this.handleNumberChange.bind(this,'houseNumber')} />)
                  }
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          {this.state.showSupplement ? <FormItem
            {...formItemLayout}
            label="补充地址">
            <Input placeholder="随便写" id="textarea" onChange={this.handleNumberChange.bind(this,'additionAddress')} />
          </FormItem> : null} 
          
          <FormItem
            {...formItemLayout}
            label="地址全称">
            <Input value={this.state.addressFullName} id="textarea" readOnly />
          </FormItem>
        </Form>
      </div>
    )
  }
}
