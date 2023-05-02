import { memo, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Loader from "../../ui-component/Loader";
import EcgChart from "../../components/EcgHeart/EcgHeart";
import RR from "../../components/RR/RR";
import internalFetch from 'utils/fetch';
import { Box } from "@mui/system";

const limit = 700;

const ECG = () => {
    const [measurements, setMeasurements] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rrDistance, setRRDistance] = useState([]);
    const [bpm, setBpm] = useState([]);
    const [isEcgLoading, setIsEcgLoading] = useState(false);

    const handleChange = (_, value) => setPage(value);


    useEffect(() => {
        const fetchECG = async () => {
            try {
                setIsEcgLoading(true)
                const response = await internalFetch(`ecg/measurements?id=6450032690c90387d5f24e34&page=${page}&limit=${limit}`, {
                    method: 'GET',
                    includeCredentials: true,
                })

                const { total, measurements, rrDistancesMs, bpm: _bpm } = response.data;
                setTotal(total);
                setMeasurements(measurements);
                setRRDistance(rrDistancesMs);
                setBpm(_bpm);
            } catch (e) {
                console.error(e);
            } finally {
                setIsEcgLoading(false);
            }

        };
        fetchECG();
    }, [page]);

    return (
        <div>
            <Box sx={{ p: 2 }}>
                <EcgChart ecgData={measurements} />
            </Box>
            <Stack spacing={2}>
                <Pagination color="primary" count={Math.ceil(total / limit)} variant="outlined" onChange={handleChange} />
            </Stack>
            <Box sx={{ p: 2 }}>
                <RR label="RR" rrDistancesMs={rrDistance} />
            </Box>
            <Box sx={{ p: 2 }}>
                <RR label="BPM" rrDistancesMs={bpm} />
            </Box>
            {(isEcgLoading) && <Loader />}
        </div>
    );
};

export default memo(ECG);