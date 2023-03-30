import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Layout from '../../components/layout';
import PolkadotPrepare from '../../components/polkadotPrepare';
import { getSortedPostsData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
// import {onChainOperation} from '../../lib/onchain';

// import dynamic from 'next/dynamic';

import React, { useState } from 'react';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
          allPostsData,
        },
    };
}

async function onClick() {

    const {onChainOperation} = await import('../../lib/onchain');

    await onChainOperation();

    // alert('You clicked me!');
    console.log('You clicked me!');
}

export default function FirstPost(props) {

    // `Link` is client-side navigation, which is faster than `<a></a>`. 

    // const {getAllAccounts} = await import('../../lib/onchain');

    // const accounts = await getAllAccounts();

    const [currentAddress, setAddress] = useState();
    const [isReady, setReady] = useState(false);
    const [accounts, setAccounts] = useState();

    async function get_accounts() {
        const {getAllAccounts} = await import('../../lib/onchain');
        
        const list_acct = await getAllAccounts();

        setAccounts(list_acct.map((acct) => ({address: acct.address, name: acct.meta.name, type: acct.type})));

        console.log(accounts);

        setReady(true);
    }

    return(
        <div>
            <Layout>
                <Head>
                    <title>First Post</title>
                    {/* <script src="https://connect.facebook.net/en_US/sdk.js" /> */}
                </Head>

                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy ="lazyOnload"
                    onLoad={() =>
                        console.log(`script loaded correctly, window.FB has been populated. ${window.FB}`)
                    }
                />

                <h1>First Post</h1>

                <section>
                    <h2>Details</h2>
                    {
                        props.allPostsData.map(({id, title, date}) => {
                            return <div key={id}>
                                    <p  className={utilStyles.lightText}>{id}</p>
                                    <p>{title}</p>
                                    <p>{date}</p>
                                </div>
                        })
                    }
                    <button onClick={get_accounts}>Start Transaction!</button>
                </section>
                <p>
                    <Link href="/"> 
                        Back to Main!
                    </Link>
                </p>
            </Layout>
            {
                isReady? (
                    <PolkadotPrepare stateSetter={setAddress} addresses={accounts} >
                        <h3>Polkadot Operation Addresses</h3>
                        <p className={utilStyles.lightText}>{currentAddress}</p>
                    </PolkadotPrepare>
                ): (
                    <div className={utilStyles.text_center}>
                        <h3>Polkadot Addresses Undefined</h3>
                    </div>
                )
            }
        </div>
    );
}
