

class LogClass {
    turnLogs = [];
    writtenLogs = [];
    constructor(settings) {

    }

    //added at action
    addToLog(turnNum, turnPhase, logEntry) {
        if (turnLogs[turnNum] === undefined) {
            turnLogs[turnNum] =
            {
                explore: {phase:"Explore", log:[], endGrid: []},
                gather: {phase:"Gather", log:[], endGrid: []},
                sync: {phase:"Sync", log:[], endGrid: []},
            };
        }
        turnNum[turnPhase].log.push(logEntry);
    }

    //added at end of turn in world
    addTurnInfo(turnNum, turnPhase, gridInfo) {
        if (turnLogs[turnNum] === undefined) {
            turnLogs[turnNum] =
            {
                explore: {phase:"Explore", log:[], endGrid: []},
                gather: {phase:"Gather", log:[], endGrid: []},
                sync: {phase:"Sync", log:[], endGrid: []},
            };
        }
        turnNum[turnPhase].endGrid=JSON.parse(JSON.stringify(gridInfo));
    }

}



export default LogClass;