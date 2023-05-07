import { memo, useState } from "react";
import {
    Box,
    InputLabel,
    Button,
    OutlinedInput,
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Loader from "ui-component/Loader";
import internalFetch from 'utils/fetch';


const AddECG = () => {
    const [date, setDate] = useState(null);
    const [isLoading] = useState(false);
    const [frequency, setFrequency] = useState(null);

    const handleChange = (event) => setDate(event.target.value);
    const handleFrequency = (event) => setFrequency(event.target.value);

    const handleSubmit = async () => {
        await internalFetch(`ecg/save`, {
            method: 'POST',
            includeCredentials: true,
            body: {
                date,
                frequency,
            }
        });
    };

    return (
        <div>
            <Box sx={{ p: 2 }}>
                <InputLabel htmlFor="outlined-adornment-date">ECG Date</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-date"
                    inputProps={{}}
                    name="email"
                    type="datetime-local"
                    value={date}
                    onChange={handleChange}
                />
                <InputLabel htmlFor="outlined-adornment-frequency">Frequency</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-frequency"
                    inputProps={{}}
                    name="frequency"
                    type="text"
                    value={frequency}
                    onChange={handleFrequency}
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <AnimateButton>
                    <Button
                        color="secondary"
                        disabled={!date}
                        size="large"
                        type="submit"
                        variant="contained"
                        disableElevation
                        onClick={handleSubmit}
                    >
                        Upload ECG
                    </Button>
                </AnimateButton>
            </Box>
            {isLoading && <Loader />}
        </div>
    );
};

export default memo(AddECG);