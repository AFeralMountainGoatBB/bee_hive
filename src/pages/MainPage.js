import Grid from '../components/GridComponent.js'
import Button from '@material-ui/core/Button'
import React, { useState, useRef } from 'react';
import WorldClass from '../dataClasses/worldClass.js';
import OptionsController from '../components/OptionsController.js';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import EndDialog from '../components/EndDialog.js';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function MainPage() {
  const classes = useStyles();
  const [gridModel, setGridModel] = useState();
  const gridModelRef = useRef(gridModel);
  const [worldModel, setWorldModel] = useState();
  const worldModelRef = useRef(worldModel);
  const [turnDisplay, setTurnDisplay] = useState();
  const turnDisplayRef = useRef(turnDisplay);
  
  const [timerInterval, setTimerInterval]=useState([]);
  const timerIntervalRef = useRef(timerInterval);

  //settings are for setting up world variables
  const [settingsState, setSettingsState] = useState(
    {
      height: 10,
      width: 10,
      numDanger: 3,
      numFood: 3,
      seed: "Random",
      numBees:3,
      planning:true,
      syncing:true
    }
  );

  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const toggleDrawer = (open) => () => {
    setDrawerState({ ...drawerState, "left": open });
  };

  function updateTurnDisplay(newState) {
    turnDisplayRef.current = newState;
    setTurnDisplay(newState);
  }

  function updateGridModel(newState) {
    gridModelRef.current = newState;
    setGridModel(newState);
  }

  function updateWorldModel(newState) {
    worldModelRef.current = newState;
    setWorldModel(newState);
  }

  const getSettings = (data) =>
  {
    //console.log("data from settings", data);
    setSettingsState(data);
  }

  function generateWorld() {
    console.log("settings for gen", settingsState);
    //get options and group them when controls exist
    if (settingsState.seed == "Random" || !settingsState.seed)
    {
      settingsState.seed = Math.floor(Math.random() * 999999999);
    }
    let mapOptions = {
      height: settingsState.height,
      width: settingsState.width,
      numDanger: settingsState.numDanger,
      numFood: settingsState.numFood,
      seed: settingsState.seed
    }
    let gameplayOptions = {
      numBees: settingsState.numBees,
      planning:true,
      syncing:true
    }
    updateWorldModel(new WorldClass(mapOptions, gameplayOptions));
  }

  function advanceTurn() {
    console.log("advancing turn");
    if (!worldModelRef.current.endCase)
    {
          worldModelRef?.current?.advanceTurn();
    //console.log(worldModel.turnDisplay);
    updateTurnDisplay(worldModelRef?.current?.turnDisplay);
    }
    else
    {
      stopTimer();
    }
  }

  function autoRunToggle()
  { 
    if(timerIntervalRef.current.length<1)
    {
      timerIntervalRef.current.push(setInterval(advanceTurn,1000));
    }
    else
    {
      stopTimer();
    }
  }

  function stopTimer()
  {
    for (let interval in timerIntervalRef.current)
      {
      clearInterval(timerIntervalRef.current[interval]);
      timerIntervalRef.current.pop(interval);
      }
  }

  function resetWorld()
  {
    stopTimer();
    generateWorld();
  }

  return (
    <div>
      <div>
        {(worldModel) ?
          <div >
            <p>{worldModel.turnDisplay}</p>
            <Grid gridModel={worldModel.displayGrid} />
            <Button style={{color:"white"}} onClick={() => advanceTurn()}>Advance Turn</Button>
            <Button style={{color:"white"}} onClick={autoRunToggle}>Toggle AutoRun</Button>
            <Slider
          defaultValue={worldModel.turnTracker}
         // getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={10}
         // marks={this.globalLog.sliderValues}
          valueLabelDisplay="auto"
      />
          </div> :
          <Button style={{color:"white"}} onClick={() => generateWorld()}>Generate World</Button>}
      </div>
      {(worldModel?.endCase)? <EndDialog open={true} endCase={worldModel.endCase}/> : <div/>}
      <Button style={{color:"white"}} onClick={toggleDrawer(true)}>{"Settings"}</Button>
      <Drawer open={drawerState['left']} onClose={toggleDrawer(false)}>
        {<div>
          <OptionsController getSettings={getSettings} settings={settingsState}/>
          <Button style={{color:"white"}} onClick={toggleDrawer(false)} >Close Settings</Button>
        </div>}
      </Drawer>
      <Button style={{color:"white"}} onClick={()=>resetWorld()}>Reset</Button>
    </div>

  )
}

export default MainPage;