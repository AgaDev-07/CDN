"use strict";
class Font {
    name;
    font;
    constructor(name, font) {
        this.name = name;
        this.font = font;
        this.name = name;
        this.font = font;
    }
}
function generator(text, font = 'default') {
    const FONT = generator.letters(font);
    return text
        .toUpperCase()
        .split('\n')
        .map(line => {
        let text = ['', '', '', '', '', '', ''];
        line.split('').forEach(char => {
            let charArray = char.split('');
            charArray.forEach(char => {
                (FONT[char] || FONT['?']).forEach((line, index) => {
                    text[index + 1] += line;
                });
            });
        });
        return text.join('\n');
    })
        .join('\n');
}
generator.getFont = function (font) {
    if (typeof font === 'string') {
        let fontObject = generator.fonts.filter(f => f.name === font)[0] || generator.fonts[0];
        return fontObject;
    }
    return font;
};
generator.letters = function (font) {
    return generator.getFont(font).font;
};
generator.fonts = [
    new Font('default', {
        A: [
            '  A)aa   ',
            ' A)  aa  ',
            'A)    aa ',
            'A)aaaaaa ',
            'A)    aa ',
            'A)    aa ',
        ],
        B: [
            'B)bbbb   ',
            'B)   bb  ',
            'B)bbbb   ',
            'B)   bb  ',
            'B)    bb ',
            'B)bbbbb  ',
        ],
        C: [
            '  C)ccc  ',
            ' C)   cc ',
            'C)       ',
            'C)       ',
            ' C)   cc ',
            '  C)ccc  ',
        ],
        D: [
            'D)dddd   ',
            'D)   dd  ',
            'D)    dd ',
            'D)    dd ',
            'D)   dd  ',
            'D)dddd   ',
        ],
        E: [
            'E)eeeeee ',
            'E)       ',
            'E)eeeee  ',
            'E)       ',
            'E)       ',
            'E)eeeeee ',
        ],
        F: [
            'F)ffffff ',
            'F)       ',
            'F)fffff  ',
            'F)       ',
            'F)       ',
            'F)       ',
        ],
        G: [
            '  G)gggg ',
            ' G)      ',
            'G)  ggg  ',
            'G)    gg ',
            ' G)   gg ',
            '  G)ggg  ',
        ],
        H: [
            'H)    hh ',
            'H)    hh ',
            'H)hhhhhh ',
            'H)    hh ',
            'H)    hh ',
            'H)    hh ',
        ],
        I: [
            'I)iiiiii ',
            '    I)   ',
            '    I)   ',
            '    I)   ',
            '    I)   ',
            'I)iiiiii ',
        ],
        J: [
            'J)jjjjjj ',
            '    J)   ',
            '    J)   ',
            'J)  jj   ',
            'J)  jj   ',
            ' J)jj    ',
        ],
        K: [
            'K)   kk  ',
            'K)  kk   ',
            'K)kkk    ',
            'K)  kk   ',
            'K)   kk  ',
            'K)    kk ',
        ],
        L: [
            'L)       ',
            'L)       ',
            'L)       ',
            'L)       ',
            'L)       ',
            'L)llllll ',
        ],
        M: [
            ' M)mm mmm  ',
            'M)  mm  mm ',
            'M)  mm  mm ',
            'M)  mm  mm ',
            'M)      mm ',
            'M)      mm ',
        ],
        N: [
            'N)    nn ',
            'N)nn  nn ',
            'N) nn nn ',
            'N)  nnnn ',
            'N)   nnn ',
            'N)    nn ',
        ],
        O: [
            ' O)oooo  ',
            'O)    oo ',
            'O)    oo ',
            'O)    oo ',
            'O)    oo ',
            ' O)oooo  ',
        ],
        P: [
            'P)ppppp  ',
            'P)    pp ',
            'P)ppppp  ',
            'P)       ',
            'P)       ',
            'P)       ',
        ],
        Q: [
            ' Q)qqqq  ',
            'Q)    qq ',
            'Q)    qq ',
            'Q)  qq q ',
            'Q)   qq  ',
            ' Q)qqq q ',
        ],
        R: [
            'R)rrrrr  ',
            'R)    rr ',
            'R)  rrr  ',
            'R) rr    ',
            'R)   rr  ',
            'R)    rr ',
        ],
        S: [
            ' S)ssss  ',
            'S)    ss ',
            ' S)ss    ',
            '     S)  ',
            'S)    ss ',
            ' S)ssss  ',
        ],
        T: [
            'T)tttttt ',
            '    T)   ',
            '    T)   ',
            '    T)   ',
            '    T)   ',
            '    T)   ',
        ],
        U: [
            'U)    uu ',
            'U)    uu ',
            'U)    uu ',
            'U)    uu ',
            'U)    uu ',
            ' U)uuuu  ',
        ],
        V: [
            'V)    vv ',
            'V)    vv ',
            'V)    vv ',
            ' V)  vv  ',
            '  V)vv   ',
            '   V)    ',
        ],
        W: [
            'W)      ww ',
            'W)      ww ',
            'W)  ww  ww ',
            'W)  ww  ww ',
            'W)  ww  ww ',
            ' W)ww www  ',
        ],
        X: [
            'X)    xx ',
            ' X)  xx  ',
            '  X)xx   ',
            '  X)xx   ',
            ' X)  xx  ',
            'X)    xx ',
        ],
        Y: [
            'Y)    yy ',
            ' Y)  yy  ',
            '  Y)yy   ',
            '   Y)    ',
            '   Y)    ',
            '   Y)    ',
        ],
        Z: [
            'Z)zzzzzz ',
            '      Z) ',
            '    Z)   ',
            '   Z)    ',
            ' Z)      ',
            'Z)zzzzzz ',
        ],
        '-': [
            '         ',
            '         ',
            '         ',
            '######## ',
            '         ',
            '         ',
        ],
        '=': [
            '         ',
            '         ',
            '######## ',
            '         ',
            '######## ',
            '         ',
        ],
        '(': ['   () ', ' ()   ', '()    ', '()    ', ' ()   ', '   () '],
        ')': ['))     ', '  ))   ', '    )) ', '    )) ', '  ))   ', '))     '],
        '{': [' {)[[[ ', '  {)   ', '[{)    ', '  {)   ', ' {)    ', ' {)[[[ '],
        '}': ['})]]]  ', '  })   ', '   })] ', '  })   ', '   })  ', '})]]]  '],
        '[': ['[){{ ', '[)   ', '[)   ', '[)   ', '[)   ', '[){{ '],
        ']': ['])}} ', '  ]) ', '  ]) ', '  ]) ', '  ]) ', '])}} '],
        '?': [
            ' ?)??   ',
            '     ?) ',
            '    ?)  ',
            '  ?)    ',
            '        ',
            '  ?)    ',
        ],
        ' ': ['      ', '      ', '      ', '      ', '      ', '      '],
        '.': ['   ', '   ', '   ', '   ', '   ', '## '],
        ',': ['    ', '    ', '    ', '    ', '##  ', '  ) '],
        ':': ['   ', '   ', '## ', '   ', '## ', '   '],
        ';': ['    ', '    ', '##  ', '    ', '##  ', '  ) '],
        '!': ['   ', '## ', '## ', '## ', '   ', '## '],
        "'": ['# ', '# ', '# ', '  ', '  ', '  '],
        '"': ['# # ', '# # ', '# # ', '    ', '    ', '    '],
        '/': ['     # ', '    #  ', '   #   ', '  #    ', ' #     ', '#      '],
        '\\': ['#      ', ' #     ', '  #    ', '   #   ', '    #  ', '     # '],
        '|': ['# ', '# ', '# ', '# ', '# ', '# '],
        _: ['       ', '       ', '       ', '       ', '       ', '#######'],
        '*': ['      ', ' # #  ', '##### ', ' # #  ', '      ', '      '],
        '+': ['      ', '  #   ', '##### ', '  #   ', '      ', '      '],
        '<': ['    # ', '  #   ', '#     ', '  #   ', '    # ', '      '],
        '>': ['#     ', '  #   ', '    # ', '  #   ', '#     ', '      '],
        '#': [
            '  # #   ',
            '####### ',
            '  # #   ',
            '####### ',
            '  # #   ',
            '        ',
        ],
    }),
];
module.exports = {
    Font,
    generator: (text, font = 'default') => generator(text, font),
};
