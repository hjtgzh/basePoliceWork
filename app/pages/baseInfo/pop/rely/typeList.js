import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import SavePowerForm from './component/savePowerForm'
import Pagination from 'components/pagination/pagination'
import {
  fetchRelyList,
  fetchDeleteDetail,
  fetchExportData,
  fetchAddRelyPower,
  fetchPeopleSituation,
} from 'actions/rely'
import './style.less'
const Option = Select.Option;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    relyListSearchResult: state.relyListSearchResult,
    deleteDetailResult: state.deleteDetailResult,
    exportDataResult: state.exportDataResult,
    addRelyPowerResult: state.addRelyPowerResult,
    peopleSituationResult: state.peopleSituationResult,
    amList: state.amList,
  })
)

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRows: '',
      deleteArr: '',
      visible: false,
      leaveReasonForm: false,
      addPower: false,
      isAddPower: false,
      deleteReason: '自愿离职',
      deleteSuccess: false,
      exportData: false,
      saveSuccess: false,
      defaultChecked: false,
      pleaseChooseOne: false,
      selectedRowKeys: [],
      currentPage: 1,
    }
  }
  // 组件已经加载到dom中
  componentDidMount() {//debugger
    this.props.dispatch(fetchRelyList({ currentPage: 1 ,pageSize: 10}))
  }
  // 表格展示项的配置
  columns() {
    return [
      {
        title: '全选',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
        width:'5%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: function(text,record){
          return (
            <p>
              <span className="left">{text}</span>
              <Link className="right" to={`/pop$/relyDetail/${record.id}`}>详情</Link>
            </p>
          )
        }
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: '6%',
      },
      {
        title: '身份证（证件）号码',
        dataIndex: 'IDcard',
        key: 'IDcard',
        width: '17%',
      },
      {
        title: '政治面貌',
        dataIndex: 'politic',
        key: 'politic',
        width: '6%',
      },
      {
        title: '关注类别',
        dataIndex: 'attentionClass',
        key: 'attentionClass',
        width: '12%',
      },
      {
        title: '电话号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: '12%',
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwid',
        key: 'gxdwid',
        width: '12%',
      },
      {
        title: '依靠类别',
        dataIndex: 'type',
        key: 'type',
        width: '17%',
      },

    ]
  }

  //新增力量
  addPowerModal() {
    this.setState({
      addPower: true,
    });
    // console.log(this.props.peopleSituationResult)
  }
  addPowerSuccess() {
    this.setState({
      addPower: false,
    });
  }
  importDetail(){
    this.setState({
      addPower: false,
    });
  }
  //取消新增
  cancleAdd (){
    this.setState({
      addPower: false,
    });
  }

  //批量删除的调用
  deleteModal() {
    this.setState({
      visible: true,
    });
  }
  //取消删除
  cancelDelete() {
    // console.log(e);
    this.setState({
      visible: false,
      leaveReasonForm: false
    });
  }


  //导出数据
  exportData() {
    var token = sessionStorage.getItem('token')
    window.open(`${this.props.config.$ctx}/jcjw/ykll/outputExcel?token=${token}&&type=${1}`)
  }
  //取消导出数据
  cancelExportData() {
    this.setState({
      exportData: false
    });
  }

  deleteTitle(){
    return(
      <p className="leaveFormTitle">
        <span>离职原因</span><Button onClick={this.hasDelete.bind(this)} type="primary" className="leaveFormBt">删除</Button>
      </p>
    )
  }
  //保存新增并发起请求
  saveRelyPower(){
    this.props.dispatch(fetchAddRelyPower())
    this.setState({
      addPower: false,
      saveSuccess: true,
    });
  }
  addPowerTitle(){
    return(
      <p className="addPowerTitle">依靠力量</p>
    )
  }

  //用状态改变选取的项
  select (selectedRows){
    let arr=[];
    for(let item in selectedRows){
      // arr.push(item.id)
      arr.push(selectedRows[item].id)
    }
    // console.log(arr)
    this.setState({
      deleteArr: arr.join(','),
    })
    // console.log(this.state.deleteArr)
  }
  //是否选中将要删除的条目
  deleteOk() {
    console.log('Clicked OK');
    // console.log(this.state.deleteArr);
    if(this.state.deleteArr == ""){
      this.setState({
        visible: false,
        leaveReasonForm: false,
        pleaseChooseOne: true,
      });
    }
    else{
      this.setState({
        visible: false,
        pleaseChooseOne: false,
        leaveReasonForm: true,
      });
    }
  }
  //离职原因改变
  reasonChange(e){
    this.setState({
      deleteReason: e,
    });
  }
  //获取选中 并赋值给 selectedRowKeys
  selectChange (selectedRowKeys,selectedRows){
    this.setState({selectedRowKeys: selectedRowKeys})
    this.select(selectedRows)
    // console.log(selectedRowKeys)
    // console.log(selectedRows)
  }

  //确认删除后的调用
  hasDelete() {
    this.setState({
      leaveReasonForm: false,
      deleteSuccess: true,
      defaultChecked: false,
      selectedRowKeys: [],
      deleteArr: '',
    });
    // console.dir(this.state.deleteReason)
    // console.log(this.state.deleteArr)
    //删除选取的子项
    this.props.dispatch(fetchDeleteDetail({idList: this.state.deleteArr,lzyy: 1}))
  }
  //成功删除并刷新页面
  deleteSuccessOk(){
    this.setState({
      deleteSuccess: false,
      rowSelection: true,
    });
    // this.relyListReload()
    this.props.dispatch(fetchRelyList({ currentPage: 1 ,pageSize: 10}))
  }
  deleteSuccessFooter() {
    return(<Button type="primary" onClick={this.deleteSuccessOk.bind(this)}>确定</Button>)
  }
  //确定导出数据
  exportDataOk(){
    this.setState({
      exportData: false,
    });
    window.open(`http://10.118.164.198:8080/jcjw/ykll/outputExcel?type=${1}`)
    this.props.dispatch(fetchExportData({type: 1}))
  }
  exportDataFooter() {
    return(<Button type="primary" onClick={this.exportDataOk.bind(this)}>确定</Button>)
  }
  //保存成功
  saveSuccessOk() {
    this.setState({
      saveSuccess: false,
    });
  }
  saveSuccessFooter() {
    return(<Button type="primary" onClick={this.saveSuccessOk.bind(this)}>确定</Button>)
  }
  chooseOneOk() {
    this.setState({
      pleaseChooseOne: false,
    });
  }
  chooseOneFooter() {
    return(<Button type="primary" onClick={this.chooseOneOk.bind(this)}>确定</Button>)
  }
  deleteFooter() {
    return(<Button type="primary" onClick={this.hasDelete.bind(this)}>确定</Button>)
  }
  //删除后页面重新加载
  relyListReload (){
    this.setState({
      rowSelection: true,
    })
    this.props.dispatch(fetchRelyList({ currentPage: 1 ,pageSize: 10}))
  }
  pageSizeChange(e,pageSize){
    // console.log(e)
    // console.log(pageSize)
    this.setState({
      currentPage: 1,
      pageSize: pageSize,
    })
    this.props.dispatch(fetchRelyList({ currentPage: 1 ,pageSize: pageSize}))
  }
  showTotal(total) {
    console.log(total)
    return `共 ${total} 条`
  }
  pageChange(currentPage) {
    console.log(currentPage);
    // pageChange(currentPage);
    this.setState({
      currentPage: currentPage
    })
    this.props.dispatch(fetchRelyList({ currentPage: currentPage ,pageSize: 10}))
  }
  render() {
    const _self = this
    const {selectedRowKeys} = this.state
    const {
      relyListSearchResult,
      peopleSituationResult
      } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.selectChange.bind(this),
      //代码不能整合成下面的方式
      /*onChange (selectedRowKeys,selectedRows){
       this.setState({selectedRowKeys: selectedRowKeys})
       this.select(selectedRows)
       }*/
    }
    const relyList = []
    relyListSearchResult.list.map((item) => {
      relyList.push({
        id: item.id,
        name: item.xm,
        sex: item.xb ==1 ? '女' : '男',
        IDcard: item.sfzh,
        politic: item.zzmm,
        attentionClass: item.attentionClass,
        phoneNumber: item.phoneNumber,
        gxdwid: item.gxdwid,
        type: item.type,
      })
    })
    return (
      <div className="detail-content hjt-relyPower">
        <Table
          columns={this.columns()}
          dataSource={relyList}
          pagination={false}
          loading={relyListSearchResult.loading}
          scroll={{y: true}}
          rowSelection={rowSelection}
          // select={this.select}
          relyListReload={this.relyListReload}
        />

        <div className="ability-button">
          {/*新增依靠力量-弹窗*/}
          <Button className="addPowerBt"  onClick={this.addPowerModal.bind(this)}>新增依靠力量</Button>
          <div className="modalcontent">
            <Modal visible={this.state.addPower} footer=""
                   onCancel={this.cancleAdd.bind(this)} title={this.addPowerTitle()}
                   className="modal-header modal-body hjt-formModal"
            >
              {/*<SavePowerForm userData={this.props.peopleSituationResult.SYBW}  typeData={this.props.peopleSituationResult.TYPE}></SavePowerForm>*/}
              <SavePowerForm importDetail={this.importDetail.bind(this)} addPowerSuccess={this.addPowerSuccess.bind(this)}></SavePowerForm>
            </Modal>
          </div>
          {/*保存成功-弹窗*/}
          <Modal visible={this.state.saveSuccess} title="消息"
                 onOk={this.saveSuccessOk.bind(this)} footer={this.saveSuccessFooter()}
                 className="ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">保存成功</p>
          </Modal>
          {/*请选择要删除的子项-弹窗*/}
          <Modal visible={this.state.pleaseChooseOne} title="消息"
                 onOk={this.chooseOneOk.bind(this)} footer={this.chooseOneFooter()}
                 className="ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">请选择要删除的子项</p>
          </Modal>
          {/*导出数据-弹窗*/}
          <Button className="exportData" onClick={this.exportData.bind(this)}>导出数据</Button>
          {/*<Modal visible={this.state.exportData} title="消息"
                 className="hjt-ifSure" footer={this.exportDataFooter()} onCancel={this.cancelExportData.bind(this)}
          >
            <p className="isDelete">数据量大于2000，请先精确删选条件</p>
          </Modal>*/}
          {/*批量删除-弹窗*/}
          <Button className="deleteBt" onClick={this.deleteModal.bind(this)}>批量删除</Button>
          <Modal visible={this.state.visible} title="提示"
                 onOk={this.deleteOk.bind(this)} onCancel={this.cancelDelete.bind(this)}
                 className="hjt-ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">是否删除</p>
          </Modal>
          {/*批量删除内部表单-弹窗*/}
          <Modal visible={this.state.leaveReasonForm} footer=""
                 onCancel={this.cancelDelete.bind(this)} title='离职原因'
                 className="hjt-isSure modal-header modal-body modal-small"
                 footer={this.deleteFooter()}
          >
            <Select size="large" defaultValue="自愿离职" onChange={this.reasonChange.bind(this)} className="reasonSelect">
              <Option value="自愿离职">自愿离职</Option>
              <Option value="清退">清退</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Modal>
          {/*删除成功-弹窗*/}
          <Modal visible={this.state.deleteSuccess} title="消息"
                 onOk={this.deleteSuccessOk.bind(this)} footer={this.deleteSuccessFooter()}
                 className="hjt-ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">删除成功</p>
          </Modal>

          <Pagination
            // total={relyListSearchResult.list ? relyListSearchResult.list.length : 5}
            showSizeChanger //是否可以改变pageSize
            onShowSizeChange={this.pageSizeChange.bind(this)}
            onChange={this.pageChange.bind(this)}
            totalCount={relyListSearchResult.totalCount || 0}
            currentPage={this.state.currentPage || 1}
            pageSize={this.state.pageSize || 10}
          />
        </div>

      </div>
    )
  }
}
