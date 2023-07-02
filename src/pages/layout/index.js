import { useEffect, useState } from "react";
import { Layout, Popconfirm, Menu, message } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from "@/store";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import "./index.scss";

function GeekLayout() {

  const { Header, Sider } = Layout;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userStore, loginStore } = useStore();
  const [ defaultKey, setDefaultKey ] = useState("/home");

  const items = [
    { label: '数据概览', key: '/home', icon: <HomeOutlined /> },
    { label: '内容管理', key: '/article', icon: <DiffOutlined /> },
    { label: '发布文章', key: '/publish', icon: <EditOutlined /> }
  ];

  // menu默认高亮
  useEffect(() => {
    setDefaultKey(pathname);
  }, [pathname])
  

  // 获取用户数据
  useEffect(() => {
    try {
      userStore.getUserInfo();
    } catch (e) {
      message.error(e.response?.data?.message);
    };
  }, [userStore]);

  // 点击menuitem
  const itemClick = (e) => {
    navigate(e.key);
  }

  // 登出
  const onLogout = () => {
    loginStore.logout();
    navigate("/login");
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <div></div>
        </div>
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[defaultKey]}
            items={items}
            onClick={itemClick}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  );
}

// mobx-lite observer使组件变成响应式
export default observer(GeekLayout);