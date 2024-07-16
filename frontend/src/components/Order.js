import React, { useState, useEffect } from 'react';
import { List, Card, Button, Row, Col, Select, Modal, message, Typography, Badge } from 'antd';
import { getMenu, addOrder } from '../services/orderService';
import { getTables } from '../services/diningTableService'; // Import the service to get tables
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Option } = Select;
const { confirm } = Modal;
const { Title } = Typography;

const Order = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            const data = await getMenu();
            setMenuItems(data);
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        const fetchTables = async () => {
            const data = await getTables();
            setTables(data);
        };
        fetchTables();
    }, []);

    const handleAddOrder = (item) => {
        const existingItem = orderItems.find(orderItem => orderItem.id === item.id);
        if (existingItem) {
            setOrderItems(orderItems.map(orderItem =>
                orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
            ));
        } else {
            setOrderItems([...orderItems, { ...item, quantity: 1 }]);
        }
    };

    const showConfirmOrderPopup = () => {
        confirm({
            title: 'Confirm Order',
            content: 'Are you sure you want to confirm this order?',
            onOk() {
                handleConfirmOrder();
            },
            onCancel() {},
        });
    };

    const handleConfirmOrder = async () => {
        if (!selectedTable) {
            message.warning("Please select a table before confirming the order.");
            return;
        }
        const order = await addOrder({ items: orderItems, table: selectedTable });
        setOrderItems([]);
        setSelectedTable(null);
        message.success('Order confirmed successfully');
    };

    const handleDeleteOrderItem = (id) => {
        setOrderItems(orderItems.filter(orderItem => orderItem.id !== id));
    };

    return (
        <Row gutter={24} style={{ padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Col span={16}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Menu</Title>
                    <List
                        grid={{ gutter: 24, column: 4 }}
                        dataSource={menuItems}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{ 
                                        borderRadius: '10px', 
                                        overflow: 'hidden', 
                                        background: '#fafafa', 
                                        color: '#000', 
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    actions={[
                                        <Button 
                                            type="primary" 
                                            icon={<PlusOutlined />} 
                                            onClick={() => handleAddOrder(item)}
                                            style={{ background: '#1890ff', borderColor: '#1890ff' }}
                                        >
                                            Add
                                        </Button>
                                    ]}
                                >
                                    <Meta title={item.name} description={`Price: ${item.price}`} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </Col>
            {orderItems.length > 0 && (
                <Col span={8}>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Confirm Menu</Title>
                        <List
                            dataSource={orderItems}
                            renderItem={item => (
                                <List.Item
                                    style={{ padding: '10px 0' }}
                                >
                                    <Card style={{ borderRadius: '10px', background: '#ff7875', color: '#fff' }}>
                                        {item.name} - {item.price} x {item.quantity}
                                        <Button 
                                            type="danger" 
                                            icon={<DeleteOutlined />} 
                                            onClick={() => handleDeleteOrderItem(item.id)}
                                            style={{ marginTop: '10px', background: '#ff4d4f', borderColor: '#ff4d4f' , marginLeft : "100px"}}
                                        >
                                            Remove
                                        </Button>
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <div style={{ marginTop: '20px' }}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select a table"
                                value={selectedTable}
                                onChange={value => setSelectedTable(value)}
                            >
                                {tables.map(table => (
                                    <Option key={table.id} value={table.id}>{`Table ${table.number}`}</Option>
                                ))}
                            </Select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Button type="primary" onClick={showConfirmOrderPopup} style={{ width: '100%', background: '#52c41a', borderColor: '#52c41a' }}>Confirm Order</Button>
                        </div>
                    </div>
                </Col>
            )}
        </Row>
    );
};

export default Order;
