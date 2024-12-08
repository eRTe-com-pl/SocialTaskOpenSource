import React from "react";

const POV_POSITION_TIME = 20000;

function ControlPanel({username, handleMyLocation, handleJoin, globeElement, setError}) {
    return (<div className="control-panel">
        <h1>Rozpal Świat</h1>

        <div className="control-panel__buttons">
            <button onClick={handleMyLocation}>Pokaż mnie</button>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0">Suggestions</h6>
            <div className="d-flex text-body-secondary pt-3">
                <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32"
                     xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32"
                     preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#007bff"></rect>
                    <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                </svg>
                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                        <strong className="text-gray-dark"> {username ? '@' + username : 'Zmów modlitwę'}</strong>
                        {username ? (<i className="bi bi-star-fill"></i>) : (

                            <button
                                type="button"
                                className="btn btn-primary btn-sm position-relative rounded-4"
                                onClick={handleJoin}
                            >
                                Dołączam..
                                {/*<span*/}
                                {/*    className="position-absolute bottom-500 start-90 translate-middlsse badge rounded-pill bg-danger">*/}
                                {/*    99*/}
                                {/*    <span className="visually-hidden">unread messages</span>*/}
                                {/*</span>*/}
                            </button>
                        )}
                    </div>
                    <span className="d-block left">{ username ? ('Odmawiam') : ('Odmów')} modlitę <strong>Zdrowaś Maryjo</strong> w intencji pokoju na świecie.</span>
                </div>
            </div>
        </div>
    </div>);
}

export default ControlPanel;
