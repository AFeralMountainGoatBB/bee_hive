class LogEntryClass
{
    message;
    messageType;
    messagePhase;
    globalLog;
    constructor(message, type, globalLog)
    {
        this.message = message;
        this.type=type;
        this.globalLog=globalLog;
    }

}

export default LogEntryClass