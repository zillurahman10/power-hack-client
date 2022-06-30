import React, { useEffect, useState } from 'react';

const Table = ({ billings }) => {
    return (
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
                            <td><button>Edit</button> | <button>Delete</button></td>
                        </tr>
                    </tbody>)
                }
            </table>
        </div>
    );
};

export default Table;