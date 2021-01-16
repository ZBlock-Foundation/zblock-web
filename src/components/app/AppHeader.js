import React from "react";
import { Link } from "react-router-dom";

// UI Components
import { Menu, Drawer, Button } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const AppHeader = () => {
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="">ZBlock</a>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <Link to="/app">Home</Link>
            </Menu.Item>

            <Menu.Item key="community">
              <a href="">Communities</a>
            </Menu.Item>
          </Menu>
        </div>
        <div className="rightMenu">
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <a href="">Connect Metamask</a>
            </Menu.Item>
          </Menu>
        </div>
        <Button className="barsMenu" type="primary">
          <span className="barsBtn"></span>
        </Button>

        <Drawer title="Basic Drawer" placement="right">
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <a href="">Home</a>
            </Menu.Item>
            <SubMenu title={<span>Blogs</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a href="">Contact Us</a>
            </Menu.Item>
          </Menu>
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <a href="">Signin</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="">Signup</a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </nav>
  );
};

export default AppHeader;
