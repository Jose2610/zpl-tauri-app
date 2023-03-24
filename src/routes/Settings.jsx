import './Settings.css';
import { useNavigate } from '@solidjs/router';

function Settings() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    return (
        <div className='layout'>
            <div className='display'>
                <p className='text'>Settings</p>
            </div>

            <div className='settings-options'>
                <button className='settings-option' onClick={() => goBack()}>Go Back</button>
            </div>
        </div>
    );
};

export default Settings;