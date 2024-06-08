# X32/M32 Vor Adapter

Make your X32 talk to Vor

## Status

___maybe working___.  Tested only with static fake data.

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
  * Wildcard Options: [dca (all dca's), bus (all busses)]
  * Default is [cue, dca1 - dca8]

__--updateFrequency__ _ms_

* Updates frequency in ms _[1000ms]_

__-v__, __--verbose__

* Print lots of debug data

## Install

### Install Node.js

1. create `~/.zprofile` if it does not already exist

```shell
$ touch ~/.zprofile
```

2. install nvm (Node Version Manager)

```shell
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

3. restart the terminal and install node.js

```shell
$ nvm install 20
```

4. Verify installation
```shell
$ node -v # should print `v20.14.0`
$ npm -v # should print `10.7.0`
```

### Clone or download the repository as a ZIP

Use GIT to clone the repository, or, download the source ZIP file from GitHub

### Install Dependencies

In the folder of the repository (or the unzipped files), run `npm`

```shell
$ npm install
```

### Run The program

```shell
$ npm start [X32_IP_Address] [options]
```

### Configure VOR

Add a [Custom OSC](https://docs.getvor.app/vor/settings/connections/show-control/custom-osc) connection of type UDP.

![Options Window](./doc/vorUDP.webp)

By default, X32_Vor uses port 3333, but you can use whatever you want as a command line option __--vorPort=4444__.  Outputting to VOR on a different physical address (different machine) has never been tested.

### Add VOR addresses

Add any of the available address endpoints. They must be configured with the __--listen__ option (or in the defaults).  All addresses return only strings

Available:

* /currentCue _[cue number] [cue name]_
* /dca/__[dca number]__ _[level] [on/off] [name]_
* /bus/__[bus number]__ _[level] [on/off] [name]_

___Note: Bus number must be zero-padded, e.g. `/bus/01`, not `/bus/1`___

## How about a binary?

Maybe. I don't have the foggiest idea on the state of Node.js build tools for CLI stuff.

## Issues?

Open a ticket, or find me on the VOR or TGR discord groups.

## Licensing

"Can I do...?" -> sure. go for it. If you can, and it might be useful to others, send a pull request to include it in the repo.

As a rule, I always prefer optional behavior - e.g. levels are in dB right now, but if you wanted the raw number, add it as an option rather than changing existing functionality.
