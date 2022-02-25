import styles from './wave.module.css'
import utilStyles from '../styles/utils.module.css'

interface WaveProps {
    color: string,
    layer: number
}

export default function Wave(Props: WaveProps) {

    var backgroundColor;

    switch(Props.layer) {
        case 0:
            backgroundColor = '#C2B280';
            break;
        case 1:
            backgroundColor = '#def3f6';
            break;
        default:
            backgroundColor = '#FFFFFF';
            break;
    }

    return (
    <svg className={styles.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <rect width="100%" height="100%" fill={backgroundColor}></rect>
        <path vectorEffect="non-scaling-stroke" fill={Props.color} fillOpacity="1" d="M0,64L11.4,80C22.9,96,46,128,69,138.7C91.4,149,114,139,137,122.7C160,107,183,85,206,69.3C228.6,53,251,43,274,69.3C297.1,96,320,160,343,160C365.7,160,389,96,411,58.7C434.3,21,457,11,480,48C502.9,85,526,171,549,213.3C571.4,256,594,256,617,224C640,192,663,128,686,96C708.6,64,731,64,754,101.3C777.1,139,800,213,823,218.7C845.7,224,869,160,891,154.7C914.3,149,937,203,960,213.3C982.9,224,1006,192,1029,192C1051.4,192,1074,224,1097,213.3C1120,203,1143,149,1166,154.7C1188.6,160,1211,224,1234,261.3C1257.1,299,1280,309,1303,309.3C1325.7,309,1349,299,1371,282.7C1394.3,267,1417,245,1429,234.7L1440,224L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"></path>
    </svg>
    )
}