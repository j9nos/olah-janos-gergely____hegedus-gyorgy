import React from 'react';
import Github_Logo from "../assets/github.png";
import './Github.css';

function Github() {
return (
        <div className="Github-page">
        <div className="Github">
            <div className="Github-top-container">
                <img
                src={Github_Logo}
                alt="Github Logo"
                className="Github-logo"
                />
            </div>
                <div className='Git-link-container'>
                    <h1 className='Title'>GitHub linkek</h1>
                    <div className='Git-link'>
                    <button
                        className='LinkBtn'
                        type="button"
                        onClick={(e) => {
                        e.preventDefault();
                        window.location.href='https://github.com/Gyuri21';
                        }}>Hegedűs György Károly
                    </button>
                    <button
                        className='LinkBtn'
                        type="button"
                        onClick={(e) => {
                        e.preventDefault();
                        window.location.href='https://github.com/olahjg';
                        }}>Oláh János Gergely
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Github;