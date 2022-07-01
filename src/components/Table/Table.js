import React, { useEffect, useState } from 'react';
import './Table.css'

const Table = () => {
    const [pages, setPages] = useState(0)
    const [pagesCount, setPagesCount] = useState(0)
    const [billings, setBillings] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/billing-list?page=${pagesCount}`)
            .then(res => res.json())
            .then(data => setBillings(data))
    }, [pagesCount])

    useEffect(() => {
        fetch('http://localhost:5000/billCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count
                const pageCount = Math.ceil(count / 10)
                setPages(pageCount)
            })
    }, [])

    const deleteBill = id => {
        const confirm = window.confirm('are you sure to delete the bill')
        if (confirm) {
            const url = `http://localhost:5000/billings/${id}`
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log('deleted');
                        const remaining = billings.filter(bill => bill._id !== id)
                        setBillings(remaining)
                        console.log(remaining);
                    }
                })
        }
    }

    return (
        <>
            <div className='flex justify-center mt-12 w-50 mx-auto'>
                <table className="table table-bordered mx-6">
                    <thead>
                        <tr>
                            <th>Billing ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        billings.map(billing => <tbody>
                            {/* <!-- row 1 --> */}
                            <tr className='hover'>
                                <th>{billing?._id.slice(0, 15)}</th>
                                <td>{billing?.fullName}</td>
                                <td>{billing?.email}</td>
                                <td>{billing?.phone}</td>
                                <td>{billing?.paidAmount}</td>
                                <td><button>Edit</button> | <button onClick={() => deleteBill(billing._id)}>Delete</button></td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
            <div className='flex justify-center mt-5 my-5 pagination'>
                {
                    [...Array(pages).keys()]
                        .map(number => <button className={pagesCount === number ? 'selected' : ''} onClick={() => setPagesCount(number)}>{number + 1}</button>)
                }
            </div>
        </>
    );
};

export default Table;