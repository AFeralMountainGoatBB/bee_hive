import { EmojiNature, LocalFlorist, Warning } from "@material-ui/icons";
import {ReactComponent as HiveIcon} from '../graphics/hive2.svg';
//import { ReactComponent as HiveIcon } from './your-svg.svg';
//import HiveIcon from "../graphics/hive.png"
import { makeStyles } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon'


function FeatureSymbol(props) {
    let dangerSymbol = "%☠";
    let foodSymbol = "x❁";
    let extraInfo = "";
    let feature = props.feature;

    const classes = makeStyles({
        imageIcon: {
            height: '100%'
        },
        iconRoot: {
            textAlign: 'center'
        }
    });

    function featureIcon(feature) {
        switch (feature.name) {
            case 'Hive':
                return <HiveIcon width="100%" height="100%" />
            case 'Danger':
                return <Warning />;
            case 'Food':
                return <LocalFlorist />;
            default:
                return <div />;
        }
    }

    function featureExtraInfo() {
        switch (feature.name) {
            case 'Danger':
                return feature.chance + dangerSymbol;
            case 'Food':
                return feature.charges + foodSymbol;
            default:
                return "";
        }

    }

    return (<div style={{}}>
        {featureIcon(props.feature)} <div style={{ fontSize: "xx-small", marginTop: "-5px" }}>{featureExtraInfo()}</div>
    </div>)
}

export default FeatureSymbol;