import {EmojiNature, LocalFlorist, Warning } from "@material-ui/icons";

function FeatureSymbol(props)
{
    let dangerSymbol="%☠";
    let foodSymbol="x❁";
    let extraInfo="";
    let feature=props.feature;
    function featureIcon(feature)
    {
        switch(feature.name)
        {
            case 'Hive':
                return <EmojiNature/>;
            case 'Danger':
                return <Warning/>;
            case 'Food':
                return <LocalFlorist/>;
            default:
                return <div/>;
        }
    }

    function featureExtraInfo()
    {
        switch(feature.name)
        {
            case 'Danger':
                return feature.chance+dangerSymbol;
            case 'Food':
                return feature.charges+foodSymbol;
            default:
                return "";
        }
        
    }

    return (<div style={{}}>
        {featureIcon(props.feature)} <div style={{fontSize:"xx-small", marginTop:"-5px"}}>{featureExtraInfo()}</div>
    </div>)
}

export default FeatureSymbol;