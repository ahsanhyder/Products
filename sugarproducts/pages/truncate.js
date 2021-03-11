import React, {useState} from 'react'
import Truncate from 'react-truncate';
import styles from '../styles/Products.module.css'
export default function truncate(props) {
    console.log(props.data)
    const [ rmore, setrmore ] = useState(false);
    // const [ truncate, settruncate ] = useState(false);
    const [ rtruncate, setrtruncate ] = useState(false);

    const handlermore = () => {
        setrmore(!rmore);
    };
 
    const handlertruncate = (truncated) => {
        if (rtruncate !== truncated) {
            setrtruncate(truncated);
        }
    };
    return (
        <div>
            {props && props.data &&
             <div>
                                    <div className={`container-fluid p-3 mb-1 shadow ${styles.description2}`}>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className={styles.headingMain}>{props.data && props.data.title.toUpperCase()}</h6>
                                        </div>
                                    </div>
                                    <Truncate
                            lines={!rmore && 3}
                            ellipsis={
                                <span className={styles.readmore} onClick={handlermore}>
                                    <strong style={{color: '#DB7093', paddingLeft:"15px"}}>+more</strong>
                                </span>
                            }
                            onTruncate={handlertruncate}
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: [ props.data && props.data.msg] }}

                            />
                        </Truncate>
                      {!rtruncate &&
                        rmore && (
                            <span className={styles.readmore} onClick={handlermore}>
                                <strong style={{color: '#DB7093', paddingLeft:"15px"}}>-less</strong>
                            </span>
                        )}      
                        </div>
                                    </div>
}
        </div>
    )
}
