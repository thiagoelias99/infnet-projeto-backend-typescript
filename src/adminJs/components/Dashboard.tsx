import { ApiClient } from "adminjs";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
    const [data, setData] = useState("");
    // const api = new ApiClient();

    useEffect(() => {
        setData("Oláááááá");
        // api.getDashboard()
        //     .then((response) => {
        //         setData(response.data); // { message: 'Hello World' }
        //     })
        //     .catch((error) => {
        //         // handle any errors
        //     });
    }, []);

    return (
        <>
            <div>Dashboard</div>
            <div>{data}</div>
        </>
    );
}
