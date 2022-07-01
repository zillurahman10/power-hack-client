import React, { useEffect, useState } from 'react';
import SecondHeader from '../SecondHeader/SecondHeader';
import Header from '../shared/Header';
import Table from '../Table/Table';

const Home = ({ billings, setBillings }) => {
    const [billing, setBilling] = useState({})
    // billings.map(billing => setBilling(billing))


    return (
        <div>
            <Header></Header>
            <SecondHeader billings={billings} setBillings={setBillings} billing={billing}></SecondHeader>
            <Table></Table>
        </div>
    );
};

export default Home;