import Button from '@material-ui/core/Button'
import GridTile from './GridTile';

function Grid(props)
{
    const gridModel = props.gridModel;
    let fullModel=gridModel.fullGridModel;

    function getJSXTile(tile)
    {
        let workingJSXTile = <GridTile key={tile.xLoc+"-"+tile.yLoc} 
        numBees={tile.numBees} 
        feature={tile.feature} 
        xLoc={tile.xLoc} 
        yLoc={tile.yLoc}
        status={tile.status}
        deadBees={tile.deadBees}
        />
        return workingJSXTile;
    }

    function generateGrid()
    {
    let gridJSX=[[]];
    let workingKey="";
    //console.log("generating jsx grid for", gridModel);
       for (let x in fullModel)
       {
           let tiles=[];
        for(let y in fullModel[x])
        {
            tiles.push(getJSXTile(fullModel[x][y]))
        }
        gridJSX.push(<div style={{display:'flex'}}>{tiles}</div>)
       }
       return gridJSX;
    }

    return(
        <div>
        {
            generateGrid()
        }
        </div>
    )
}

export default Grid;