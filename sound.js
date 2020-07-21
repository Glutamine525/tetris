function Sound() {
    var sebankArr = [void 0, "drocelot", "ppt", "t99", "top"];

    var itworks = false;
    var lowMode = false;
    var sebankwavelist = {
        drocelot: "bravo,endingstart,erase1,erase2,erase3,erase4,gameover,garbage,lock,move,rotate,hold,ready,go,harddrop,tspin0,tspin1,tspin2,tspin3,fault,ren1,ren2,ren3,ren4,ren5,ren6,ren7,ren8,ren9,ren10,ren11,ren12,ren13,ren14,ren15,ren16,ren17,ren18,ren19,ren20,BGM".split(
            ","
        ),
        ppt: "bravo,endingstart,erase1,erase2,erase3,erase4,gameover,garbage,lock,move,rotate,hold,ready,go,harddrop,tspin0,tspin1,tspin2,tspin3,fault,ren1,ren2,ren3,ren4,ren5,ren6,ren7,ren8,ren9,ren10,ren11,ren12,ren13,ren14,ren15,ren16,ren17,ren18,ren19,ren20,BGM".split(
            ","
        ),
        t99: "bravo,endingstart,erase1,erase2,erase3,erase4,gameover,garbage,lock,move,rotate,hold,ready,go,harddrop,tspin0,tspin1,tspin2,tspin3,fault,ren1,ren2,ren3,ren4,ren5,ren6,ren7,ren8,ren9,ren10,ren11,ren12,ren13,ren14,ren15,ren16,ren17,ren18,ren19,ren20,BGM".split(
            ","
        ),
        top: "bravo,endingstart,erase1,erase2,erase3,erase4,gameover,garbage,lock,move,rotate,hold,ready,go,harddrop,tspin0,tspin1,tspin2,tspin3,fault,ren1,ren2,ren3,ren4,ren5,ren6,ren7,ren8,ren9,ren10,ren11,ren12,ren13,ren14,ren15,ren16,ren17,ren18,ren19,ren20,BGM".split(
            ","
        ),
    };
    var repcount = {
        move: 3,
        erase1: 4,
        erase2: 3,
        erase3: 3,
        erase4: 3,
        harddrop: 3,
        lock: 3,
        hold: 3,
    };
    var waves = {};
    var sebank = {};
    var loadwavebank = function (dest, bankname, wavenames) {
        console.assert(wavenames !== void 0);
        for (var i = 0; i < wavenames.length; i++) {
            var iname = wavenames[i];
            var count = lowMode ? 1 : repcount[iname] || 2;
            if (iname === "BGM") count = 1;
            dest[iname] = {
                insts: [],
                curidx: 0,
            };
            for (var j = 0; j < count; j++) {
                var wave = document.createElement("AUDIO");
                wave.src = "se/" + bankname + "/" + iname + ".wav";
                wave.load();
                dest[iname].insts.push(wave);
            }
        }
    };
    this.init = function () {
        if (itworks === false) {
            try {
                var wave = document.createElement("AUDIO");
                wave.src = "se/ppt/gameover.wav";
                wave.load();
                itworks = true;
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    lowMode = true;
                }
            } catch (e) {
                alert("sound doesn't work.");
            }
        }
    };
    this.playse = function (name, combo, arg) {
        if (itworks && settings.Sound !== 0) {
            try {
                var ren;
                if (typeof arg !== "undefined") {
                    name += arg;
                }
                if (typeof combo !== "undefined" && combo > 0) {
                    combo = combo > 20 ? 20 : combo;
                    ren = "ren" + combo;
                    setTimeout(function () {
                        sound.playse(ren);
                    }, 0);
                }
                var wavegrp = sebank[name];
                if (typeof wavegrp !== "undefined") {
                    var wave = wavegrp.insts[wavegrp.curidx++];
                    wavegrp.curidx %= wavegrp.insts.length;
                    if (wave.tetrjsok || wave.readyState >= 4) {
                        if (wave.fastSeek && !lowMode) {
                            wave.fastSeek(0);
                        } else {
                            wave.currentTime = 0;
                        }
                        wave.volume = settings.Volume / 100;
                        wave.play();
                        wave.tetrjsok = true; // firefox.... ended.. readystate...
                    }
                }
            } catch (e) {
                console.error("sound error: " + e.toString());
            }
        }
    };
    this.playBGM = function (reset) {
        if (settings.BGM && itworks && settings.Sound !== 0) {
            try {
                var wave = sebank["BGM"].insts[0];
                if (wave.tetrjsok || wave.readyState >= 4) {
                    if (reset) {
                        if (wave.fastSeek && !lowMode) {
                            wave.fastSeek(0);
                        } else {
                            wave.currentTime = 0;
                        }
                    }
                    wave.volume = settings.Volume / 200;
                    wave.play();
                    wave.tetrjsok = true;
                    wave.loop = true;
                }
            } catch (e) {
                console.error("sound error: " + e.toString());
            }
        }
    };
    this.pauseBGM = function () {
        if (settings.BGM && itworks && settings.Sound !== 0) {
            try {
                var wave = sebank["BGM"].insts[0];
                wave.pause();
            } catch (e) {
                console.error("sound error: " + e.toString());
            }
        }
    };
    this.setsebank = function (bankid) {
        if (itworks) {
            try {
                var bankname = sebankArr[bankid];
                if (bankname !== void 0) {
                    if (waves[bankname] === void 0) {
                        sebank = {};
                        waves[bankname] = sebank;
                        loadwavebank(
                            sebank,
                            bankname,
                            sebankwavelist[bankname]
                        );
                    }
                    sebank = waves[bankname];
                } else {
                    sebank = {};
                }
            } catch (e) {
                alert("sound error: " + e.toString());
            }
        }
    };
}

var sound = new Sound();
