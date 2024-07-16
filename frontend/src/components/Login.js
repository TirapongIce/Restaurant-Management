import React, { useState, useContext } from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import { login, register } from '../services/authService';
import { useHistory } from 'react-router-dom';
const { Title, Text } = Typography;

const LoginRegister = () => {
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { login: setAuth } = useContext(AuthContext);
    const [form] = Form.useForm();
    const history = useHistory();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (isRegister) {
                await register(values);
                message.success('Registration successful');
                setIsRegister(false);
            } else {
                const { token } = await login(values.username, values.password);
                setAuth(token);
                history.push('/welcome');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            message.error(error.response ? error.response.data.message : 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Col xs={22} sm={18} md={12} lg={8} xl={6}>
                <div style={{ padding: 24, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Title level={3} style={{ textAlign: 'center' }}>{isRegister ? 'Register' : 'Login'}</Title>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        {isRegister && (
                            <>
                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm Password" />
                                </Form.Item>
                                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                                    <Input placeholder="Phone Number" />
                                </Form.Item>
                            </>
                        )}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                {isRegister ? 'Register' : 'Login'}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
                                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <a onClick={toggleForm}>{isRegister ? 'Login' : 'Register'}</a>
                            </Text>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default LoginRegister;
