/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/
// Default settings

const defaultSettings = {
	// These are all of the used configuration settings.  You can output a blank config
	// file that will be auto-read (it will include the CLI overrides used) with 
	// '--write-config'


	// Don't use the ANSI style output, just send messages to the
	// terminal.
	textOnlyMode : false,

	// Messages you want included in the output section
	showMessages : {
		oscErrors   : true,  // OSC decoding and processing error
		oscReceived : false, // all OSC messages (a lot of data)
		pings       : false, // pings to the X32
	},

	// Vor configuration
	vor : {
		// IP Address to send on. CLI override -o or --vor-ip
		address    : '127.0.0.1',
		// Port to send on.  CLI override -p or --vor-port
		port       : 3333,

		// Items to include in vor updates
		// 
		// Available options are
		//  cue : Current cue, scene, or snippet
		//  dca : All DCA's
		//  bus : All BUS's
		//  dca1-dca8 : Individual DCA's
		//  bus01-bus08 : Individual BUS's
		output     : ['cue', 'dca'],

		// send updates every frequency milliseconds and all data every
		// fullUpdate * frequency.  e.g. fullUpdate = 10 sends the full
		// update every 10th frequency update.
		// In testing, frequency = ~5-6 seemed to be the minimum supported.
		frequency  : 100,
		fullUpdate : 10,

		// send bundles with a timestamp this many milliseconds in the future
		jitter     : 50,


		// Single string mode settings - useful to preformat the display with
		// padding should you be using a fixed with font.

		// With single string mode on, you will get messages like:
		// '/dca/1 [your string format]' e.g. '/dca/1 "[1] ON  -oo dB  NARRATOR"'
		
		// Format options :
		//  number : fader number
		//  mute   : 'ON' or 'OFF'
		//  level  : in db, '-oo dB' to '+10.0db'
		//  name   : set name of fader

		// Additionally, you can specify padding - e.g. {{mute:3}} will output 'ON ' or 'OFF'
		// to keep fixed with fonts aligned
		singleStringFormat : '[{{number}}] {{mute:3}} {{8:level}} {{name}}',

		// Enable single string mode (default)
		singleStringMode   : true,

		// Pad BUS numbers (not dca) - so Bus '1' becomes '01'
		singleStringPadNum : true,

		// When single string mode is disabled, you will get a message with 3 string components
		// '/dca/1 "-oo dB" "ON" "NARRATOR"

		// Likely neither of these options are useful for Vor at this time, but, X32_Vor
		// simply tracks the X32 state and spits back out info, so this may be useful for
		// something.

		// Send level as a floating point number (range 0->1) instead (non single string only)
		faderLevelFloat  : false,
		// Send mute as an integer (0 or 1) instead (non single string only)
		faderMuteInteger : false,
	},

	// X32 Configuration
	x32 : {
		// IP address to listen on, CLI override with -i or --ip
		address         : null,
		// Port to listen on.  10023 is the X32 default
		port            : 10023,

		// Keep Alive timers - the /xremote command needs to be sent to the 
		// X32 at least every 10 seconds, we do 5 seconds to be sure.
		// keepShowAlive is for force-refreshing cue data - this can generate
		// a lot of data for large shows. Both numbers are in milliseconds.
		keepAlive       : 5000,
		keepShowAlive   : 60000,
		queueInterval   : 30,
	},
}

module.exports.defaultSettings = defaultSettings