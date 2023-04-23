import { memo, useState } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { IconSearch } from "@tabler/icons";
import AnimateButton from "ui-component/extended/AnimateButton";

const Macronutrients = () => {
    const theme = useTheme();

    const [carboinput, setCarboinput] = useState("");
    const [proteininput, setProteininput] = useState("");
    const [fatinput, setFatinput] = useState("");

    return (
        <div>
            <h1>Macronutrients</h1>
            <Grid item>
                <Typography
                    fontSize="14px"
                    variant="caption"
                >
                    {`Welcome to our macronutrients recipe generator! Here, you can create the perfect meal plan by inputting your favorite macronutrients. `}
                </Typography>
                <Typography
                    fontSize="14px"
                    variant="caption"
                >
                    {`Whether you're a protein-packed gym junkie or a carb-loving foodie, we've got you covered.
                With our easy-to-use tool, you can customize your meal plan to fit your unique nutritional needs. 
                Input your desired amounts of carbs, proteins, and fats, and voila! You'll receive a list of delicious recipes tailored just for you.
                We believe that eating healthy should be fun, not boring. That's why we've created a recipe generator that's as playful as it is practical. 
                So go ahead and play around with your macronutrient inputs - who knows, you might just discover your new favorite dish!
                Ready to get started? Input your macronutrients now and let the recipe magic begin!`}
                </Typography>
            </Grid>
            <Grid alignItems="center" direction="row" justify="center" spacing={2} container>
                <Grid md={4} item >
                    <InputLabel htmlFor="outlined-adornment-email-register">Fat</InputLabel>
                    <OutlinedInput
                        aria-describedby="search-helper-text"
                        endAdornment={<span>g</span>}
                        id="fat-input"
                        inputProps={{
                            'aria-label': 'weight',
                            'min': 1
                        }}
                        min={1}
                        placeholder="Search profile options"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconSearch color={theme.palette.grey[500]} size="1rem" stroke={1.5} />
                            </InputAdornment>
                        }
                        sx={{
                            pr: 1, pl: 2, my: 2, width: "100%"

                        }}
                        type="number"
                        value={fatinput}
                        onChange={(e) => setFatinput(e.target.value)}
                    />
                </Grid>
                <Grid md={4} item>
                    <InputLabel htmlFor="outlined-adornment-email-register">Carbohydrates</InputLabel>
                    <OutlinedInput
                        aria-describedby="search-helper-text"
                        endAdornment={<span>g</span>}
                        id="carbohydrates-input"
                        inputProps={{
                            'aria-label': 'weight',
                            'min': 1
                        }}
                        min={1}
                        placeholder="Search profile options"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconSearch color={theme.palette.grey[500]} size="1rem" stroke={1.5} />
                            </InputAdornment>
                        }
                        sx={{ flex: '40%', pr: 1, pl: 2, my: 2, width: "100%" }}
                        type="number"
                        value={carboinput}
                        onChange={(e) => setCarboinput(e.target.value)}
                    />
                </Grid>
                <Grid md={4} item>
                    <InputLabel htmlFor="outlined-adornment-email-register">Proteins</InputLabel>
                    <OutlinedInput
                        aria-describedby="search-helper-text"
                        endAdornment={<span>g</span>}
                        id="protein-input"
                        inputProps={{
                            'aria-label': 'weight',
                            'min': 1
                        }}
                        placeholder="Search profile options"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconSearch color={theme.palette.grey[500]} size="1rem" stroke={1.5} />
                            </InputAdornment>
                        }
                        sx={{ flex: '40%', pr: 1, pl: 2, my: 2, width: "100%" }}
                        type="number"
                        value={proteininput}
                        onChange={(e) => setProteininput(e.target.value)}
                    />
                </Grid>
            </Grid>
            <AnimateButton>
                <Button
                    color="secondary"
                    disabled={false}
                    size="large"
                    type="submit"
                    variant="contained"
                    disableElevation
                    fullWidth
                >
                    Generate recipe
                </Button>
            </AnimateButton>
        </div>
    );
}

export default memo(Macronutrients);