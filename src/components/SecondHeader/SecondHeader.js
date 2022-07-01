import React, { useState } from 'react';

const SecondHeader = ({ billings, setBillings }) => {
    const [bill, setBill] = useState(null)
    const addBill = e => {
        e.preventDefault()

        const fullName = e.target.fullname.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const paidAmount = e.target.paidamount.value

        const newBill = { fullName, email, phone, paidAmount }
        console.log(newBill);

        fetch('http://localhost:5000/billings', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(newBill)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // if (data.insertedId) {
                //     setBill(newBill)
                //     setBillings(bill)
                // }
            })

    }
    return (
        <>
            {/* Second Header */}

            <div className='mt-16 mx-24'>
                <div>
                    <div className='flex justify-between mx-24 my-6'>
                        <div className='flex'>
                            <p>Billings</p>
                            <input className='border-black ml-12' type="text" name="search" id="search" placeholder='Search' />
                        </div>
                        <div>
                            {/* <button className='bg-gray-900 px-4 py-1 text-white rounded-3'>Add New Bill</button> */}
                            <label htmlFor="addbill-modal" className="btn btn-sm modal-button bg-gray-900 px-4 py-1 text-white rounded-3">Add New Bill</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}

            <input type="checkbox" id="addbill-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="addbill-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={addBill}>
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

export default SecondHeader;