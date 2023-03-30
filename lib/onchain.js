import { web3FromAddress } from '@polkadot/extension-dapp';
import { stringToHex, u8aToHex, u8aToU8a } from "@polkadot/util";
import {cryptoWaitReady, decodeAddress, signatureVerify} from '@polkadot/util-crypto';

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

export async function signRaw(raw_message, selectedAddress) {
    const injector = await web3FromAddress(selectedAddress);

    const signRaw = injector?.signer?.signRaw;

    // console.log(injector);
    // console.log(raw_message);

    if (!!signRaw) {
        // after making sure that signRaw is defined
        // we can use it to sign our message
        const { signature } = await signRaw({
            address: selectedAddress,
            data: stringToHex('hello'),
            type: 'bytes'
        });

        const isValidSignature = (signedMessage, signature, address) => {
            const publicKey = decodeAddress(raw_message);
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
