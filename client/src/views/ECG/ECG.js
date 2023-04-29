import { memo, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import EcgChart from "../../components/EcgHeart/EcgHeart";
import RR from "../../components/RR/RR";
import internalFetch from 'utils/fetch';
import { Box } from "@mui/system";

const limit = 100;

const ECG = () => {
    const [measurements, setMeasurements] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rrDistance, setRRDistance] = useState([]);
    const [bpm, setBpm] = useState([]);
    const [rrTotDistance, setRRTotDistance] = useState([]);
    const [totBpm, setTotBpm] = useState([]);

    const handleChange = (_, value) => setPage(value);

    useEffect(() => {
        const fetchECG = async () => {
            const response = await internalFetch(`ecg/measurements?id=644512ae1747a0ad16e54cd7&page=${page}&limit=${limit}`, {
                method: 'GET',
                includeCredentials: true,
            })

            const response2 = await internalFetch(`ecg/stats?id=644512ae1747a0ad16e54cd7`, {
                method: 'GET',
                includeCredentials: true,
            })
            const { total, measurements, rrDistancesMs, bpm: _bpm } = response.data;
            const { rr: totR, bpm: totB } = response2.data;
            setTotBpm(totB);
            setRRTotDistance(totR);
            setTotal(total);
            setMeasurements(measurements);
            setRRDistance(rrDistancesMs);
            setBpm(_bpm);
        };
        fetchECG();
    }, [page]);

    return (
        <div>
            <Box sx={{ p: 2 }}>
                <EcgChart ecgData={measurements} />
            </Box>
            <Box sx={{ p: 2 }}>
                <RR rrDistancesMs={rrDistance} />
            </Box>
            <Box sx={{ p: 2 }}>
                <RR rrDistancesMs={bpm} />
            </Box>
            <Box sx={{ p: 2 }}>
                <RR rrDistancesMs={rrTotDistance} />
            </Box>
            <Box sx={{ p: 2 }}>
                <RR rrDistancesMs={totBpm} />
            </Box>
            <Stack spacing={2}>
                <Pagination color="primary" count={total / limit} variant="outlined" onChange={handleChange} />
            </Stack>
        </div>
    );
};

export default memo(ECG);