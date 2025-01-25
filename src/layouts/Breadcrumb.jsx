import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").filter((path) => path);

    return (
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <ul className="flex items-center gap-x-2">

                {paths.map((path, index) => {
                    const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;
                    return (
                        <li key={fullPath} className="flex items-center">
                            {isLast ? (
                                <span className="text-gray-800 dark:text-gray-200">  {path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()}</span>
                            ) : (
                                <Link to={fullPath} className="hover:underline">
                                    {path}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
