import { Modal, Select, Form, Divider, Input, InputNumber, Button } from "antd";
import { useDispatch } from "react-redux";
import { createNewSpending } from "../store/slices/createSpendingsSlice";
import { useState } from "react";
import { fetchAccount } from "../store/slices/accountSlice";
import { fetchSpendings } from "../store/slices/spendingsSlice";

export default function InsertExpenseModal({ visible, onClose }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    async function handleFinish(values) {
        setLoading(true);
        values.date = new Date();
        values.tags = values.tags ? values.tags : [];
        console.log(values);
        try {
            await dispatch(createNewSpending(values));
            dispatch(fetchSpendings());
            dispatch(fetchAccount());
            onClose();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <Modal onCancel={onClose} open={visible} title='Ausgabe eintragen' cancelText='Abbrechen' footer={[
            <Button loading={loading} form="insertExpenseForm" key="submit" htmlType="submit" type="primary">
                Speichern
            </Button>,
        ]}>
            <Form
                id="insertExpenseForm"
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleFinish}
                initialValues={{ category: 'Essen' }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Bitte gib einen Namen ein', type: 'string' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Kategorie"
                    name="category"
                >
                    <Select options={
                        [
                            {
                                label: 'Essen',
                                value: 'Essen'
                            },
                            {
                                label: 'Freizeit',
                                value: 'Freizeit'
                            },
                            {
                                label: 'Miete',
                                value: 'Miete'
                            }
                        ]
                    } />
                </Form.Item>
                {/* <Form.Item
                    label="Tags"
                    name="tags"
                >
                    <Select mode="tags" />
                </Form.Item> */}
                <Form.Item
                    label="Betrag"
                    name="amount"
                    rules={[{ required: true, message: 'Bitte gib einen Betrag ein (größer 0)', min: 0, type: 'number' }]}
                >
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
}