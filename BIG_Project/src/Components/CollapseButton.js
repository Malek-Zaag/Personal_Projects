import { Typography } from '@mui/material'
import React from 'react'
import styles from './Style.module.css'

const CollapseButton = () => {

    return (

        <div className={styles.dropdown}>
            <div className={styles.dropbtn}>Shop</div>
            <div className={styles.dropdowncontent}>
                <Typography variant='body1' fontWeight="bold" fontFamily="Fredoka">
                    <div className={styles.dropdwonstyle}>
                        <a href="/electricguitars">Electric Guitars</a>
                        <a href="/acousticguitars">Acoustic Guitars</a>
                        <a href="/bassguitars">Bass Guitars</a>
                        <a href="/drums">Drums</a>
                        <a href="/pianos">Piaons & Keyboards</a>
                        <a href="/djequipment">DJ Equipment</a>
                    </div>
                </Typography>
            </div>
        </div>
    )
}

export default CollapseButton