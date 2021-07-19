import LogEntryClass from './logEntryClass';

class BeeClass {
    globalLog;
    memory;
    worldGrid;
    alive = true;
    key = "";
    xLoc;
    yLoc;
    beeId;
    constructor(gridModel, id, log) {
        this.beeId = id;
        this.alive = true;
        this.globalLog=log;
        this.worldGrid = gridModel;
        this.memory = JSON.parse(JSON.stringify(gridModel.fullGridModel));
        this.xLoc = gridModel.hiveLocation.x;
        this.yLoc = gridModel.hiveLocation.y;
        this.worldGrid.fullGridModel[this.xLoc][this.yLoc].addBee();
    }
    copyMemory(model) {
        this.memory = JSON.parse(JSON.stringify(model));
    }

    moveToTile(tile) {
        this.worldGrid.fullGridModel[this.xLoc][this.yLoc].removeBee();
        //move to tile (increment bee on tile), check for danger, if danger, roll for death
        let moveTile = this.worldGrid.fullGridModel[tile.xLoc][tile.yLoc];
        if (moveTile.feature?.name === "Danger") {
            if (Math.floor(Math.random() * 100) <= moveTile.feature.chance) {
                //bee has died
                moveTile.addDeadBee();
                this.globalLog.addToLog(this.beeLog(moveTile, "died on", "Death"));
                return false;
            }
        }
        moveTile.addBee();
        this.globalLog.addToLog(this.beeLog(moveTile, "moved to", "Move"));
        this.xLoc = tile.xLoc;
        this.yLoc = tile.yLoc;
        return true;
    }

    explorePhase(planning, avoidArray) {
        //find tiles to be explored in memory
        let exploreArray = this.findToExplore();
        //remove avoids to if planning is true
        if (planning === true) {
            this.removeAvoids(exploreArray, avoidArray);
        }
        if (exploreArray.length === 0) {
            let startTile = this.worldGrid.fullGridModel[this.xLoc][this.yLoc];
            return startTile;
        }
        //choose randomly from the array
        let tempLoc = Math.floor(Math.random() * exploreArray.length);
        let moveTile = exploreArray[tempLoc];

        //move there
        let success = this.moveToTile(moveTile);
        if (success === false) {
            //bee died, return false
            this.alive = false;
            return false;
        }
        else {
            //update memory
            this.memory[moveTile.xLoc][moveTile.yLoc].status = "Explored";
            this.globalLog.addToLog(this.beeLog(moveTile, "explored", "Explore"));
            this.worldGrid.updateBorderExploreTiles(this.memory);
        }
        //return location where moved
        return moveTile;
    }

    gatherPhase(planning, avoidArray) {
        //find tiles to be explored in memory
        let gatherArray = this.worldGrid.getFoodTiles(this.memory);
        //remove avoids to if planning is true
        if (planning === true) {
        //    console.log("gather array v avoid array", gatherArray, avoidArray);
            this.removeAvoids(gatherArray, avoidArray);
        }
        if (gatherArray.length === 0) {
            let startTile = this.worldGrid.fullGridModel[this.xLoc][this.yLoc];
            return startTile;
        }
        //choose randomly from the array
        let tempLoc = Math.floor(Math.random() * gatherArray.length);
        let moveTile = gatherArray[tempLoc];
        //move there
        let success = this.moveToTile(moveTile);
        if (success === false) {
            this.alive = false;
            return false;
        }
        this.memory[this.xLoc][this.yLoc].feature.charges--;
        this.worldGrid.fullGridModel[this.xLoc][this.yLoc].subtractFood();
        this.globalLog.addToLog(this.beeLog(moveTile, "gathered on", "Gather"));
        //return location where moved
        return moveTile;
    }

    findToExplore() {
        let exploreArray = [];
        for (let x in this.memory) {
            for (let y in this.memory[x]) {
                if (this.memory[x][y].status === "BorderExplored") {
                    exploreArray.push(this.memory[x][y]);
                }
            }
        }
        return exploreArray;
    }

    removeAvoids(exploreArray, avoidArray) {
        for (let avoid in avoidArray) {
            let avoidX = avoidArray[avoid].xLoc;
            let avoidY = avoidArray[avoid].yLoc;
            for (let explore in exploreArray) {
                let exploreX = exploreArray[explore].xLoc;
                let exploreY = exploreArray[explore].yLoc;
                if (avoidX === exploreX && avoidY === exploreY) {
                    //remove by splicing
                    exploreArray.splice(explore, 1);
                }
            }
        }
    }

    beeLog(tile, action, actionType)
    {
        let message = `Bee ${this.beeId} has ${action} tile ${tile.xLoc + tile.yLoc}`
        let type = ["Bee", actionType];
        let phase = this.worldGrid.subTurnCycle[this.worldGrid.subTurnCycleActive];
        let logEntry = new LogEntryClass(message, type, phase);
        return logEntry;
    }

    getMemory() {
        return this.memory;
    }
    updateMemory(memory) {

    }
}

export default BeeClass;