import { Avatar, Dropdown, Flex, } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalSpendingThisMonth } from "../store/slices/spendingsSlice";
import { useEffect } from "react";

export default function Header() {

    const dropdownItems = [
        {
            key: '1',
            label: <Link to="/settings">Einstellungen</Link>,
        },
        {
            key: '2',
            label: <span onClick={() => logout()}>Abmelden</span>,
            danger: true,
        },
    ]

    function formatCurrency(amount) {
        return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    }

    function logout() {
        // Hier sollten Sie den Code zum Abmelden einfügen
    }

    const budget = useSelector(state => state.account.budget);
    const spendingsThisMonth = useSelector(getTotalSpendingThisMonth)

    useEffect(() => {
        console.log(spendingsThisMonth);
    }, [spendingsThisMonth]);

    return (
        <Flex justify="space-between" align="center" style={{ 'padding': '25px 0' }}>
            <div>
                <h1 style={{ 'margin': '0', 'color': (budget - spendingsThisMonth) >= 0 ? 'black' : 'red' }}>{budget != null ? formatCurrency(budget - spendingsThisMonth) : 'Loading'}</h1>
                <small>übrig für Mai</small>
            </div>
            <Dropdown arrow={'bottomRight'} menu={{ items: dropdownItems }}>
                <Avatar size="large" icon={<UserOutlined />}></Avatar>
            </Dropdown>
        </Flex>
    );
}