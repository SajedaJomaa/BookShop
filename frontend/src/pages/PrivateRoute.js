
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Common/Modal.js';
import { getAuthToken } from '../util/auth';

const PrivateRoute = ({ element }) => {
    const [showModal, setShowModal] = useState(false);
    const token = getAuthToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setShowModal(true);
            const timer = setTimeout(() => {
                setShowModal(false);
                navigate('/signup');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [token, navigate]);

    const closeModal = () => {
        setShowModal(false);
    };

    return token ? element : (
        <Modal open={showModal} onClose={closeModal}>
            <div className="modal-content">
                <p className='modal-header'>You need to be logged in to view this page.</p>
            </div>
        </Modal>
    );
};

export default PrivateRoute;


