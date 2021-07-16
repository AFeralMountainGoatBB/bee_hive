import GridTile from '../components/GridTile';

class TileClass
{
    feature=false;
    numBees=0;
    xLoc="";
    yLoc="";
    status="Unexplored";
    deadBees=0;

    constructor(x, y)
    {
        this.feature=false;
        this.numBees=0;
        this.xLoc=x;
        this.yLoc=y;
        this.deadBees=0;
    }

    get getFeature()
    {
        return this.feature;
    }
    set setFeature(newFeature)
    {
        this.feature=newFeature;
    }

    get getNumBees()
    {
        return this.numBees;
    }

    set setNumBees(numBees){
        this.numBees=numBees;
    }

    subtractFood()
    {
        if (this.feature.charges>0)
        this.feature.charges--;
    }

    addBee()
    {
        this.numBees++;
    }
    removeBee()
    {
        if(this.numBees>0)
        this.numBees--;
    }
    addDeadBee()
    {
        this.deadBees++;
    }
    getNumBees()
    {
        return this.numBees;
    }
    
    
}

export default TileClass