// Audio helpers

import Assets from './assets';

let GameAudio = {};

GameAudio.play_sound = function(sound_alias, volume = 1.0) {
    let sound = Assets.sound_get(sound_alias);
    if(sound.is_ready) {
        sound.volume = volume;
        if(sound.paused === false) {
            sound.pause();
            sound.currentTime = 0;
        }
        sound.play();
    }
}

GameAudio.play_music = function(music_alias, volume = 1.0) {
    let music = assets.sound_get(music_alias);
    if(sound.is_ready) {
        sound.loop = true;
        sound.volume = volume;
        sound.play();
    }
}

export default GameAudio;