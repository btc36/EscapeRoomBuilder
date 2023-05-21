import React from 'react';

export class Audio extends React.Component {
    render() {
        return (
            <div>
                <audio className="audio-element">
                    <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
                </audio>
                <audio className="audio-element-scan-slot">
                    <source src="https://cdn.pixabay.com/download/audio/2022/03/19/audio_b1e725b098.mp3?filename=beep-6-96243.mp3"></source>
                </audio>
                <audio className="audio-element-failure">
                    <source src="https://audio.code.org/failure1.mp3"></source>
                </audio>
                <audio className="audio-element-mi">
                    <source src="https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3"></source>
                </audio>
            </div>
        );
    }
}
