import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'antd';
import dayjs from "dayjs";

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import MyButton from '../../components/my-button';
import {reqUserList} from '../../api'

export default class User extends Component {
  state = {
    users: [], //用户数组
    roles:[],  //权限数组
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  async componentDidMount() {
    const result = await reqUserList();
    if(result) {
      this.setState({
        users: result.users,
        roles: result.roles
      })
    }
  }

  //创建用户的回调函数
  addUser = () => {};
  
  updateUser = () => {
  
  };

  toggleDisplay = (stateName, stateValue) => {
    return () => this.setState({[stateName]: stateValue})
  };
  
  render () {
    const {users, isShowAddUserModal, isShowUpdateUserModal} = this.state;

    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: role_id => {

        }
      },
      {
        title: '操作',
        render: user => {
          return <div>
            <MyButton onClick={() => {}}>修改</MyButton>
            <MyButton onClick={() => {}}>删除</MyButton>
          </div>
        }
      }
    ];
    
    return (
      <Card
        title={
          <Button type='primary' onClick={this.toggleDisplay('isShowAddUserModal', true)}>创建用户</Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />
  
        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.toggleDisplay('isShowAddUserModal', true)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm wrappedComponentRef={(form) => this.addUserForm = form}/>
        </Modal>
  
        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.toggleDisplay('isShowUpdateUserModal', true)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm wrappedComponentRef={(form) => this.updateUserForm = form}/>
        </Modal>
        
      </Card>
    )
  }
}
