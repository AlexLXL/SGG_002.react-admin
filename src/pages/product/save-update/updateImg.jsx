import { Upload, Icon, Modal, message } from 'antd';
import React,{Component} from 'react';
import PropsTypes from 'prop-types'
import {reqRemovePic} from '../../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  static propTypes = {
    imgList: PropsTypes.array.isRequired,
    id: PropsTypes.string.isRequired
  };

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.imgList.map((item, index) => {
      return {
        uid: index,
        name: item,
        url: `http://localhost:5000/upload/` + item
      }
    })
  };

  /**
   * 取消预览
   */
  handleCancel = () => this.setState({ previewVisible: false });

  /**
   * 预览
   * @param file
   * @returns {Promise<void>}
   */
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.thumbUrl,  // 修补bug
      previewVisible: true,
    });
  };

  /**
   * 对图片进行增加删除操作
   * @param file
   * @param fileList
   */
  handleChange = async ({ file, fileList }) => {  // 加入第一个参数file

    if (file.status === 'uploading') {
      // 加载中
    }else if (file.status === 'done') {
      // 加载完成
      message.success('上传成功', 2)
    }else if (file.status === 'error') {
      // 加载失败
      message.error('上传失败', 2)
    }else {
      // 删除图片
      const name = (file.response && file.response.data.name) || file.name; // 修补bug
      const id = this.props.id;
      const result = await reqRemovePic(name, id);   // 修补bug
      if (result) {
        message.success('删除成功', 2);
      }else {
        message.error('删除失败', 2)
      }
    }

    return this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    /**
     * 上传按钮
     */
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          /* 上传图片地址 */
          action="/manage/img/upload"
          listType="picture-card"
          /* 展示图片文件 */
          fileList={fileList}
          /* 点击预览的回调 */
          onPreview={this.handlePreview}
          /* 点击删除或者上传的回调 */
          onChange={this.handleChange}
          name="image"
          data={{
            id:this.props.id
          }}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

