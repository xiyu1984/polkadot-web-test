import { web3FromAddress } from '@polkadot/extension-dapp';
import { stringToHex, u8aToHex, u8aToU8a } from "@polkadot/util";
import {cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';

import Web3 from 'web3';

// import dynamic from 'next/dynamic'

// const web3Enable = dynamic(() => import('@polkadot/extension-dapp'), { ssr: false });

export async function onChainOperation() {
    const {web3Accounts, web3Enable } = await import('@polkadot/extension-dapp');

    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();

    console.log(allAccounts);

    const injector = await web3FromSource('polkadot-js');

    console.log(injector?.signer);
}

export async function getAllAccounts() {
    const {web3Accounts, web3Enable } = await import('@polkadot/extension-dapp');

    const allInjected = await web3Enable('my cool dapp');
    const allAccounts = await web3Accounts();

    return allAccounts;
}

async function polkadotSignRaw(raw_message, selectedAddress) {
    const injector = await web3FromAddress(selectedAddress);

    const signRaw = injector?.signer?.signRaw;

    // console.log(injector);
    // console.log(raw_message);

    // const hashFn = (msg) => {
    //     return (0,_polkadot_util_crypto__WEBPACK_IMPORTED_MODULE_1__.shaAsU8a)(msg, 256);
    // }

    // const hsfnStr = hashFn.toString();

    if (!!signRaw) {
        // after making sure that signRaw is defined
        // we can use it to sign our message
        const { signature } = await signRaw({
            address: selectedAddress,
            data: stringToHex(raw_message),
            type: 'bytes'
        });

        const isValidSignature = (signedMessage, signature, address) => {
            const publicKey = decodeAddress(address);
            const hexPublicKey = u8aToHex(publicKey);

            console.log(hexPublicKey);
            // console.log(u8aToU8a(signature));
          
            return signatureVerify(signedMessage, signature, address).isValid;
        };

        await cryptoWaitReady();
        const isValid = isValidSignature(
            raw_message,
            signature,
            selectedAddress
        );
        console.log(isValid)

        return signature;
    } else {
        return 'Signing failed!';
    }
}

async function ethSignRaw(raw_message, selectedAddress) {
    const errorMsg = 'Ethereum signing failed!';
    
    if (typeof window.ethereum === 'undefined') {
        alert('Please install Metamask to use this feature.');
        return errorMsg;
    }
    
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.enable();
        const signature = await web3.eth.personal.sign(raw_message, selectedAddress);

        return signature;

      } catch (error) {
        return errorMsg;
      }
}

export async function signRaw(raw_message, selectedAddress, signType = 'polkadot-sign') {
    if (signType === 'polkadot-sign') {
        return await polkadotSignRaw(raw_message, selectedAddress);
    } else if (signType === 'eth-sign') {
        return await ethSignRaw(raw_message, selectedAddress);
    }
}
