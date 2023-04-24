import { memo, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import EcgChart from "../../components/EcgHeart/EcgHeart";
import internalFetch from 'utils/fetch';

const limit = 100;

const ECG = () => {
    const [measurements, setMeasurements] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const handleChange = (_, value) => setPage(value);

    useEffect(() => {
        const fetchECG = async () => {
            const response = await internalFetch(`ecg/measurements?id=644512ae1747a0ad16e54cd7&page=${page}&limit=${limit}`, {
                method: 'GET',
                includeCredentials: true,
            })
            const { total, measurements } = response.data;
            setTotal(total);
            setMeasurements(measurements);
        };
        fetchECG();
    }, [page]);

    return (
        <div>
            <EcgChart ecgData={measurements} />
            <Stack spacing={2}>
                <Pagination color="primary" count={total / limit} variant="outlined" onChange={handleChange} />
            </Stack>
        </div>
    );
};

export default memo(ECG);