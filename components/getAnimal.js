import styles from './layout.module.css';
import React, { useState } from 'react';
import Link from 'next/link';

const inputAnimalName = 'Animal name';

function generateAnimalURL(animalName) {

    const animalURL = `/animal/${animalName}`

    return (
        <Link href={animalURL}>animalURL</Link>
    )
}

export default function Animal() {

    const [animal, setAnimal] = useState();

    const handleButtonClick = async (event) => {
    
        event.preventDefault();
        const form = event.target;
        console.log(event.nativeEvent.submitter.id);
        const formData = new FormData(form);
        const animalName = formData.get(inputAnimalName);
    
        setAnimal(animalName);
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleButtonClick}>
                <label htmlFor="animal input">Enter an animal:</label>
                <input
                    type="text"
                    id="1"
                    name= {inputAnimalName}
                />
                <button type='submit' id='animal-name'>Submit an Animal</button>
            </form>
            {
                animal && generateAnimalURL(animal)
            }
        </div>
    );
}
