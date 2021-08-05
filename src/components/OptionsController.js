import {Switch, FormControlLabel, FormControl, TextField, Button } from "@material-ui/core";
import React, { useState } from 'react';

function OptionsController(props) {
    const [options, setOptions] = useState(props.settings     
    );
    const styles=
    {
        controlPanel:{
            paddingTop:"20px",
            backgroundColor:"White",
            boxShadow: "10px 10px 5px black",
            borderRadius:"20px",
            borderColor:"Black",
            borderWidth:"2px"
        }
    }

    function toggleSwitch(event) {
        console.log(event.target.name)
        setOptions({ ...options, [event.target.name]: event.target.checked });
    }

    function readSettings()
    {
        console.log("settings", options);
    }

    function handleOptionsChange(event)
    {
       setOptions({...options, [event.target.name]:parseInt(event.target.value)});
       props.getSettings({...options,[event.target.name]:parseInt(event.target.value)});
    }


    return (
        <div style={{margin:"10px"}}>
            <p>Settings:</p>
        <FormControl>
        <div>
        <TextField
        style={{margin:"10px"}}
          required
          id="seedInput"
          label="RNG seed"
          defaultValue={props.settings.seed}
          variant="outlined"
          onChange={handleOptionsChange}
          name="seed"
          autoComplete='off'
        />
        </div>
            <div>
        <TextField
        style={{margin:"10px"}}
          required
          id="foodInput"
          label="Food Instances"
          defaultValue={props.settings.numFood}
          variant="outlined"
          onChange={handleOptionsChange}
          name="numFood"
          autoComplete='off'
        />
        </div>
        <div style={{margin:"10px"}}>
        <TextField
          id="dangerInput"
          label="Danger Instances"
          defaultValue={props.settings.numDanger}
          variant="outlined"
          name="numDanger"
          onChange={handleOptionsChange}
          autoComplete='off'
        />
        </div>
        <div style={{margin:"10px"}}>
        <TextField
          id="beeInput"
          label="Number of Bees"
          defaultValue={props.settings.numBees}
          variant="outlined"
          name="numBees"
          onChange={handleOptionsChange}
          autoComplete='off'
        />
        </div>
        <div style={{ margin:"10px"}}>
            <TextField
          required
          id="heightInput"
          label="Map Height"
          defaultValue={props.settings.height}
          variant="outlined"
          onChange={handleOptionsChange}
          name="height"
          autoComplete='off'
        />
        </div>
        <div style={{margin:"10px"}}>
        <TextField
            required
          id="widthInput"
          defaultValue={props.settings.width}
          label="Map Width"
          variant="outlined"
          onChange={handleOptionsChange}
          name="width"
          autoComplete='off'
        />
        </div>
        <div style={{color:"black"}}>
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.settings.syncing}
                            onChange={toggleSwitch}
                            name="sharing"
                            color="primary"
                        />
                    }
                    label="Information Sharing"
                /></div> <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.settings.planning}
                            onChange={toggleSwitch}
                            name="planning"
                            color="primary"
                        />
                    }
                    label="Planning"
                />
                </div>
                </div> 
                
            </FormControl>
           
        </div>
        
    )
}
export default OptionsController;