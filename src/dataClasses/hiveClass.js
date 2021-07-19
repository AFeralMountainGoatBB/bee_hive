import BeeClass from "./beeClass";

class HiveClass {
    location = "";
    globalLog;
    numBees;
    beeArray = [];
    unexploredTileArray = [];
    worldGrid = "";
    sharingMemory = true;
    planning = true;
    hiveMemory;

    constructor(location, numBees, gridClass, log) {
        this.globalLog=log;
        this.location = location;
        this.numBees = numBees;
        this.worldGrid = gridClass;
        this.hiveMemory = gridClass;
        this.generateBees();
    }

    generateBees() {
        for (let i = 0; i < this.numBees; i++) {
            this.beeArray.push(new BeeClass(this.worldGrid, i, this.globalLog));
        }

    }

    startPhase() {
        //move bees back to hive in preparation for explore phase
        for (let bee in this.beeArray) {
            if (this.beeArray[bee].alive) {
                this.beeArray[bee].moveToTile(this.worldGrid.fullGridModel[this.location.x][this.location.y]);
            }
        }
    }

    explorePhase() {
        /*bees look at their "memory" and select randomly from the list of explorable
         tiles, if planning is on, then the tile is removed from other group lists as well
         preventing bee overlap*/
        let avoidTiles = [];
        for (let bee in this.beeArray) {
            // console.log('bee array', this.beeArray[bee])
            if (this.beeArray[bee].alive === true) {
                let moveTile = (this.beeArray[bee].explorePhase(this.planning, avoidTiles));
                if (this.planning === true) {
                    if (moveTile != false)
                        avoidTiles.push(moveTile);
                }
            }
        }
        //update gridmodel
        // console.log("avoidTiles", avoidTiles);
        for (let tile in avoidTiles) {
            this.worldGrid.fullGridModel[avoidTiles[tile].xLoc][avoidTiles[tile].yLoc].status = "Explored";
        }
        this.globalLog.addTurnInfo(this.worldGrid.turnTracker, this.worldGrid.subTurnCycle[this.worldGrid.subTurnCycleActive])
    }

    gatherPhase() {
        //get all food sources discovered in each bee
        let avoidTiles = [];
        for (let bee in this.beeArray) {
            if (this.beeArray[bee].alive) {
                let gatherTile = this.beeArray[bee].gatherPhase(this.planning, avoidTiles);
              //  console.log("gathertile", gatherTile);
                if (gatherTile.feature.charges < 1) {
                  //  console.log("this tile is empty of food", gatherTile);
                    avoidTiles.push(gatherTile);
                }
            }
        }
    }

    syncPhase() {
        //move bees back to hive, then if sync is on, sync memories
        for (let bee in this.beeArray) {
            if (this.beeArray[bee].alive) {
                this.beeArray[bee].moveToTile(this.worldGrid.fullGridModel[this.location.x][this.location.y]);
            }
        }
        if (this.sharingMemory) {
            this.syncBeeMemories();
        }
    }


    syncBeeMemories() {
        //get new memories from bees, then push new hive memory to bees
        let beesSynced = [];
        for (let bee in this.beeArray) {
            //check if bee is alive before taking memory
            if (this.beeArray[bee].alive === true) {
                let tempMemory = this.beeArray[bee].getMemory();
                this.syncToHiveMemory(tempMemory);
                beesSynced.push(this.beeArray[bee].beeId);
            }
        }
        this.globalLog.addToLog(beesSynced)
     
        if (this.sharingMemory) {
            this.beeArray.map(bee => this.syncToBeeMemory(bee))
        }
    }

    syncLog(beeIds)
    {
        return `Bees ${beeIds} have had their memories synced`;
    }

    syncToHiveMemory(memory) {
     //   console.log("memory in syncToHiveMemory", memory)
        for (let x in memory) {
            for (let y in memory[x]) {
                if (memory[x][y].status === "Explored") {
         //           console.log("hive memory in sync", this.hiveMemory);
                    this.hiveMemory.fullGridModel[x][y].status = "Explored";
                }
            }
        }
    }
    syncToBeeMemory(bee) {
        bee.copyMemory(this.hiveMemory.fullGridModel);
    }
}

export default HiveClass;