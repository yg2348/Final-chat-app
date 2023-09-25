let context = new AudioContext();
let freqs = [];
let tones = [];
let gains = [];

let octave = 0;

var isListening = false;

var socket = io.connect();
			
socket.on('connect', function() {
    console.log("Connected");
});

socket.on('musicmessage', function (data) {
    if(isListening) {
        if(data.on == true) {
            addOscillator(data.freq);
        } else {
            removeOscillator(data.freq);
        }
        
    }
})

window.onload = () => {

    document.body.addEventListener('click', function() {
        isListening = !isListening;
        if(isListening) {
            document.body.style.backgroundColor = 'black';
            
        } else {
            document.body.style.backgroundColor = 'white';
        }
        freqs = [];
        tones = [];
        gains = [];

        for (let gain of gains) {
            gain.gain.setTargetAtTime(0, context.currentTime, 0.015);
          }

    })

    let cKey= document.getElementById('c-key');
    let dKey= document.getElementById('d-key');
    let eKey= document.getElementById('e-key');
    let fKey= document.getElementById('f-key');
    let gKey= document.getElementById('g-key');
    let aKey= document.getElementById('a-key');
    let bKey= document.getElementById('b-key');
    let c2Key= document.getElementById('c2-key');
    let dbKey= document.getElementById('db-key');
    let ebKey= document.getElementById('eb-key');
    let gbKey= document.getElementById('gb-key');
    let abKey= document.getElementById('ab-key');
    let bbKey= document.getElementById('bb-key');

    document.body.addEventListener('keydown', function(ev) {
        if(isListening) return;
        if(ev.key === "a") { // c3
            if(!freqs.includes(130.8 * (2 ** octave))) freqs.push(130.8 * (2 ** octave));
            socket.emit('musicmessage', {freq: 130.8 * (2 ** octave), on: true});
            cKey.style.backgroundColor='rgb(200,200,200)';
        }
        if(ev.key === "s") { // d3
            if(!freqs.includes(146.8 * (2 ** octave))) freqs.push(146.8 * (2 ** octave));
            socket.emit('musicmessage', {freq: 146.8 * (2 ** octave), on: true});
            dKey.style.backgroundColor='rgb(200,200,200)';
        }
        if(ev.key === "d") { // e3
            if(!freqs.includes(164.8 * (2 ** octave))) freqs.push(164.8 * (2 ** octave));
            socket.emit('musicmessage', {freq: 164.8 * (2 ** octave), on: true});
            eKey.style.backgroundColor='rgb(200,200,200)';
        } 
        if(ev.key === "f") { // f3
            if(!freqs.includes(174.6 * (2 ** octave))) freqs.push(174.6 * (2 ** octave));
            socket.emit('musicmessage', {freq: 174.6 * (2 ** octave), on: true});
            fKey.style.backgroundColor='rgb(200,200,200)';
        }
        if(ev.key === "g") { // g3
            if(!freqs.includes(196.0 * (2 ** octave))) freqs.push(196.0 * (2 ** octave));
            socket.emit('musicmessage', {freq: 196.0 * (2 ** octave), on: true});
            gKey.style.backgroundColor='rgb(200,200,200)';
        }
        if(ev.key === "h") { // a3
            if(!freqs.includes(220.0 * (2 ** octave))) freqs.push(220.0 * (2 ** octave))
            socket.emit('musicmessage', {freq: 220.0 * (2 ** octave), on: true});
            aKey.style.backgroundColor='rgb(200,200,200)';
        }
        if(ev.key === "j") { // b3
            if(!freqs.includes(246.9 * (2 ** octave))) freqs.push(246.9 * (2 ** octave))
            socket.emit('musicmessage', {freq: 246.9 * (2 ** octave), on: true});
            bKey.style.backgroundColor='rgb(200,200,200)';
        }
        if(ev.key === "k") { // c4
            if(!freqs.includes(261.6 * (2 ** octave))) freqs.push(261.6 * (2 ** octave))
            socket.emit('musicmessage', {freq: 261.6 * (2 ** octave), on: true});
            c2Key.style.backgroundColor='rgb(200,200,200)';
        } 
        if(ev.key === "w") { // c#3 / db3
            if(!freqs.includes(138.6 * (2 ** octave))) freqs.push(138.6 * (2 ** octave))
            socket.emit('musicmessage', {freq: 138.6 * (2 ** octave), on: true});
            dbKey.style.backgroundColor='black';
        } 
        if(ev.key === "e") { // d#3 / eb3
            if(!freqs.includes(155.6 * (2 ** octave))) freqs.push(155.6 * (2 ** octave))
            socket.emit('musicmessage', {freq: 155.6 * (2 ** octave), on: true});
            ebKey.style.backgroundColor='black';
        } 
        if(ev.key === "t") { // f#3 / gb3
            if(!freqs.includes(185.0 * (2 ** octave))) freqs.push(185.0 * (2 ** octave))
            socket.emit('musicmessage', {freq: 185.0 * (2 ** octave), on: true});
            gbKey.style.backgroundColor='black';
        }  
        if(ev.key === "y") { // g#3 / ab3
            if(!freqs.includes(207.7 * (2 ** octave))) freqs.push(207.7 * (2 ** octave))
            socket.emit('musicmessage', {freq: 207.7 * (2 ** octave), on: true});
            abKey.style.backgroundColor='black';
        }  
        if(ev.key === "u") { // a#3 / bb3
            if(!freqs.includes(233.1 * (2 ** octave))) freqs.push(233.1 * (2 ** octave))
            socket.emit('musicmessage', {freq: 233.1 * (2 ** octave), on: true});
            bbKey.style.backgroundColor='black';
        }
        if(ev.key === "ArrowUp") {
            octave++;
            console.log(freqs);
            for(let i = 0; i < freqs.length; i++) {
                socket.emit('musicmessage', {freq: freqs[i], on: false});
                freqs[i] *= 2;
                socket.emit('musicmessage', {freq: freqs[i], on: true});
            }
        }
        if(ev.key === "ArrowDown") {
            octave--;
            console.log(octave);
            for(let i = 0; i < freqs.length; i++) {
                socket.emit('musicmessage', {freq: freqs[i], on: false});
                freqs[i] /= 2;
                socket.emit('musicmessage', {freq: freqs[i], on: true});
            }
        }
    });
    document.body.addEventListener('keyup', function(ev) {
        if(ev.key === "a") { // c3
            let index = freqs.indexOf(130.8 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 130.8 * (2 ** octave), on: false});
            cKey.style.backgroundColor = 'transparent';
        } 
        if(ev.key === "s") { // d3
            let index = freqs.indexOf(146.8 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 146.8 * (2 ** octave), on: false});
            dKey.style.backgroundColor = 'transparent';
        }
        if(ev.key === "d") { // e3
            let index = freqs.indexOf(164.8 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 164.8 * (2 ** octave), on: false});
            eKey.style.backgroundColor = 'transparent';
        }
        if(ev.key === "f") { // f3
            let index = freqs.indexOf(174.6 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 174.6 * (2 ** octave), on: false});
            fKey.style.backgroundColor = 'transparent';
        }
        if(ev.key === "g") { // g3
            let index = freqs.indexOf(196 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 196.0 * (2 ** octave), on: false});
            gKey.style.backgroundColor = 'transparent';
        }
        if(ev.key === "h") { // a3
            let index = freqs.indexOf(220 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 220.0 * (2 ** octave), on: false});
            aKey.style.backgroundColor = 'transparent';
        }
        if(ev.key === "j") { // b3
            let index = freqs.indexOf(246.9 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 246.9 * (2 ** octave), on: false});
            bKey.style.backgroundColor = 'transparent';
        }
        if(ev.key === "k") { // c4
            let index = freqs.indexOf(261.6 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 261.6 * (2 ** octave), on: false});
            c2Key.style.backgroundColor = 'transparent';
        }
        if(ev.key === "w") { // c#3 / db3
            let index = freqs.indexOf(138.6 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 138.6 * (2 ** octave), on: false});
            dbKey.style.backgroundColor = 'rgb(34,34,34)';
        }
        if(ev.key === "e") { // d#3 / eb3
            let index = freqs.indexOf(155.6 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 155.6 * (2 ** octave), on: false});
            ebKey.style.backgroundColor = 'rgb(34,34,34)';
        }
        if(ev.key === "t") { // f#3 / gb3
            let index = freqs.indexOf(185.0 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 185.0 * (2 ** octave), on: false});
            gbKey.style.backgroundColor = 'rgb(34,34,34)';
        }
        if(ev.key === "y") { // g#3 / ab3
            let index = freqs.indexOf(207.7 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 207.7 * (2 ** octave), on: false});
            abKey.style.backgroundColor = 'rgb(34,34,34)';
        }
        if(ev.key === "u") { // a#3 / bb3
            let index = freqs.indexOf(233.1 * (2 ** octave));
            if(index > -1) freqs.splice(index, 1);
            socket.emit('musicmessage', {freq: 233.1 * (2 ** octave), on: false});
            bbKey.style.backgroundColor = 'rgb(34,34,34)';
        }
    });

    // document.body.addEventListener('keydown', function(ev) {
    //     if(ev.key === "a" && !freqs.includes(130.8 * (2 ** octave))) { // c3
    //         addOscillator(130.8 * (2 ** octave));
    //     }
    //     if(ev.key === "s" && !freqs.includes(146.8 * (2 ** octave))) { // d3
    //         addOscillator(146.8 * (2 ** octave));
    //     }
    //     if(ev.key === "d" && !freqs.includes(164.8 * (2 ** octave))) { // e3
    //         addOscillator(164.8 * (2 ** octave));
    //     } 
    //     if(ev.key === "f" && !freqs.includes(174.6 * (2 ** octave))) { // f3
    //         addOscillator(174.6 * (2 ** octave));
    //     }
    //     if(ev.key === "g" && !freqs.includes(196.0 * (2 ** octave))) { // g3
    //         addOscillator(196.0 * (2 ** octave));
    //     }
    //     if(ev.key === "h" && !freqs.includes(220.0 * (2 ** octave))) { // a3
    //         addOscillator(220.0 * (2 ** octave));
    //     }
    //     if(ev.key === "j" && !freqs.includes(246.9 * (2 ** octave))) { // b3
    //         addOscillator(246.9 * (2 ** octave));
    //     }
    //     if(ev.key === "k" && !freqs.includes(261.6 * (2 ** octave))) { // c4
    //         addOscillator(261.6 * (2 ** octave));
    //     } 
    //     if(ev.key === "w" && !freqs.includes(138.6 * (2 ** octave))) { // c#3 / db3
    //         addOscillator(138.6 * (2 ** octave));
    //     } 
    //     if(ev.key === "e" && !freqs.includes(155.6 * (2 ** octave))) { // d#3 / eb3
    //         addOscillator(155.6 * (2 ** octave));
    //     } 
    //     if(ev.key === "t" && !freqs.includes(185.0 * (2 ** octave))) { // f#3 / gb3
    //         addOscillator(185.0 * (2 ** octave));
    //     }  
    //     if(ev.key === "y" && !freqs.includes(207.7 * (2 ** octave))) { // g#3 / ab3
    //         addOscillator(207.7 * (2 ** octave));
    //     }  
    //     if(ev.key === "u" && !freqs.includes(233.1 * (2 ** octave))) { // a#3 / bb3
    //         addOscillator(233.1 * (2 ** octave));
    //     }
    //     if(ev.key === "ArrowUp") {
    //         octave++;
    //         console.log(tones.length);
    //         for(let i = 0; i < tones.length; i++) {
    //             console.log(tones[i].frequency.value);
    //             tones[i].frequency.value = tones[i].frequency.value * 2;
    //             console.log(tones[i].frequency.value);
    //             freqs[i] *= 2;
    //         }
    //     }
    //     if(ev.key === "ArrowDown") {
    //         octave--;
    //         for(let i = 0; i < tones.length; i++) {
    //             tones[i].frequency.value = tones[i].frequency.value / 2;
    //             freqs[i] /= 2;
    //         }
    //     }
    // });
    // document.body.addEventListener('keyup', function(ev) {
    //     if(ev.key === "a") { // c3
    //         removeOscillator(130.8 * (2 ** octave));   
    //     } 
    //     if(ev.key === "s") { // d3
    //         removeOscillator(146.8 * (2 ** octave));
    //     }
    //     if(ev.key === "d") { // e3
    //         removeOscillator(164.8 * (2 ** octave));
    //     }
    //     if(ev.key === "f") { // f3
    //         removeOscillator(174.6 * (2 ** octave));
    //     }
    //     if(ev.key === "g") { // g3
    //         removeOscillator(196.0 * (2 ** octave));
    //     }
    //     if(ev.key === "h") { // a3
    //         removeOscillator(220.0 * (2 ** octave));
    //     }
    //     if(ev.key === "j") { // b3
    //         removeOscillator(246.9 * (2 ** octave));
    //     }
    //     if(ev.key === "k") { // c4
    //         removeOscillator(261.6 * (2 ** octave));
    //     }
    //     if(ev.key === "w") { // c#3 / db3
    //         removeOscillator(138.6 * (2 ** octave));
    //     }
    //     if(ev.key === "e") { // d#3 / eb3
    //         removeOscillator(155.6 * (2 ** octave));
    //     }
    //     if(ev.key === "t") { // f#3 / gb3
    //         removeOscillator(185.0 * (2 ** octave));
    //     }
    //     if(ev.key === "y") { // g#3 / ab3
    //         removeOscillator(207.7 * (2 ** octave));
    //     }
    //     if(ev.key === "u") { // a#3 / bb3
    //         removeOscillator(233.1 * (2 ** octave));
    //     }
    // });
}

function addOscillator(freq) {
    if(freqs.includes(freq)) return;

    let tone = context.createOscillator();
    let g = context.createGain();
    tone.frequency.value = freq;
    tone.connect(g);

    tones.push(tone);
    console.log(tones.length);
    freqs.push(freq);
    gains.push(g);


    for(gain of gains) {
        gain.gain.value = 1/(gains.length);
    }
    
    g.connect(context.destination);
    tone.start();

}

function removeOscillator(freq) {
    let index = freqs.indexOf(freq);

    if(index > -1) {
        gains[index].gain.setTargetAtTime(0, context.currentTime, 0.015);
        tones.splice(index, 1);
        freqs.splice(index, 1);
        gains.splice(index, 1);
    }
}