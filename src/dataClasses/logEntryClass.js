class LogEntryClass
{
    message;
    messageType;
    messagePhase;
    constructor(message, type, phase)
    {
        this.message = message;
        this.type=type;
        this.phase=phase;
    }

}

export default LogEntryClass