import { useNavigate,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
const FlashCard = () => {
    const [user, setUser] = useState(null);
    const { topicId } = useParams();
    const [topic, setTopic] = useState('');
        
    
    
    
    
    
    
    return <p> loading </p>;
}

export default FlashCard;