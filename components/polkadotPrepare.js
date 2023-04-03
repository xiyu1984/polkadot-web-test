import Head from 'next/head';
import React, { useState } from 'react';
import styles from './layout.module.css';

function generateSigning(signed_message, setSigned, selectedAddress) {

    // const handleInputChange = async (event) => {

    //     // const raw_message = event.target.value;

    //     setSigned(event.target.value);
    // }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const message1 = formData.get('unsigned message');
        // const message2 = formData.get('second message');

        const {signRaw} = await import('../lib/onchain');

        const signed = await signRaw(message1, selectedAddress);

        setSigned(signed);
    }

    return (
        <div>
            <form onSubmit={handleButtonClick}>
                <label htmlFor="my-input">Enter the message to sign:</label>
                <input
                    type="text"
                    id="1"
                    name='unsigned message'
                />
                {/* <br/>
                <input
                    type="text"
                    id="2"
                    name='second message'
                /> */}
                <button type='submit'>Submit</button>
            </form>
            <div className={styles.container}>
                {
                    signed_message && (<p>{signed_message}</p>)
                }
            </div>
        </div>
    );
}

export default function PolkadotPrepare({children, stateSetter, addresses}) {

    const [selectedAddress, setAddress] = useState();
    const [isSelected, setSelected] = useState(false);
    const [signed_message, setSigned] = useState();
    
    const handleOnChange = (event) => {
        setAddress(event.target.value);
        stateSetter(event.target.value);
        setSelected(true);
    }

    return (
        <div>
            {/* <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            <section className={styles.container}>
                {
                    addresses.map(({address, name, type}) => {
                        if (type === 'ecdsa' || type === 'ethereum') {
                            return <label key={address}>
                                <input type='radio' value= {address} checked={selectedAddress === address} onChange={handleOnChange}> 
                                </input>
                                {`Address: ${address}\nName: ${name}\nType: ${type}\n`}
                                <br/>
                            </label>
                            
                        } else {
                            return <label key={address}>
                                <input type='radio' value= {address} checked={selectedAddress === address} onChange={handleOnChange} disabled> 
                                </input>
                                {`Address: ${address}\nName: ${name}\nType: ${type}\n`}
                                <br/>
                            </label>
                        }
                    })
                }
                {/* <p>The operation address is: {selectedAddress}</p> */}
                <main className={styles.header}>
                    {children}
                </main>
                
                {
                    isSelected && generateSigning(signed_message, setSigned, selectedAddress)
                }

            </section>
        </div>
    );
}
