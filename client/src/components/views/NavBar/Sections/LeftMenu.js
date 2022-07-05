import React from 'react';
import { Menu, MailOutlined, SettingOutlined} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">

    </Menu.Item>
    <SubMenu title={<span>메뉴</span>}>
      <MenuItemGroup title="시리즈별">
        <Menu.Item key="setting:1">마블</Menu.Item>
        <Menu.Item key="setting:2">디즈니</Menu.Item>
        <Menu.Item key="setting:3">겨울왕국</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="가격별">
      <Menu.Item key="setting:4">전체 Lego</Menu.Item>
      <Menu.Item key="setting:5">저가 Lego</Menu.Item>
      <Menu.Item key="setting:6">중저가 Lego</Menu.Item>
      <Menu.Item key="setting:7">고가 Lego</Menu.Item>
      <Menu.Item key="setting:8">프리미엄 Lego</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="신제품"></MenuItemGroup>
    </SubMenu>
  </Menu>

  
  )
}

export default LeftMenu


