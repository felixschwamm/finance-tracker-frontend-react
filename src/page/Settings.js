import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Space, Button, Radio, Spin } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateBudget } from '../store/slices/accountSlice';

export default function Settings() {
    const [budgetDisplayFormat, setBudgetDisplayFormat] = useState(localStorage.getItem('budgetDisplayFormat') || 'remaining');
    const [isLoading, setIsLoading] = useState(true);
    const username = useSelector(state => {
        console.log(state);
        return state.keycloak.username;
    });
    const budget = useSelector(state => state.account.budget);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchBudget();
    }, []);

    const fetchBudget = async () => {
        setIsLoading(true);
        // Hier sollten Sie den Code zum Abrufen des Budgets vom Server einfügen
        // Nach dem Laden:
        setIsLoading(false);
    };

    const saveSettings = async (values) => {
        setIsLoading(true);
        dispatch(updateBudget(values.budget))
        setIsLoading(false);

        localStorage.setItem('budgetDisplayFormat', values.budgetDisplayFormat);
    };

    return (
        <div style={{ padding: '20px 20px' }}>
            <Space direction='vertical' size='middle' style={{ width: '100%' }}>
                <div>
                    <Link to="/"><ArrowLeftOutlined />&nbsp;Zurück</Link>
                    <h1 style={{ margin: '0' }}>Einstellungen</h1>
                </div>
                <div>
                    <span>Username: {username}</span>
                    {isLoading ? (
                        <Spin size="large" style={{ display: 'block', marginTop: '50px', textAlign: 'center' }} />
                    ) : (
                        <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        initialValues={{ budget, budgetDisplayFormat }}
                        onFinish={saveSettings}
                        disabled={isLoading}
                    >
                        <Form.Item name="budget" label="Budget" rules={[{ required: true, message: 'Bitte gib ein Budget ein (größer 0)', min: 0, type: 'number' }]}>
                            <InputNumber disabled={isLoading} />
                        </Form.Item>
                        {/* <Form.Item name="budgetDisplayFormat" label="Anzeigeformat für Budget" rules={[{ type: 'string' }]}>
                            <Radio.Group buttonStyle="solid" disabled={isLoading}>
                                <Radio.Button value='remaining'>Verbleibend</Radio.Button>
                                <Radio.Button value='total'>Gesamt</Radio.Button>
                            </Radio.Group>
                        </Form.Item> */}
                        {/* submit button */}
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            Speichern
                        </Button>
                    </Form>
                    )}
                </div>
            </Space>
        </div>
    );
}
