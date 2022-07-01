import React, { useEffect, useState } from 'react';
import SecondHeader from '../SecondHeader/SecondHeader';
import Header from '../shared/Header';
import Table from '../Table/Table';

const Home = () => {
    const [billings, setBillings] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/billings')
            .then(res => res.json())
            .then(data => setBillings(data))
    }, [])
    return (
        <div>
            <Header></Header>
            <SecondHeader billings={billings} setBillings={setBillings}></SecondHeader>
            <Table></Table>
        </div>
    );
};

export default Home;