

class LogClass {
    turnLogs = [];
    worldClass;
    constructor(worldClass, settings) {
        this.worldClass=worldClass;
        this.turnLogs=[];
    }

    //added at action
    addToLog(logEntry) {
        let turnNum = this.worldClass.turnTracker;
        let turnPhase = this.worldClass.subTurnCycle[this.worldClass.subTurnCycleActive];
        console.log("turnphase", turnPhase)
        if (this.turnLogs[turnNum] === undefined) {
            this.turnLogs[turnNum] =
            {
                Start:{phase:"Start", log:[], endGrid: []},
                Explore: {phase:"Explore", log:[], endGrid: []},
                Gather: {phase:"Gather", log:[], endGrid: []},
                Sync: {phase:"Sync", log:[], endGrid: []},
            };
        }
      //  console.log("Turn logs num", this.turnLogs[turnNum]);
        this.turnLogs[turnNum][turnPhase].log.push(logEntry);
    }

    //added at end of turn in world
    addTurnInfo(gridInfo) {
        let turnNum = this.worldClass.turnTracker;
        let turnPhase = this.worldClass.subTurnCycle[this.worldClass.subTurnCycleActive]
        if (this.turnLogs[turnNum] === undefined) {
            this.turnLogs[turnNum] =
            {
                Start:{phase:"Start", log:[], endGrid: []},
                Explore: {phase:"Explore", log:[], endGrid: []},
                Gather: {phase:"Gather", log:[], endGrid: []},
                Sync: {phase:"Sync", log:[], endGrid: []},
            };
        }
        this.turnLogs[turnNum][turnPhase].endGrid=JSON.parse(JSON.stringify(gridInfo));
    }

}



export default LogClass;