import { Statistic, Flex } from 'antd';
import './SpendingsChart.css';

export default function SpendingsChart({ spendings, budget }) {

    const totalSpendings = spendings.reduce((acc, spending) => {
        return acc + spending.amount;
    }, 0);

    return (
        <>
            <div className="spendingsChart-bar">
                {spendings.map((spending, index) => {
                    let width = (spending.amount / budget) * 100;
                    if (totalSpendings > budget) {
                        width = (spending.amount / totalSpendings) * 100;
                    }
                    const backgroundColor = spending.color;
                    return (
                        <div
                            key={index}
                            className="spendingsChart-bar-item"
                            style={{ width: `${width}%`, backgroundColor }}
                        >
                        </div>
                    );
                })}
            </div>
        </>
    );
}