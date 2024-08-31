# general website
how to use:

layouts gotta be specified as LANG.VARIANT
in `listOfSupportedLayouts` in `generateWebData.py`
and in `listOfSupportedLayouts` in `index.js`

remember to also add in the `index.hml` tag `<head>` the `generateWebData.py` `<script>` lines from its output

ex: `listOfSupportedLayouts = ["es.basic", "us.basic", "us.intl"]`

to generate layouts:
```
pip install beautifulsoup4 lxml
wget https://git.launchpad.net/ubuntu/+source/x11proto-core/plain/keysymdef.h
git submodule init
git submodule update
python3 generateWebData.py
```

to test: `python3 -m http.server`





## comments | notes to self

using [xkeyboard-config](https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config) and [keysymdef.h](https://git.launchpad.net/ubuntu/+source/x11proto-core/plain/keysymdef.h)

I could not for the life of me find any equivalence or translation between PS/2 and anything at xkeyboard which is how keyboard is handled in lin. Had to make my own, ugh

only thing i could find was this
https://lxr.linux.no/#linux+v6.7.1/drivers/input/keyboard/hpps2atkbd.h
included in
http://lxr.linux.no/#linux+v3.5.4/drivers/input/keyboard/atkbd.c
which is referenced at
https://wiki.osdev.org/PS/2_Keyboard

base.xml sourced from https://gitlab.freedesktop.org/xkeyboard-config/xkeyboard-config/-/tree/master/rules?ref_type=headsQ

https://superuser.com/questions/1460984/how-to-get-a-list-of-valid-x11-names-for-characters

first we load distributions