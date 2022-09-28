"use strict";
function load(config) {
    config ||= {};
    let { loadingText = 'Loading', loadingAnimation = '|/-\\'.split(''), loadingSpeed = 100, loadingFormat = '{loadingText} {loadingAnimation}', endLoading = () => { console.log('load finally'); }, loadingLog = (...args) => console.log(...args) } = config;
    config.loadingText ||= loadingText;
    config.loadingAnimation ||= loadingAnimation;
    config.loadingSpeed ||= loadingSpeed;
    config.loadingFormat ||= loadingFormat;
    (() => {
        Object.keys(config).forEach(key => {
            if (key != 'loadingAnimation')
                loadingFormat = loadingFormat.replace(new RegExp(`{${key}}`), config[key]);
        });
    })();
    const clear = () => process.stdout.write('\r' + ' '.repeat(loadingFormat.replace(/{loadingAnimation}/, loadingAnimation[0]).length) + '\r');
    loadingAnimation = typeof loadingAnimation === 'string' ? loadingAnimation.split('') : getLoadingAnimation();
    let loading = true;
    let loadingAnimationIndex = 0;
    let loadingAnimationInterval = setInterval(() => {
        loadingAnimationIndex = (loadingAnimationIndex + 1) % loadingAnimation.length;
        if (loading)
            process.stdout.write('\r' + loadingFormat.replace(/{loadingAnimation}/, loadingAnimation[loadingAnimationIndex]));
        else {
            clearInterval(loadingAnimationInterval);
            clear();
            endLoading();
        }
        ;
    }, loadingSpeed);
    return {
        log: (...text) => {
            clear();
            loadingLog(...text);
        },
        end: () => {
            loading = false;
        }
    };
    function getLoadingAnimation() {
        let length = 0;
        loadingAnimation.map(v => v.length).filter(v => {
            if (v >= length)
                length = v;
            return v >= length;
        });
        return loadingAnimation.map(v => {
            if (v.length == length)
                return v;
            return v + ' '.repeat(length - v.length);
        });
    }
}
;
load.animations = {
    bars: {
        loadingAnimation: ['|', '/', '-', '\\'],
        loadingSpeed: 100,
    },
    dots: {
        loadingAnimation: ['.', '..', '...'],
        loadingSpeed: 500,
    },
    dots2: {
        loadingAnimation: ['.', ' .', '  .', ' .'],
        loadingSpeed: 300,
    },
    line: {
        loadingAnimation: ['[    ]', '[-   ]', '[--  ]', '[--- ]', '[----]', '[ ---]', '[  --]', '[   -]'],
        loadingSpeed: 200,
    },
    line2: {
        loadingAnimation: ['[    ]', '[=   ]', '[==  ]', '[=== ]', '[====]', '[ ===]', '[  ==]', '[   =]'],
        loadingSpeed: 200,
    },
    line3: {
        loadingAnimation: ['+--', '-+-', '--+'],
        loadingSpeed: 400,
    },
};
module.exports = load;
