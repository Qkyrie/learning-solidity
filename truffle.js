const HDWalletProvider = require("truffle-hdwallet-provider");
const PrivateKeyProvider = require('truffle-privatekey-provider');

require('dotenv').config();
'use strict';

require('babel-register')({
	only: '/test/'
});
require('babel-polyfill');


const mocha = process.env.GAS_REPORTER ? mochaGasSettings : {};

module.exports = {
	networks: {
		development: {
			network_id: '*',
			host: "localhost",
			port: 8545,
		}
	},
	mocha: {
		reporter: 'eth-gas-reporter',
		reporterOptions : {
			currency: 'USD',
			gasPrice: 3
		}
	}
};