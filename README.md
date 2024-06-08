# X32/M32 Vor Adapter

Make your X32 talk to Vor

## Status

___Non-working___.  The message processor is likely broken and incomplete, It'll get fixed when I am in the right building again and have a connection to a real X32 - the emulator won't cut it for that.

## Options

__--ip__ _address_

* IP Address of the X32 [required]

__-p__, __--port__ _port_

* Port of the X32 _[10023]_

__-o__, __--vorPort__ _port_

* Port for Vor _[3333]_

__--vorIP__ _address_

* IP for Vor _[127.0.0.1]_

__-l__, __--listen__ _item1, item2, ..._

* Updates to populate to Vor.
  * Options: [cue, dca1 - dca8, bus01 - bus16].
  * Default is [cue, dca1 - dca8]

__--updateFrequency__ _ms_

* Updates frequency in ms _[1000ms]_

__-v__, __--verbose__

* Print lots of debug data

## Install

1. Install Node.js
2. Clone the repository
3. Run `npm install` to get install/update packages
4. Run `node index.js` _(with options)_ to start the adapter.

## How about a binary?

Maybe. I don't have the foggiest idea on the state of Node.js build tools for CLI stuff.
