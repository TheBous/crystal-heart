import { memo, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Loader from "../../ui-component/Loader";
import RR from "../../components/RR/RR";
import internalFetch from 'utils/fetch';
import { Box } from "@mui/system";

const statsLimit = 50_000;

const Stats = () => {
    const [total, setTotal] = useState(0);
    const [statsPage, setStatsPage] = useState(1);
    const [rrTotDistance, setRRTotDistance] = useState([]);
    const [totBpm, setTotBpm] = useState([]);
    const [lowestBpmValues, setLowestBpmValues] = useState([]);
    const [highestRRValues, setHighestRRValues] = useState([]);
    const [isStatsLoading, setIsStatsLoading] = useState(false);

    const handleStatsPageChange = (_, value) => setStatsPage(value);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsStatsLoading(true);
                const response2 = await internalFetch(`ecg/stats?id=6450032690c90387d5f24e34&page=${statsPage}&limit=${statsLimit}`, {
                    method: 'GET',
                    includeCredentials: true,
                })
                const {
                    rr: totR,
                    bpm: totB,
                    lowestBpmValues: _lowestBpmValues,
                    highestRRValues: _highestRRValues,
                    total
                } = response2.data;
                debugger;
                setTotBpm(totB);
                setTotal(total);
                setRRTotDistance(totR);
                setLowestBpmValues(_lowestBpmValues);
                setHighestRRValues(_highestRRValues);
            } catch (e) {
                console.error(e);
            } finally {
                setIsStatsLoading(false);
            }
        }

        fetchStats();
    }, [statsPage]);

    return (
        <div>
            <Box sx={{ p: 2 }}>Min 5 measures BPM: {lowestBpmValues.join(",")}</Box>
            <Box sx={{ p: 2 }}>Max 5 measures RR interval: {highestRRValues.join(",")}</Box>
            <Box sx={{ p: 2 }}>
                <RR label="RR" rrDistancesMs={rrTotDistance} />
            </Box>
            <Box sx={{ p: 2 }}>
                <RR label="BPM" rrDistancesMs={totBpm} />
            </Box>
            <Stack spacing={2}>
                <Pagination color="primary" count={Math.ceil(total / statsLimit)} variant="outlined" onChange={handleStatsPageChange} />
            </Stack>
            {(isStatsLoading) && <Loader />}
        </div>
    );
};

export default memo(Stats);