import GridClass from "./gridClass";
import HiveClass from './hiveClass';
import LogClass from './logClass'

class WorldClass{
    hive;
    globalLog;
    worldGrid;
    gameplayOptions;
    turnDisplay;
    turnTracker=0;
    subTurnCycle=[
        "Start",
        "Explore",
        "Sync",
        "Gather"
    ];
    endCase=false;
    subTurnCycleActive=0;
    constructor(mapOptions, gameplayOptions)
    {
        this.globalLog = new LogClass(this);
        //create grid
        this.worldGrid=new GridClass(mapOptions);
        //create hive based on grid locations
        this.hive=new HiveClass(this.worldGrid.hiveLocation, gameplayOptions.numBees, this.worldGrid, this.globalLog);
        this.gameplayOptions=gameplayOptions;
        this.turnDisplay=this.updateTurnDisplay();
    }

    advanceTurn()
    {
        //figure out what is next turn, then update display and then execute turn
        this.subTurnCycleActive++;
        if(this.subTurnCycleActive==this.subTurnCycle.length)
        {
            this.turnTracker++;
            this.subTurnCycleActive-=this.subTurnCycle.length;
        }
        this.turnDisplay=this.updateTurnDisplay();
        console.log("New turn display", this.turnDisplay);
        //determine turn in switch and execute
        this.executeTurn(this.subTurnCycle[this.subTurnCycleActive]);
     //   this.updateFunctions.updateDisplay(this.turnDisplay);
        //execute turn
    }
    updateTurnDisplay()
    {
        let workingDisplay ="Turn: "
        workingDisplay+=this.turnTracker + ", " + this.subTurnCycle[this.subTurnCycleActive];
        return workingDisplay;
    }
    
    executeTurn(stage)
    {
        switch(stage)
        {
            case "Start":
            this.startStage();
            break;
            case "Explore":
                this.exploreStage();
                break;
            case "Sync":
                this.syncStage();
                break;
            case "Gather":
                this.gatherStage();
                break;
            default:
                console.log("incorrect stage");
        }
    }

    startStage()
    {   //check for endgame statuses
        //end cases is if all bees are dead (failure), or bees have explored world entirely (success)
        this.endCase = this.checkEndCases();
        if (this.endCase !== false) {
            console.log("endCase", this.endCase);
            console.log("Log at end", this.globalLog);
        }
        this.hive.startPhase();
    }

    exploreStage()
    {
        this.hive.explorePhase();        
        this.worldGrid.updateBorderExploreTiles(this.worldGrid.fullGridModel);
     //   console.log("startStage complete", this.worldGrid);
    }
    gatherStage()
    {
        this.hive.gatherPhase();
    }
    syncStage()
    {
        this.hive.syncPhase();
    }

    checkEndCases() {
        if (!this.checkBeeLife()) {
            return "Bee Death";
        }
        for (let x in this.worldGrid.fullGridModel) {
            for (let y in this.worldGrid.fullGridModel[x]) {
                if (this.worldGrid.fullGridModel[x][y].status === "Unexplored" || this.worldGrid.fullGridModel[x][y].status === "BorderExplored") {
                    //false, bees have more to explore
                    return false;
                }
            }
        }
        //bees have won
        return "Bee victory";
    }
    checkBeeLife() {
        //check if any bees are alive
        for (let bee in this.hive.beeArray) {
            if (this.hive.beeArray[bee].alive) {
                return true;
            }
        }
        return false;
    }
}


export default WorldClass;