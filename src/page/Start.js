import { Button, ConfigProvider, Tag, DatePicker, Card, Flex, FloatButton, theme, Space } from 'antd';
import Header from '../components/Header';
import SpendingsChart from '../components/SpendingsChart';
import ExpensesList from '../components/ExpensesList';
import InsertExpenseModal from '../components/InsertExpenseModal';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { getSpendingsPerCategory } from '../store/slices/spendingsSlice';

function Start() {

    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [insertExpenseModalVisible, setInsertExpenseModalVisible] = useState(false);
    const budget = useSelector(state => {
        return state.account.budget;
    });
    const spendingsPerCategory = useSelector(getSpendingsPerCategory);

    useEffect(() => {
        console.log(spendingsPerCategory);
    }, [spendingsPerCategory]);

    function getColorByCategory(category) {
        switch (category) {
            case 'Essen':
                return '#52c757';
            case 'Freizeit':
                return '#e3bc30';
            case 'Miete':
                return '#485ad4';
            case 'Sonstiges':
                return '#454545';
            default:
                return '#000000';
        }
    }

    const spendings = [
        {
            category: 'Essen',
            amount: 500,
            color: '#ff0000'
        },
        {
            category: 'Freizeit',
            amount: 200,
            color: '#00ff00'
        },
        {
            category: 'Miete',
            amount: 500,
            color: '#0000ff'
        }
    ];

    return (
        <>
            <div style={{ 'padding': '0 20px' }}>
                <Header />
                <Space direction='vertical' size='middle' style={{ 'width': '100%' }}>
                    <SpendingsChart spendings={Object.entries(spendingsPerCategory).map(entry => {
                        return {
                            category: entry[0],
                            amount: entry[1],
                            color: getColorByCategory(entry[0])
                        };
                    })} budget={budget} />
                    <ExpensesList />
                </Space>
            </div>
            <InsertExpenseModal visible={insertExpenseModalVisible} onClose={() => setInsertExpenseModalVisible(false)} />
            <FloatButton type='primary' onClick={() => setInsertExpenseModalVisible(true)} icon={<PlusOutlined></PlusOutlined>} />
        </>
    );
}

export default Start;
