import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Card} from "antd";
import GoogleMaps from "./GoogleMaps";
import CustomSpinner from "../Layout/CustomSpinner";

const ActiveOrder = () => {
    const [order, setOrder] = useState({});
    const [cookies] = useCookies(['email']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/getActive', {
            params: {
                'id': cookies['email']
            }
        }).then(data => {
            if (data.data !== undefined && data.data.length !== 0) {
                setOrder(data.data[0]);
                console.log(order);
            }
        }).then(() => {
            setLoading(false);
        });
    }, []);

    const RenderActive = () => {
        if (Object.keys(order).length === 0)
            return <h2>No active order.</h2>
        else
            return (
                <>
                    <Card
                        title="Current order"
                        style={{width: "30%"}}
                    >
                        {order.msg}
                        <p style={{textAlign: "end"}}>Address: {order.addr}</p>
                        <p style={{textAlign: "end"}}>Status: {order.status}</p>
                    </Card>
                    <div>
                        <GoogleMaps/>
                    </div>
                </>
            )
    };

    return (
        <>
            {loading && <CustomSpinner/>}
            {!loading && <RenderActive/>}
        </>
    );
};

export default ActiveOrder;