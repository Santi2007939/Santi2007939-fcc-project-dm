import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import '../style-sheets/drum-machine.css'
import Logo from './Logo';
import logo from '../image/FASG.png';

const DrumMachine = () => {

    const sound = useRef();

    const [title, setTitle] = useState('');
    const [contador, setContador] = useState(0);
    const [power, setPower] = useState(true);
    const [volume, setVolume] = useState(0.5);

    let buttons = [
        {   
            text: 'Q',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'],
            name: ['Heater 1', 'Chord 1']
        },
        {
            text: 'W',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'],
            name: ['Heater 2', 'Chord 2']
        },
        {
            text: 'E',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'],
            name: ['Heater 3', 'Chord 3']
        },
        {
            text: 'A',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'],
            name: ['Heater 4', 'Shaker']
        },
        {
            text: 'S',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'],
            name: ['Clap', 'Open HH']
        },
        {
            text: 'D',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'],
            name: ['Open HH', 'Closed HH']
        },
        {
            text: 'Z',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'],
            name: ['Kick n\' Hat', 'Punchy Kick']
        },
        {
            text: 'X',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'],
            name: ['Kick', 'Side Stick']
        },
        {
            text: 'C',
            src: ['https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'],
            name: ['Closed HH', 'Snare']
        }
    ]
        
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            const letter = e.key.toUpperCase();
            if (power) {
                play(letter);
            }
    }), [volume]});

    function play(id) {
        if (power) {
            const src= document.getElementById(id);
            src.volume = volume;
            src.play();
            setTitle(src.getAttribute('name'));
        } else {
            setTitle('');
        }
    }

    const cambio = () => {
        if (power == true) {
            if (contador == 0) {
                setContador(1);
                setTitle('SmoothPianoKit');
                console.log(contador)
            } else {
                setContador(0);
                setTitle('Heater Kit');
                console.log(contador)
            }
        } else {
            setTitle('')
        }
    }

    const onOff = () => {
        if (power) {
            setPower(false);
            setTitle('');
        } else {
            setPower(true);
        }
    }

    return(
        <div id="drum-machine" className='drum-machine'>
            <div id='drum-pad' className='drum-machine__pad'>
                {buttons.map((button) => 
                    <div onClick={() => {
                        play(button.text, button.name[contador])
                    }}
                    key={button.text} className='drum-pad drum-machine__pad__button' id={button.src[contador]}>
                        {button.text}
                        <audio src={power ? button.src[contador] : '#'} className='clip' id={button.text}
                        name={power ? button.name[contador] : ''}
                        ref={sound}
                        ></audio>
                    </div>
                )}
            </div>
            <Logo img={logo} logoClass='drum-machine__logo' /> 
            
            <div id="drum-control" className='drum-machine__control'>
                <p className='center'>Power</p>
                <div id="drum-power" className=' drum-machine__control__power' onClick={onOff}>
                        <div id='select' className={`drum-machine__control__power__turn ${power ? 'right' : 'left'}`}></div>
                </div>
                <p id="display" style={{textAlign: 'center'}} className='drum-machine__control__display'>
                    {title ? title : '\u00A0'}
                </p>
                
                <div id="drum-volume" className='drum-machine__control__volume'>
                    <input type="range" max='1' min='0' step='0.01' value={volume} onChange={(e)=>{if (power) {setVolume(e.target.value); setTitle(`Volume: ${parseInt(e.target.value * 100)}`), setTimeout(()=> {setTitle('')}, 1000)}}} className='drum-machine__control__volume__target'/>
                </div>
                <p className='center'>Bank</p>
                <div id="drum-bank" className='drum-machine__control__bank'>
                    <div onClick={cambio} className={`drum-machine__control__bank__turn ${contador == 0 ? 'left' : 'right'}`}></div>
                </div>
            </div>
            
        </div>
    )
}

export default DrumMachine;