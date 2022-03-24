import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Turntable from './turntable';
import styles from './record.module.css'



export default function Record() {
    const svgString = encodeURIComponent(renderToStaticMarkup(<Turntable />));

  return(
      <svg className={styles.turntable} style={{backgroundImage: `url("data:image/svg+xml,${svgString}")`}} viewBox="0 0 400 400">
        <g className={styles.record}>
          <circle className={styles.disk} r="180" cx="200" cy="200" />
          <circle className={styles.line} r="160" cx="200" cy="200" />
          <circle className={styles.line} r="140" cx="200" cy="200" />
          <circle className={styles.line} r="120" cx="200" cy="200" />
          <circle className={styles.label} cx="200" cy="200" r="55" />
          <text y="180" x="187">AA</text>  
          <text y="235" x="187">BB</text>    
          <circle fill='silver' id="dot" cx="200" cy="200" r="6" />
        </g>
      </svg>
  );
}