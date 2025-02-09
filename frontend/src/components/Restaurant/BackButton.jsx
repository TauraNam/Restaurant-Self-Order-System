import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

    const navigate = useNavigate()

    return (
        <div className="back-button" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft className="back-icon" />
            <span>Back</span>
        </div>
    );
}

export default BackButton;