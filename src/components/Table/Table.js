import React, { useEffect, useState } from 'react';
import './Table.css'

const Table = () => {
    const [pages, setPages] = useState(0)
    const [pagesCount, setPagesCount] = useState(0)
    const [billings, setBillings] = useState([])
    const [bill, setBill] = useState(null)

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

    const updateBill = e => {
        e.preventDefault()

        const fullName = e.target.fullname.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const paidAmount = e.target.paidamount.value

        const updatedBill = { fullName, email, phone, paidAmount }
        console.log(updatedBill);

        fetch(`http://localhost:5000//update-billing/`, {
            method: "PUT",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(updatedBill)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    setBill(updatedBill)
                    setBillings(bill)
                    alert('updated succesfully')
                }
            })

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


            {/* modal */}


            <input type="checkbox" id="addbill-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="addbill-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={updateBill}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="Alexandre Christie" className="input input-bordered" name='fullname' />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="example@gmail.com" className="input input-bordered" name='email' />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="text" placeholder="01837758398" className="input input-bordered" name='phone' />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Paid Amount</span>
                            </label>
                            <input type="text" placeholder="7384" className="input input-bordered" name='paidamount' />
                            {/* <label type='submit' htmlFor="addbill-modal" className="btn w-52 mx-auto">Submit</label> */}
                            <input type="submit" htmlFor='addbill-modal' className='btn w-52 mx-auto mt-3' value='Submit' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Table;