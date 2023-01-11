import { useRef } from "react";
import styles from "./wave.module.css";

interface WaveProps {
  isHome: boolean;
  layer: number;
}

export default function Wave(Props: WaveProps) {
  var backgroundColor: string;
  var color: string;
  const layer: number = Props.layer;

  switch (layer) {
    case 0:
      backgroundColor = "#C2B280";
      color = "#def3f6";
      break;
    case 1:
      backgroundColor = "#def3f6";
      color = "#76b6c4";
      break;
    case 2:
      backgroundColor = "#76b6c4";
      color = "#7fcdff";
      break;
    default:
      backgroundColor = "#FFFFFF";
      break;
  }
  let angle = 0;
  let lastTime = null;

  const Animate = (time: number) => {
    //if last time is not equal to 0
    if (lastTime != null) {
      angle += (time - lastTime) * 0.0005;
    }

    lastTime = time;

    let wave = document.querySelector(`#wave-${CSS.escape(layer.toString())}`);
    let path1 = document.querySelector(`#path1-${CSS.escape(layer.toString())}`);
    let path2 = document.querySelector(`#path2-${CSS.escape(layer.toString())}`);
    let width = window.innerWidth;

    wave.setAttribute("width", width.toString());

    //primary
    path1.setAttribute(
      "d",
      "M0,250 C" +
        width * 0.33 +
        "," +
        (300 + Math.cos(angle + layer) * 350) +
        " " +
        width * 0.75 +
        "," +
        (300 + Math.sin(angle + layer) * 350) +
        " " +
        width +
        ",250 v250 h" +
        -width +
        " Z"
    );

    //secondary
    path2.setAttribute(
      "d",
      "M0,250 C" +
        width * 0.33 +
        "," +
        (300 + Math.cos(angle + (layer + 1)) * 300) +
        " " +
        width * 0.75 +
        "," +
        (300 + Math.sin(angle + (layer + 1)) * 300) +
        " " +
        width +
        ",260 v350 h" +
        -width +
        " Z"
    );

    requestAnimationFrame(Animate);
  };

  if (process.browser) {
    Animate(undefined);
  }


  return (
    <section className={styles.waveContainer} style={{backgroundColor: backgroundColor}}>
        <svg id={`wave-` + layer.toString()} height="500" fill={'white'} color={'red'}>
            <path style={{opacity: '50%'}} fill={'white'} id={`path1-` + layer.toString()} d="" />
            <path fill={color} id={`path2-` + layer.toString()} d="" />
        </svg>
    </section>
  );
}
