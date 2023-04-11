import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function animalPage() {

    const fetcher = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        if (res.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }

    const { query } = useRouter();

    const { data, error, isLoading, isValidating } = useSWR(() => (query.animal ? `/api/animals/${query.animal}` : null), fetcher);

    if (error) return <div>{error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return null;

    const animalInfoMap = new Map(Object.entries(data));
    const infoKeys = Array.from(animalInfoMap.keys());

    
    infoKeys.map(key => {
        console.log(animalInfoMap.get(key));
    });

    return (
        <Layout>
            <table className={utilStyles.table}>
                <thead>
                    <tr>
                    {
                        infoKeys.map(key => {
                            return (
                                <th key={key}>{key}</th>
                            );
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {    
                            infoKeys.map(key => {
                                return (
                                    <td key={key}>{animalInfoMap.get(key)}</td>
                                );
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </Layout>
    );
}
