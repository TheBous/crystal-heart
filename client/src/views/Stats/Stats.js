import { memo, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Loader from "../../ui-component/Loader";
import RR from "../../components/RR/RR";
import internalFetch from 'utils/fetch';
import { Box } from "@mui/system";
import { useSearchParams } from "react-router-dom";


const statsLimit = 800_000;

const Stats = () => {
    const [total, setTotal] = useState(0);
    const [rrTotDistance, setRRTotDistance] = useState([]);
    const [totBpm, setTotBpm] = useState([]);
    const [lowestBpmValues, setLowestBpmValues] = useState([]);
    const [highestRRValues, setHighestRRValues] = useState([]);
    const [isStatsLoading, setIsStatsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const [statsPage, setStatsPage] = useState(page ?? 1);

    console.warn(page);
    const handleStatsPageChange = (_, value) => setStatsPage(value);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsStatsLoading(true);
                const response2 = await internalFetch(`ecg/instant-stats?id=6454b1565d7883909dd9cb5a&page=${statsPage}&limit=${statsLimit}`, {
                    method: 'GET',
                    includeCredentials: true,
                })
                const {
                    rrIntervals: calculatedRRIntervals,
                    bpm: calculatedBPM,
                    lowestBpmValues: lowestBpmValue,
                    highestRRValues: highestRRInterval,
                    total,
                } = response2.data;
                setTotBpm(calculatedBPM);
                setRRTotDistance(calculatedRRIntervals);
                setLowestBpmValues(lowestBpmValue);
                setHighestRRValues(highestRRInterval);
                setTotal(total)
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
            <Box sx={{ p: 2 }}>Min 5 measures BPM: {lowestBpmValues?.value?.join(",")}</Box>
            <Box sx={{ p: 2 }}>Max 5 measures RR interval: {highestRRValues?.value?.join(",")}</Box>
            <Box sx={{ p: 2 }}>
                <RR label="RR" page={statsPage} rrDistancesMs={rrTotDistance} />
            </Box>
            <Box sx={{ p: 2 }}>
                <RR label="BPM" page={statsPage} rrDistancesMs={totBpm} />
            </Box>
            <Stack spacing={2}>
                <Pagination color="primary" count={Math.ceil(total / statsLimit)} defaultPage={statsPage} variant="outlined" onChange={handleStatsPageChange} />
            </Stack>
            {(isStatsLoading) && <Loader />}
        </div>
    );
};

export default memo(Stats);