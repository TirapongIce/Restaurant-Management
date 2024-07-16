import React, { useState, useEffect } from 'react';
import { List, Card, Button, Modal, message } from 'antd';
import { getTables, updateTable } from '../services/diningTableService';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { confirm } = Modal;

const DiningTableManagement = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            const data = await getTables();
            setTables(data);
        };
        fetchTables();
    }, []);

    const handleReserveTable = async (id) => {
        const tableToUpdate = tables.find(table => table.id === id);
        if (tableToUpdate.status === '0') {
            const updatedTable = { ...tableToUpdate, status: '1' }; 
            await updateTable(id, updatedTable);
            setTables(tables.map(table => table.id === id ? updatedTable : table));
            message.success(`Table ${tableToUpdate.number} reserved successfully`);
        }
    };

    const handleCancelReservation = async (id) => {
        const tableToUpdate = tables.find(table => table.id === id);
        if (tableToUpdate.status === '1') {
            const updatedTable = { ...tableToUpdate, status: '0' }; 
            await updateTable(id, updatedTable);
            setTables(tables.map(table => table.id === id ? updatedTable : table));
            message.success(`Reservation for Table ${tableToUpdate.number} cancelled successfully`);
        }
    };

    const showReserveConfirm = (id) => {
        const table = tables.find(table => table.id === id);
        confirm({
            title: `Do you want to reserve Table ${table.number}?`,
            onOk() {
                handleReserveTable(id);
            },
            onCancel() {},
        });
    };

    const showCancelConfirm = (id) => {
        const table = tables.find(table => table.id === id);
        confirm({
            title: `Do you want to cancel the reservation for Table ${table.number}?`,
            onOk() {
                handleCancelReservation(id);
            },
            onCancel() {},
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case '0':
                return '#FFFFFF'; 
            case '1':
                return '#D3D3D3'; 
            default:
                return '#FFFFFF';
        }
    };

    return (
        <div style={{ padding: '20px', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Dining Table Management</h2>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={tables}
                renderItem={item => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ 
                                backgroundColor: getStatusColor(item.status),
                                borderRadius: '10px',
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
                                item.status === '0' && (
                                    <Button 
                                        type="primary" 
                                        icon={<CheckOutlined />}
                                        onClick={() => showReserveConfirm(item.id)} 
                                    >
                                        จอง
                                    </Button>
                                ),
                                item.status === '1' && (
                                    <Button 
                                        type="danger" 
                                        icon={<CloseOutlined />}
                                        onClick={() => showCancelConfirm(item.id)}
                                    >
                                        ยกเลิกการจอง
                                    </Button>
                                )
                            ]}
                        >
                            <Meta title={`Table ${item.number}`} description={`Status: ${item.status === '0' ? 'Available' : 'Reserved'}`} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default DiningTableManagement;
