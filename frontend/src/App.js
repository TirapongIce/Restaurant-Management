import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import Login from './components/Login';
import Order from './components/Order';
import KitchenDashboard from './components/KitchenDashboard';
import DiningTableManagement from './components/DiningTableManagement';
import Welcome from './components/Welcome';
import logo from './assets/logo.png'; // Import your logo image

const { Header, Content } = Layout;

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <MainLayout />
            </Router>
        </AuthProvider>
    );
};

const MainLayout = () => {
    const location = useLocation();
    const history = useHistory();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <Layout>
            {location.pathname !== '/login' && (
                <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="logo">
                        <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '20px' , width: "100px"}} />
                    </div>
                    <Menu theme="dark" mode="horizontal" style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Menu.Item key="home" onClick={() => history.push('/welcome')}>
                            หน้าแรก
                        </Menu.Item>
                        <Menu.Item key="orders" onClick={() => history.push('/orders')}>
                            รายการอาหาร
                        </Menu.Item>
                        <Menu.Item key="reserved" onClick={() => history.push('/tables')}>
                            จองโต้ะ
                        </Menu.Item>
                        <Menu.Item key="tables" onClick={() => history.push('/kitchen')}>
                            ห้องครัว
                        </Menu.Item>
                        <Menu.Item key="logout" onClick={handleLogout}>
                            ออกจากระบบ
                        </Menu.Item>
                    </Menu>
                </Header>
            )}
            <Content style={{ padding: location.pathname === '/login' ? '0' : '10px' }}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/orders" component={Order} />
                    <Route path="/kitchen" component={KitchenDashboard} />
                    <Route path="/tables" component={DiningTableManagement} />
                    <Route path="/welcome" component={Welcome} />
                    <Redirect from="/" to={isAuthenticated ? "/orders" : "/login"} />
                </Switch>
            </Content>
        </Layout>
    );
};

export default App;
