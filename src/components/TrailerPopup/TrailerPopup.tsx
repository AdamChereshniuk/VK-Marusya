import cross_icon from "../../assets/Header/close btn.svg";
import pause_icon from "../../assets/MainPage/pause.svg";
import play_icon from "../../assets/MainPage/play.svg";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import "./TrailerPopup.css";

type TrailerPopupProps = {
  isOpen: boolean;
  movieTitle: string;
  trailerUrl: string;
  onClose: () => void;
}

export const TrailerPopup = ({ isOpen, movieTitle, trailerUrl, onClose }: TrailerPopupProps) => {
    const [doesPlay, setDoesPlay] = useState<boolean>(true);

    useEffect(() => {
        if (isOpen) setDoesPlay(true);
    }, [isOpen]);

    const handleOnClickPlayPause = () => {
        setDoesPlay((prev) => !prev);
    };

    return (
        <>
            {trailerUrl && (
                <div className="trailer-popup">
                    <div className="trailer-popup__box">
                        <div className="trailer-popup__content">
                            <ReactPlayer
                                src={trailerUrl}
                                playing={doesPlay}
                                controls={false}
                                width="100%"
                                height="100%"
                            />

                            <div className="trailer-popup__controls">
                                <button className="trailer-popup__btn--play-pause" onClick={handleOnClickPlayPause}>
                                    {doesPlay
                                        ?
                                        <>
                                            <img src={pause_icon} alt="" />
                                        </>
                                        :
                                        <>
                                            <img src={play_icon} alt="" />
                                        </>
                                    }
                                </button>

                                {!doesPlay && (
                                    <p className="trailer-popup__title">{movieTitle}</p>
                                )}
                            </div>
                        </div>

                        {!doesPlay && (
                            <button className="trailer-popup__btn--close" onClick={onClose}>
                                <img src={cross_icon} alt="Крестик" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};