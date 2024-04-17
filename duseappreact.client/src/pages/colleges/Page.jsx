import { useEffect, useState } from 'react';
import { getAllColleges } from '../services/Colleges.js';
import { Colleges } from '../components/Colleges.jsx';

export default function CollegePage() {

    const [colleges, setColleges] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getColleges = async () => {
            const data = await getAllColleges();
            setLoading(false);
            setColleges(data);
        }

        getColleges();

    }, []);

    return (
        <div>
            { loading ? <div className="LoadingBlock"><p>Loading...</p></div> : <Colleges colleges={colleges} />}
        </div>
    );
}