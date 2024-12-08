import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const MainLayout: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Outlet />
				{/* Здесь хранятся все роуты в компоненте Outlet */}
			</div>
		</div>
	);
};

export default MainLayout;
