import TileClass from "./tileClass";
class GridClass
{
    fullGridModel;
    numDanger;
    numFood;
    seed;
    hiveLocation;
    maxHeight;
    maxWidth;
    constructor(mapOptions)
    {
        this.maxHeight=mapOptions.height;
        this.maxWidth=mapOptions.width;
        this.numDanger=mapOptions.numDanger;
        this.numFood=mapOptions.numFood;
        if(mapOptions.seed)
        {
            this.seed=mapOptions.seed;
        }
        else{
        }
        
        this.fullGridModel=this.generateBaseGridModel(mapOptions.height, mapOptions.width);
        this.gridAddFeatures();
        this.updateBorderExploreTiles(this.fullGridModel);
    }  

    generateBaseGridModel(height, width)
    {
        let workingGrid=[];
            for (let x=0; x<height; x++)
            {
                workingGrid[x]=[];
           
            for (let y=0; y<width; y++)
            {
                workingGrid[x][y]=new TileClass(x, y);
            }
        }
        console.log("working grid", workingGrid);
        return workingGrid;
    }

    gridAddFeatures(numDangers, height, width, numFood)
    {
        if (numDangers> ((height * width)-(numFood+1)))
        {
            return false;
        }
        if (numFood>((height * width)-(numDangers+1)))
        {
            return false;
        }
        let gridAsList = [];
        for (let x in this.fullGridModel)
        {
            for (let y in this.fullGridModel[x])
            {
                if (this.fullGridModel[x][y].feature===false)
                {
                    gridAsList.push({x:x, y:y});
                }
            }
        }
        //have grid as list, going to pop off entries as items are placed
       
        //addHive
        //addFood
        //addDanger
       // console.log("grid as list before adds", gridAsList)
        this.gridAddHive(gridAsList);
        this.gridAddFood(gridAsList);
        this.gridAddDanger(gridAsList);
        //console.log("grid as list after hive", gridAsList);
      //  console.log("full gridmodel after addfeatures", this.fullGridModel);
    }
    gridAddFood(gridAsList)
    {
        for (let i=0; i<this.numFood; i++)
        {
            let tempLoc = Math.floor(Math.random() * gridAsList.length);
          //  console.log("food location " + i + ": " + gridAsList[tempLoc].x, gridAsList[tempLoc].y);
           // console.log(this.fullGridModel[gridAsList[tempLoc].x][gridAsList[tempLoc].y])
            this.fullGridModel[gridAsList[tempLoc].x][gridAsList[tempLoc].y].feature={name:"Food", charges:5};
            gridAsList.splice(tempLoc, 1);
        }
       
    }
    gridAddDanger(gridAsList)
    {
        for (let i=0; i<this.numDanger; i++)
        {
            let tempLoc = Math.floor(Math.random() * gridAsList.length);
         //   console.log("danger location " + i + ": " + gridAsList[tempLoc].x, gridAsList[tempLoc].y);
         //   console.log(this.fullGridModel[gridAsList[tempLoc].x][gridAsList[tempLoc].y])
            this.fullGridModel[gridAsList[tempLoc].x][gridAsList[tempLoc].y].feature={name:"Danger", chance:30};
            gridAsList.splice(tempLoc, 1);
        }
        //console.log("grid as list after danger", gridAsList);
    }
    gridAddHive(gridAsList)
    {
        let hiveLoc = Math.floor(Math.random() * gridAsList.length);
    //    console.log("Hive location", gridAsList[hiveLoc]);
        this.hiveLocation=gridAsList[hiveLoc];
        this.fullGridModel[this.hiveLocation.x][this.hiveLocation.y].feature={name:"Hive"};
        this.fullGridModel[this.hiveLocation.x][this.hiveLocation.y].status="Hive";
        gridAsList.splice(hiveLoc, 1);
        return gridAsList;
    }

    updateBorderExploreTiles(grid)
    {
       let exploredTiles= this.getExploredtiles(grid);

       for (let tile in exploredTiles)
       {
           this.updateExploreNeighbors(exploredTiles[tile], grid);
       }
    }

    updateExploreNeighbors(tile, grid)
    {
        let x=tile.xLoc;
        let y=tile.yLoc;
        if(grid[x-1]?.[y]?.status==="Unexplored")
        {
            grid[x-1][y].status="BorderExplored";
        }
        if(grid[x+1]?.[y]?.status==="Unexplored")
        {
            grid[x+1][y].status="BorderExplored";
        }
        if(grid[x]?.[y-1]?.status==="Unexplored")
        {
            grid[x][y-1].status="BorderExplored";
        }
        if(grid[x]?.[y+1]?.status==="Unexplored")
        {
            grid[x][y+1].status="BorderExplored";
        }
        if(grid[x-1]?.[y-1]?.status==="Unexplored")
        {
            grid[x-1][y-1].status="BorderExplored";
        }
        if(grid[x+1]?.[y-1]?.status==="Unexplored")
        {
            grid[x+1][y-1].status="BorderExplored";
        }
        if(grid[x-1]?.[y+1]?.status==="Unexplored")
        {
            grid[x-1][y+1].status="BorderExplored";
        }
        if(grid[x+1]?.[y+1]?.status==="Unexplored")
        {
            grid[x+1][y+1].status="BorderExplored";
        }
    }

    getExploredtiles(grid)
    {
        let exploredArray=[];
        for(let x in grid)
        {
            for(let y in grid[x])
            {
                if(grid[x][y].status=="Explored" || grid[x][y].status=="Hive")
                {
                    exploredArray.push(grid[x][y]);
                }
            }
        }
        console.log("ExploredArray", exploredArray);
        return exploredArray;
    }

    getFoodTiles(grid)
    {
        let foodTileArray=[];
        for(let x in grid)
        {
            for(let y in grid[x])
            {
                if(grid[x][y].status=="Explored" && grid[x][y].feature.name=="Food" && grid[x][y].feature.charges>0)
                {
                    foodTileArray.push(grid[x][y]);
                }
            }
        }
        console.log("food tile array", foodTileArray);
        return foodTileArray;
    }

    get getHiveLocation()
    {
        return this.hiveLocation;
    }
    set setHiveLocation(newLocation)
    {
        this.hiveLocation=newLocation;
    }
}
export default GridClass;