import { Button, ConfigProvider, Tag, DatePicker, Card, Flex, FloatButton, theme, Space } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpendingsSorted } from '../store/slices/spendingsSlice';

export default function ExpensesList() {

    function formatCurrency(amount) {
        return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    }

    const spendings = useSelector(getSpendingsSorted);

    useEffect(() => {
        console.log(spendings);
    }, [spendings]);

    function formatDate(dateString) {

        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Adding 1 because months are 0-indexed
        const year = date.getFullYear();

        const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;

        return formattedDate;

    }

    const spendingsList = spendings.map((spending, index) => {
        return (
            <Card size='small' key={index}>
                <Flex justify='space-between' align='center'>
                    <div>
                        <p style={{ 'margin': '0', 'fontSize': '18px' }}><b>{formatCurrency(spending.amount)}</b></p>
                        <Space>
                            <span>{spending.transaction_name}</span>
                            {spending.transaction_category ? <Tag color="orange">{spending.transaction_category}</Tag> : ''}
                        </Space>
                    </div>
                    <span style={{ 'color': '#666' }}>{formatDate(spending.date)}</span>
                </Flex>
            </Card>
        );
    });

    return (
        <>
            <h2 style={{'margin': '0', 'marginBottom': '5px'}}>Letzte Ausgaben</h2>
            <Space direction='vertical' size='small' style={{ 'width': '100%', 'marginBottom': '10px' }}>
                {spendingsList}
            </Space>
        </>
    );
}