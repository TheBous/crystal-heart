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
    const [rrTotDistance, setRRTotDistance] = useState([]);
    const [totBpm, setTotBpm] = useState([]);
    const [lowestBpmValues, setLowestBpmValues] = useState([]);
    const [highestRRValues, setHighestRRValues] = useState([]);
    const [isEcgLoading, setIsEcgLoading] = useState(false);
    const [isStatsLoading, setIsStatsLoading] = useState(false);

    const handleChange = (_, value) => setPage(value);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsEcgLoading(true);
                const response2 = await internalFetch(`ecg/stats?id=6450b4d8df6c7a6f39fb8800`, {
                    method: 'GET',
                    includeCredentials: true,
                })
                const { rr: totR, bpm: totB, lowestBpmValues: _lowestBpmValues, highestRRValues: _highestRRValues } = response2.data;
                setTotBpm(totB);
                setRRTotDistance(totR);
                setLowestBpmValues(_lowestBpmValues);
                setHighestRRValues(_highestRRValues);
            } catch (e) {
                console.error(e);
            } finally {
                setIsEcgLoading(false);
            }
        }

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchECG = async () => {
            try {
                setIsStatsLoading(true)
                const response = await internalFetch(`ecg/measurements?id=6450b4d8df6c7a6f39fb8800&page=${page}&limit=${limit}`, {
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
                setIsStatsLoading(false);
            }

        };
        fetchECG();
    }, [page]);

    return (
        <div>
            <Box sx={{ p: 2 }}>Min 5 measures BPM: {lowestBpmValues.join(",")}</Box>
            <Box sx={{ p: 2 }}>Max 5 measures RR interval: {highestRRValues.join(",")}</Box>
            <Box sx={{ p: 2 }}>
                <EcgChart ecgData={measurements} />
            </Box>
            <Stack spacing={2}>
                <Pagination color="primary" count={total / limit} variant="outlined" onChange={handleChange} />
            </Stack>
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
            {(isEcgLoading || isStatsLoading) && <Loader />}
        </div>
    );
};

export default memo(ECG);