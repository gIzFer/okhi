//https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config/-/blob/master/symbols/pc?ref_type=heads
//https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config/-/blob/master/symbols/pc?ref_type=heads
//https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config/-/blob/master/symbols/keypad?ref_type=heads
const keyMap = {
	'0x1C': 'AC01', //a
	'0x32': 'AB05', //b
	'0x21': 'AB03', // c
	'0x23': 'AC03', // d
	'0x24': 'AD03', // e
	'0x2B': 'AC04', // f
	'0x34': 'AC05', // g
	'0x33': 'AC06', // h
	'0x43': 'AD08', // i
	'0x3B': 'AC07', // j
	'0x42': 'AC08', // k
	'0x4B': 'AC09', // l
	'0x3A': 'AB07', // m
	'0x31': 'AB06', // n
	'0x44': 'AD09', // o
	'0x4D': 'AD10', // p
	'0x15': 'AD01', // q
	'0x2D': 'AD04', // r
	'0x1B': 'AC02', // s
	'0x2C': 'AD05', // t
	'0x3C': 'AD07', // u
	'0x2A': 'AB04', // v
	'0x1D': 'AD02', // w
	'0x22': 'AB02', // x
	'0x35': 'AD06', // y
	'0x1A': 'AB01', // z
	'0x45': 'AE10', // 0
	'0x16': 'AE01', // 1
	'0x1E': 'AE02', // 2
	'0x26': 'AE03', // 3
	'0x25': 'AE04', // 4
	'0x2E': 'AE05', // 5
	'0x36': 'AE06', // 6
	'0x3D': 'AE07', // 7
	'0x3E': 'AE08', // 8

	'0x46': 'AE09', // 9
	'0x0E': 'AC11', // ` apostrophe
	'0x4E': 'AE11', // - minus
	'0x55': 'AE12', // = equal
	'0x5D': 'BKSL', // \\ backslash
	'0x66': 'BKSP', // <BKSP>
	'0x29': 'SPCE', // <SPACE>
	'0x0D': 'TAB', // <TAB>
	'0x58': 'CAPS', // <CAPS>
	'0x12': 'LFSH', // <LSHIFT>
	'0x14': 'LCTL', // <LCTRL>
	'0xE0,0x1F': 'LWIN', // <LGUI> -- unsure
	'0x11': 'LALT', // <LALT>
	'0x59': 'RTSH', // <RSHIFT>
	'0xE0,0x14': 'RCTL', // <RCTRL>
	'0xE0,0x27': 'RWIN', // <RGUI>
	'0xE0,0x11': 'RALT', // <RALT>
	'0xE0,0x2F': 'RWIN', // <APPS> -- unsure
	'0x5A': 'KPEN', // <ENTER>
	'0x76': 'ESC', // <ESC>
	'0x05': 'FK01', // <F1>
	'0x06': 'FK02', // <F2>
	'0x04': 'FK03', // <F3>
	'0x0C': 'FK04', // <F4>
	'0x03': 'FK05', // <F5>
	'0x0B': 'FK06', // <F6>
	'0x83': 'FK07', // <F7>
	'0x0A': 'FK08', // <F8>
	'0x01': 'FK09', // <F9>
	'0x09': 'FK10', // <F10>
	'0x78': 'FK11', // <F11>
	'0x07': 'FK12', // <F12>
	'0xE0,0x12,0xE0,0x7C': 'PRSC', // <PRINT_SCRN>
	'0x7E': 'SCLK', // <SCROLL>
	'0xE1,0x14,0x77,0xE1,0xF0,0x14,0xF0,0x77': 'PAUS', // <PAUSE>

	'0x54': 'AD11', // [
	'0x5B': 'AD12', // ]
	'0x4C': 'AC10', // ;
	'0x52': 'AC11', // \'
	'0x41': 'AB08', // ,
	'0x49': 'AB09', // .
	'0x4A': 'AB10', // /
	'0xE0,0x70': 'INS', // <INSERT>
	'0xE0,0x6C': 'HOME', // <HOME>
	'0xE0,0x7D': 'PGUP', // <PGUP>
	'0xE0,0x71': 'DELE', // <DELETE>
	'0xE0,0x69': 'END', // <END>
	'0xE0,0x7A': 'PGDN', // <PGDN>
	'0xE0,0x75': 'UP', // <UP>
	'0xE0,0x6B': 'LEFT', // <LEFT>
	'0xE0,0x72': 'DOWN', // <DOWN>
	'0xE0,0x74': 'RIGHT', // <RIGHT>
	'0x77': 'NMLK', // <NUM>
	'0xE0,0x4A': 'KP_Divide', // <KP/>
	'0x7C': 'KP_Multiply', // <KP*>
	'0x7B': 'KP_Subtract', // <KP->
	'0x79': 'KP_Add', // <KP+>
	'0xE0,0x5A': 'KPEN', // <KPENTER>
	'0x71': 'KPPT', // <KP.>
	'0x70': 'KP0', // <KP0>
	'0x69': 'KP1', // <KP1>
	'0x72': 'KP2', // <KP2>
	'0x7A': 'KP3', // <KP3>
	'0x6B': 'KP4', // <KP4>
	'0x73': 'KP5', // <KP5>
	'0x74': 'KP6', // <KP6>
	'0x6C': 'KP7', // <KP7>
	'0x75': 'KP8', // <KP8>
	'0x7D': 'KP9' // <KP9>
};