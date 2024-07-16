import React, { useState, useEffect } from "react";
import { List, Card, Button, Row, Col, Modal, Typography, Badge } from "antd";
import {
  getOrders,
  completeOrder,
  cancelOrder,
} from "../services/orderService";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Meta } = Card;
const { Title } = Typography;

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleCompleteOrder = async (id) => {
    await completeOrder(id);
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "1" } : order
      )
    );
  };

  const handleCancelOrder = async (id) => {
    await cancelOrder(id);
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "2" } : order
      )
    );
  };

  const showConfirm = (orderId, action) => {
    confirm({
      title: `Are you sure you want to ${action === "complete" ? "complete" : "cancel"} this order?`,
      content: `Order ID: ${orderId}`,
      onOk() {
        if (action === "complete") {
          handleCompleteOrder(orderId);
        } else {
          handleCancelOrder(orderId);
        }
      },
      onCancel() {},
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "0":
        return "#FFEB3B"; 
      case "1":
        return "#4CAF50"; 
      case "2":
        return "#F44336"; 
      default:
        return "#FFFFFF"; 
    }
  };

  const renderOrders = (orders) => (
    <List
      grid={{ gutter: 12, column: 4 }}
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <Card
            title={`Order #${order.id} (Table ${order.table_id})`}
            style={{
              width: "100%",
              height: "300px",
              backgroundColor: getStatusColor(order.status),
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Row>
              <Col span={24}>
                {JSON.parse(order.items).map((item) => (
                  <div key={item.id} style={{ marginBottom: '5px' }}>
                    <Badge count={item.quantity} style={{ backgroundColor: '#52c41a' }} />
                    <span style={{ marginLeft: '10px' }}>{item.name}</span>
                  </div>
                ))}
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: "20px", position: "absolute", bottom: "10px", width: '100%' }}>
              <Col>
                {order.status === "0" && (
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => showConfirm(order.id, "complete")}
                    style={{ marginRight: "10px" }}
                  >
                    Complete
                  </Button>
                )}
                {order.status === "0" && (
                  <Button
                    type="danger"
                    icon={<CloseCircleOutlined />}
                    onClick={() => showConfirm(order.id, "cancel")}
                  >
                    Cancel
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );

  const inProgressOrders = orders.filter((order) => order.status === "0");
  const cancelledOrders = orders.filter((order) => order.status === "2");
  const completedOrders = orders.filter((order) => order.status === "1");

  return (
    <div style={{ padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Kitchen Dashboard</Title>
      <Row gutter={24}   >
 
        <Col span={24} style={{marginBottom: "20px"}}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={3} style={{ textAlign: 'center', color: '#ffeb3b' }}>In Progress</Title>
            {renderOrders(inProgressOrders)}
          </div>
        </Col>
        <Col span={12}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={3} style={{ textAlign: 'center', color: '#f44336' }}>Cancelled</Title>
            {renderOrders(cancelledOrders)}
          </div>
        </Col>
        <Col span={12}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={3} style={{ textAlign: 'center', color: '#4caf50' }}>Completed</Title>
            {renderOrders(completedOrders)}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default KitchenDashboard;
