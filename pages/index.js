// pages/index.js

import React from 'react';
import dynamic from 'next/dynamic';

// Directly use components or logic as needed, similar to how they're used in `App`.
// If any part of `App` is essential, move that logic into reusable components or hooks
// that can be consumed in both places.

const DynamicGlobeComponent = dynamic(() => import('../src/components/GlobeComponent'), { ssr: false });
import ControlPanel from "../src/components/ControlPanel.js";
import ErrorMessage from "../src/components/ErrorMessage.js";
import UserNamePrompt from "../src/components/UserNamePrompt.js";

function HomePage() {
    // Use hooks and state similar to `_app.js` if necessary.
    // Example: const [username, setUsername] = React.useState("");

    // Similarly replicate any logic needed from `App`.
    return (
        <div>
            {/* Insert the page-specific content here */}
            {/* <DynamicGlobeComponent /> */}
            {/* Use the components like ControlPanel, ErrorMessage, UserNamePrompt as needed */}
        </div>
    );
}

export default HomePage;