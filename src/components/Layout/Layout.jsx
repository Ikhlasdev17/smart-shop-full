import React, { Suspense, useEffect, useState } from "react";
import { Button, Layout, Menu, Typography } from "antd";
import TopNav from "../TopNav/TopNav";


import "./Layout.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "../../Pages/Main/Main";
import Sidebar from "../Sidebar/Sidebar";

import Client from "../../Pages/Clients/Clients";
import { useNavigate, useLocation } from "react-router-dom";
import Sellers from "../../Pages/Sellers/Sellers";
import Categories from "../../Pages/Categories/Categories";
import Products from "../../Pages/Products/Products";
import Orders from "../../Pages/Orders/Orders";
import Warehouse from "../../Pages/Warehouse";
import Consumptions from "../../Pages/Consumption/Consumption"
import Baskets from "../../Pages/Baskets/Baskets";
import OrderWarehouse from "../../Pages/OrderWarehouse/OrderWarehouse";
import axios from "axios";
import { setToken, URL } from "../../assets/api/URL";

import { useDispatch, useSelector } from 'react-redux'

import {userLogout} from '../../redux/userSlice'
import Valutes from "../../Pages/Valutes/Valutes";
import ReturnOrder from "../../Pages/ReturnOrder/ReturnOrder";
import Casheir from "../../Pages/Casheir/Casheir";
const { Header, Footer, Sider, Content } = Layout;

const Wrapper = () => {
  let navigate = useNavigate();
  const location = useLocation()
  const [width, setWidth] = useState(); 
  const [log, setLogged] = useState('');
  const dispatch = useDispatch()

  const { logged } = useSelector(state => state.userReducer)
  

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
 
      setWidth(window.innerWidth) 
      
      window.addEventListener('resize', () => {
        setWidth(window.innerWidth) 
      })
  }, [log]); 

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (width < 1200){
        setCollapsed(true);
    } else {
        setCollapsed(false);
    }
  } ,[width])

  useEffect(() => {
    const res = fetch(`${URL}/api/currency` , setToken())
    .then(res => {
      if (res.status === 401) {
          dispatch(userLogout())
          setLogged(false)
      }
    })
  } ,[location.pathname])
 
  console.log = function() {return 'Salom'}
  return (
    <Layout className="wrapper">
      <TopNav setLogged={setLogged} width={width} setCollapsed={() => setCollapsed(!collapsed)} collapsed={collapsed} />
      <Layout className={`main-wrapper`}>
        <Sider
          breakpoint="lg" 
          style={{
            width: "250px",
            position: "fixed",
            height: "100vh",
            overflowY: "scroll",
            zIndex: "1000",
          }}
          width="250"
          className="layout__sider"  
          collapsed={collapsed}
          collapsedWidth={width < 1200 ? '0' : '50'}
        >
          <Sidebar 
          setCollapsed={setCollapsed}
          windowWidth={width}
          collapsed={collapsed} />
        </Sider>
        <Layout className={`layout__content ${collapsed ? "collapsed" : ""}`}>
          <Content className={"main-content"}>
            <Routes>
              <Route path={"/"} element={<Main />} />
              <Route path={"/clients"} element={<Client />} />
              <Route path={"/sellers"} element={<Sellers />} />
              <Route path={"/categories"} element={<Categories />} />
              <Route path={"/products"} element={<Products />} />
              <Route path={"/offers"} element={<Orders />} />
              <Route path={"/warehouse/*"} element={<Warehouse />} />
              <Route path={"/consumptions/*"} element={<Consumptions />} />
              <Route path={"/operations/client"} element={<Baskets />} />
              <Route path={"/operations/offer"} element={<OrderWarehouse />} />
              <Route path={"/finans/valutes"} element={<Valutes />} />  
              <Route path={"/operations/return"} element={<ReturnOrder />} />  
              <Route path="/casheir" element={<Casheir />} />
              
            </Routes>
          </Content>
          <Footer
            className="layout__footer"
            style={{ backgroundColor: "#fff" }}
          >
            <Typography variant="h3">TexnoPOS IT Center</Typography>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Wrapper;
