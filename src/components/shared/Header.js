import React, { useEffect, useState } from 'react';

const Header = () => {
    const [billings, setBillings] = useState([])
    const [sum, setSum] = useState(0)


    useEffect(() => {
        fetch('http://localhost:5000/billing-list')
            .then(res => res.json())
            .then(data => setBillings(data))
    }, [])
    useEffect(() => {
        let sum = 0;

        billings.map(bill => sum = bill.paidAmount + sum)

        setSum(sum)
    }, [billings])


    return (
        <div>
            <div className='flex justify-between mx-24 my-6'>
                <div>
                    <p>LOGO</p>
                </div>
                <div>
                    <p>Paid Total: {sum}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;