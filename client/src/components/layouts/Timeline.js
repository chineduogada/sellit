import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

function Timeline() {
	useEffect(() => {}, []);

	const renderContent = () => {
		return <FaSpinner data-testid='loading' />;
	};

	return <div className='Timeline flex'>{renderContent()}</div>;
}

export default Timeline;

