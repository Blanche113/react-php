import './Style.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState([]); // Добавлено состояние для отслеживания статуса отправки
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleSubmit = () => {
        if (name.length === 0) {
            alert("Name has left blank!");
        }
        else if (mobile.length === 0) {
            alert("Mobile has left blank!");
        }
        else if (email.length === 0) {
            alert("Email has left blank!");
        }
        else {
            const url = "http://localhost/enquiry.php";

            let fData = new FormData();
            fData.append('name', name);
            fData.append('mobile', mobile);
            fData.append('email', email);

            setIsButtonDisabled(true);

            axios.post(url, fData)
            .then(response => {
                setMessages(response.data.split('\n'));
                setTimeout(() => setIsButtonDisabled(false), 10000);   
            })
            .catch(error =>  {
                setMessages(error); alert(error);
                setTimeout(() => setIsButtonDisabled(false), 10000);
            });

            
        }
    }

    return(
        <div className='container'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="mobile">Mobile</label>
            <input type="text" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="button" name="send" id="send" value="SEND" onClick={handleSubmit} disabled={isButtonDisabled} />
            {messages.map((message, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: message }} />
            ))}
        </div>
    )
}

export default App;
