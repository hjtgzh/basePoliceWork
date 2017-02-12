import React,{Component} from 'react';
import { connect } from 'react-redux'
import {Upload,Icon,Modal} from 'antd'
import{
  fetchClueUploadImage,
} from 'actions/people'

@connect(
    (state) => ({
      config: state.config,
    })
)

export default class imgView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible:false,
      previewImage:'',
      fileList:[],
      nowImg:{}
    }
    this.handlePreview = this.handlePreview.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }
  componentDidMount(){
  }
  componentWillReceiveProps(nextProps){
    if(this.props.source.toString()!=nextProps.source.toString())
      this.state.fileList = nextProps.source
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  uploadImage(value){
    const self=this
    const file = value.file
    const url=$GLOBALCONFIG.$ctx+'/jcjw/record/uploadPicture.json'
    const request=new FormData()
    request.append('picname',file.name)
    request.append('tpfile',file)
    request.append('token',sessionStorage.getItem('token'))
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(request)
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        const length = self.state.fileList.length
        for(let i=0;i<length;i++){
          if(self.state.fileList[i].status!='done')
            self.state.fileList.splice(i,1)
        }
        return console.error("xhr.status",xhr.status)
      }
      if(xhr.status==200){
        const result = JSON.parse(xhr.response).data;
        const length = self.state.fileList.length
        let arr=''
        for(let i=0;i<length;i++){
          if(self.state.fileList[i].name==self.state.nowImg.name){
            self.state.fileList[i].status='done'
            self.state.fileList[i].realName = result.realName
          }
          arr+=`${self.state.fileList[i].name}:${self.state.fileList[i].realName},`
        }
        arr.length>0?arr = arr.substr(0,arr.length-1):null
        self.props.saveImages(arr)
        self.setState({})
      }
    }
    return {abort:()=>111}
    // this.props.dispatch(fetchClueUploadImage({picname:file.name,tpfile:new FormData(file)}))
  }

  handleChange(info){
    const status = info['file']['status']
    const fileArr = info['fileList']
    this.state.nowImg=info['file']
    if(status ==='done'){
    }
    const length = fileArr.length
    let arr=''
    for(let i=0;i<length;i++){
      if(fileArr[i].realName)
        arr+=`${fileArr[i].name}:${fileArr[i].realName},`
    }
    arr.length>0?arr = arr.substr(0,arr.length-1):null
    this.props.saveImages(arr)
    this.setState({ fileList:fileArr })
  }
  render(){
    const { previewVisible, previewImage, fileList } = this.state;
    const { source } = this.props;
    // console.log(this.props.source)
    // console.log('fileList:'+this.state.fileList)
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return(
      <div className="clearfix">
        <Upload
          action={$GLOBALCONFIG.$ctx+"jcjw/building/insertPic.json"}
          listType="picture-card"
          customRequest={this.uploadImage}
          fileList={fileList} //图片的列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 7 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}