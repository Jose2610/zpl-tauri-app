import './Settings.css';
import { useNavigate, useLocation } from '@solidjs/router';

function Settings() {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        navigate('/');
    }

    return (
        <div className='layout'>
            <div className='display'>
                <p className='text'>Settings</p>
            </div>

            <div className='settings-options'>
                <div className='side-by-side'>
                    <p className='subtext'>Change ZPL command</p>
                    
                </div>
                <button className='settings-option' onClick={() => goBack()}>Go Back</button>
            </div>
        </div>
    );
};

export default Settings;