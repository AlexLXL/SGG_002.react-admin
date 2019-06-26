import React,{Component} from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';

import { reqCategory, reqAddCategory, reqUpdateName } from '../../api'
import MyButton from '../../components/my-button'
import './index.less'
import AddCategoryForm from './add-category-form'
import CategoryRename from './category-rename'

export default class Category extends Component{
  state = {
    category: [],
    subCategory: [],
    isShowAddCategory: false,
    isShowRename:false,
    isSubCategory: false
  };

  text = {};

  // 合并show & hide
  hideShowModal = (stateName, bool) => {  // 不写成高阶函数，onclick是异步事件等于一个函数调用，会一直检测然后调用
    return () => {
      this.setState({
        [stateName]: bool
      })
    }
  };
/*  showAddCategory= () => {
    this.setState({
      isShowAddCategory: true
    })
  };

  hideAddCategory = () => {
    this.setState({
      isShowAddCategory: false
    })
  };*/

  saveCategory = (text) => {

    return () => {
      this.text = text;
      this.setState({
        isShowRename: true
      })
    }
  };

  showSubCategory = (text) => {
    return async () => {
      this.levelText = text;
      const result1 = await reqCategory(text._id);
      if(result1) {
        this.setState({
          subCategory: result1,
          isSubCategory: true
        })
      }
    }
  };

  showLevelOne = () => {
    this.setState({
      isSubCategory: false
    })
  }

  categoryRename = () => {
    const {form} = this.updateCategoryNameForm.props;
    console.log(form, form.validateFields);

    form.validateFields(async (err, value) => {
      if(!err) {
        const {categoryName} = value;
        const categoryId = this.text._id;
        const result = await reqUpdateName(categoryId, categoryName);

        if(result) {
          let categoryData = this.state.category;
          let dataName = 'category';
          if(this.text.parentId !== '0') {
            categoryData = this.state.subCategory;
            dataName = 'subCategory';
          }

          // 复制一份this.state.category，不修改原数据
          const newCategory = categoryData.map((item) => {
            let { _id, name, parentId } = item;
            if (_id === categoryId) {
              name = categoryName;
              return {
                _id,
                name,
                parentId
              }
            }
            // 没有修改的数据直接返回
            return item
          });
          message.success('更新分类名称成功~', 2);

          form.resetFields('categoryName');

          this.setState({
            [dataName]: newCategory,
            isShowRename: false
          })
        }
      }
    })
  };

  hideShowcategoryRename = () => {
    this.updateCategoryNameForm.props.form.resetFields('categoryName');
    this.setState({
      isShowRename: false
    })
  };

  addCategory = () => {   // 验证表单收集数据，用到validateFields，而这个应该来自组件add-category-form里面的form
    // 校验通过
    // 收集表单数据
    // 发送请求
    this.addCategoryForm.props.form.validateFields(async (err, value) => {
      if(!err) {
        // console.log(value)
        const {categoryName, parentId} = value;
        const result = await reqAddCategory(parentId, categoryName);
        if(result) {
          this.setState({
            isShowAddCategory: false
          });
          this.addCategoryForm.props.form.resetFields(['parentId','categoryName']);
          message.success('提交成功');
          if(result.parentId === '0'){
            this.setState({
              category: [...this.state.category, result]
            });
          }else if(this.state.isSubCategory && result.parentId === this.levelText._id) {
            // 是二级分类，且是当前二级分类页面才显示
            this.setState({
              subCategory:[...this.state.subCategory, result]
            })
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
    const { category, isShowAddCategory, isShowRename, subCategory, isSubCategory } = this.state;
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'operation',
        className: 'category-operation',
        render: text => <div>
          <MyButton onClick={this.saveCategory(text)}>修改名称</MyButton>
          {
            isSubCategory ? null : <MyButton onClick={this.showSubCategory(text)}>查看其子品类</MyButton>
          }
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

    return <Card
      title={ isSubCategory ? <div><MyButton onClick={this.showLevelOne}>一级分类</MyButton> <Icon type="arrow-right" />&nbsp;{this.levelText.name}</div> : "一级分类"}
      extra={<Button type="primary" onClick={this.hideShowModal('isShowAddCategory', true)}><Icon type="plus" />添加品类</Button>}
      style={{ width: '100%' }}
    >
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={ isSubCategory ? subCategory : category }
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
        onCancel={this.hideShowModal('isShowAddCategory', false)}
        okText="确定"
        cancelText="取消"
      >
        <AddCategoryForm category={category} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
      </Modal>

      <Modal
        title="更新分类"
        visible={isShowRename}
        onOk={this.categoryRename}
        onCancel={this.hideShowcategoryRename}
        okText="确定"
        cancelText="取消"
        width={300}
      >
        <CategoryRename categoryName={this.text.name} wrappedComponentRef={(form) => this.updateCategoryNameForm = form}/>
      </Modal>
    </Card>
  }
}