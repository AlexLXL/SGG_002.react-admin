import React,{Component} from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';

import { reqCategory, reqAddCategory } from '../../api'
import MyButton from '../../components/my-button'
import './index.less'
import AddCategoryForm from './add-category-form'

export default class Category extends Component{
  state = {
    category: [],
    isShowAddCategory: false
  };

  showAddCategory= () => {
    this.setState({
      isShowAddCategory: true
    })
  };

  hideAddCategory = () => {
    this.setState({
      isShowAddCategory: false
    })
  };

  addCategory = () => {   // 验证表单收集数据，用到validateFields，而这个应该来自组件add-category-form里面的form
    this.setState({
      isShowAddCategory: false
    });
    // 校验通过
    // 收集表单数据
    // 发送请求
    this.addCategoryForm.props.form.validateFields(async (err, value) => {
      if(!err) {
        // console.log(value)
        const {categoryName, parentId} = value;
        const result = await reqAddCategory(parentId, categoryName);
        if(result) {
          message.success('提交成功');
          if(result.parentId === '0'){
            this.setState({
              category: [...this.state.category, result]
            });
          }
        }
      }
    })
  };

  async componentDidMount() {
    const result = await reqCategory('0');
    if(result) {
      this.setState({
        category:result
      })
    }
  }

  render() {
    const { category, isShowAddCategory } = this.state;
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        className: 'category-operation',
        render: text => <div>
          <MyButton>修改名称</MyButton>
          <MyButton>查看其子品类</MyButton>
        </div>
      },
    ];

    /*const data = [
      {
        key: '1',
        name: 'John Brown',
      },
      {
        key: '2',
        name: 'Jim Green',
      },
      {
        key: '3',
        name: 'Jim Green3',
      },
      {
        key: '4',
        name: 'Jim Green4',
      },
    ];*/

    return <Card title="一级分类列表" extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus" />添加品类</Button>} style={{ width: '100%' }}>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={category}
        bordered
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3','6','9'],
          defaultPageSize: 3
        }}
      />
      <Modal
        title="添加分类"
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.hideAddCategory}
        okText="确定"
        cancelText="取消"
      >
        <AddCategoryForm category={category} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
      </Modal>
      </Card>
  }
}