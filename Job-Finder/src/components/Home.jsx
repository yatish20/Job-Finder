import React, { useEffect } from 'react';
import './Home.css';
import bgVideo from '../assets/bgvideonew.mp4';
import girlimg from '../assets/girlimg.avif';
import guyimage from '../assets/guyimage.webp';
import randomimg from '../assets/randomimg copy.avif';

const Home = () => {
    const pauseVideo = () => {
        const video = document.getElementById("indexvideo");
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const text = document.querySelector('.overlay-text');
            const scrollY = window.scrollY;

            if (scrollY > 200) {
                text.style.transform = 'translateX(0)';
                text.style.opacity = '1';
            } else {
                text.style.transform = 'translateX(-100%)';
                text.style.opacity = '0';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <main>
                <div className="indexvideo">
                    <video src={bgVideo} autoPlay muted loop id="indexvideo"></video>
                    <button id="pause" onClick={pauseVideo}>Pause</button>
                    <div className="videocontent">
                        <h1 id='videotext'>Relentless Focus. Exceptional Results.</h1>
                        <p>

                        </p>
                    </div>
                </div>


                <div className="text-1">
                    WHAT WE DO <br />

                </div>

                <div className="gallery-container">
                    <div className="gallery">
                        <img src={guyimage} alt="blackguy" width="600" height="400" />
                        <div className="desc">Jobs</div>
                    </div>
                    <div className="gallery">
                        <img src={randomimg} alt="random" width="600" height="400" />
                        <div className="desc">Internships</div>
                    </div>
                    <div className="gallery">
                        <img src={girlimg} alt="girl" width="600" height="400" />
                        <div className="desc">Training and Courses</div>
                    </div>
                </div>
                <div className='midtext'>
                    <h2>Build Your career like never before!!</h2>
                </div>

                <section className="widget-container">
                    <div className="left-panel">
                        <div className="overlay-text">



                            <h1>" Control Your Career" </h1>

                            <ul>
                                <li>Connect with top talent and build your professional network. </li>

                                <li>Connect with over 1M+ professionals in your industry.</li>
                                <li>Access exclusive job boards and career resources.</li>
                                <li> Start building your dream career today! </li><br />
                                Join our community today! <br />


                            </ul>

                        </div>
                    </div>

                    <div className="right-panel">
                        <div className="card">
                            <img src="./src/assets/baroda-loan-to-business-correspondents-SpotlightBanner.webp" alt="" />
                            <div className="desc">learn and grow</div>


                        </div>

                    </div>
                </section>
            </main>


        </div >
    );
};

export default Home;
