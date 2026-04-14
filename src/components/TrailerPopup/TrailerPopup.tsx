import { useEffect, useState } from "react";
import cross from "../../assets/Header/close.svg";
import ReactPlayer from "react-player";
import "./TrailerPopup.css";

interface ITrailerPopupProps {
  isOpen: boolean;
  trailerUrl: string;
  onClose: () => void;
};

export const TrailerPopup = ({ isOpen, trailerUrl, onClose }: ITrailerPopupProps) => {
    const [doesPlay, setDoesPlay] = useState<boolean>(true);

    useEffect(() => {
        if (isOpen) setDoesPlay(true);
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="trailer-popup">
                    <div className="trailer-popup__box">
                        <div className="trailer-popup__content">
                            <ReactPlayer src={trailerUrl} playing={doesPlay} controls={false} width="100%" height="100%"/>
                        </div>
                        
                        <button className="trailer-popup__close-btn" onClick={onClose}>
                            <img className="trailer-popup__close-img" src={cross} alt="Закрыть"/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};