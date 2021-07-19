import { BorderColor, EmojiNature, LocalFlorist, PinDropSharp, Warning } from "@material-ui/icons";
import { height } from "@material-ui/system";
import FeatureSymbol from "./FeatureSymbol";


function GridTile(props)
{
    let numBees = props.numBees;
    let feature = props.feature;
    let location = props.xLoc +", "+props.yLoc;
    let beeFont="x𓆤";
    let beeDead = "x☠";
    let status=props.status;
    let deadBees=props.deadBees;

    const styles = {
        parentDiv:
        {
            position:'relative',
            display:"flex", 
            height:'50px',
            width:'50px', 
            borderStyle:"solid", 
            borderWidth:"1px", 
            fontSize:"small"
        },
        beeDiv:
        {
            position:"absolute",
            top:0,
            right:0,
            fontSize:"x-small"
        },
        featureDiv:
        {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        },
        locationDiv:
        {
            position:"absolute",
            fontSize:"xx-small",
            left:0,
            bottom:0
        },
        deadBeeDiv:
        {
            position:"absolute",
            fontSize:"xx-small",
            right:0,
            bottom:0
        }
    };

    function getParentStyle()
    {
       let style = styles.parentDiv;
        switch(status)
        {            
            case "Hive":
                style.borderColor="Yellow";
                style.backgroundColor="	#CC9900";
                break;            
            case "BorderExplored":
                style.borderColor="Blue";
                style.backgroundColor="Green";
                break;
            case "Unexplored":
                style.borderColor="Blue";
                break;
            case "Explored":
                style.borderColor="White";
                style.backgroundColor="Grey";
                break;
        }
        return style;
    }

    return(
    <div key={location} style={getParentStyle()}>
        {numBees>0 ? <div style={styles.beeDiv}>{numBees+beeFont}</div> : <div/> }
        {<div style={styles.featureDiv}><FeatureSymbol feature={props.feature} /></div>}
        {<div style={styles.locationDiv}>{location}</div>}
        {deadBees>0 ? <div style={styles.deadBeeDiv}>{deadBees+beeDead}</div>: <div/>}
    </div>);
}

export default GridTile;