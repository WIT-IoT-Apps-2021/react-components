import { InputAdornment, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMagnetometerData } from '../microbit/microbitSlice';
import axios from 'axios';
import cfg from '../../config.json';

export function Audio(props: any) {
    const magnetometerData = useSelector(selectMagnetometerData);
    console.log(`${cfg.server_url}/save_to_db`)

    useEffect(() => {
        setTimeout(function () {
            axios.post(`${cfg.server_url}/save_to_db`, { "gesture_name": 'foot_pos', "fields": { "magnetometerX": magnetometerData.x, "magnetometerY": magnetometerData.y, "magnetometerZ": magnetometerData.z } }).then((res) => {
                return (res.data['weightsManifest']);
            }).catch((err) => { return err; });
        }, 1000);

        let media = document.getElementById('mediaPlayer')

        if (magnetometerData.x > 0) {
            // @ts-ignore
            media.playbackRate = 1.0
        } else {
            // @ts-ignore
            media.playbackRate = 0.5
        }

        console.log(magnetometerData)
    }, [magnetometerData])

    return (
        <div>
            {/* <AudioStatus /> */}
            <h1>Threashold Audio</h1>
            <audio id="mediaPlayer" src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3" controls loop />
            <br />
            <TextField
                id="standard-start-adornment"
                InputProps={{
                    startAdornment: <InputAdornment position="start">X:</InputAdornment>,
                }}
                disabled
                value={magnetometerData.x}
            // onChange={this.handleChange}
            />
            <TextField
                id="standard-start-adornment"
                InputProps={{
                    startAdornment: <InputAdornment position="start">Y:</InputAdornment>,
                }}
                disabled
                value={magnetometerData.y}
            />
            <TextField
                id="standad-start-adornment"
                InputProps={{
                    startAdornment: <InputAdornment position="start">Z:</InputAdornment>,
                }}
                disabled
                value={magnetometerData.z}
            />
        </div>
    );
}