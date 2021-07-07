import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";

import {
    Link
} from "react-router-dom";

const menuItems = [
    { title: "Home", link: "/" },
    { title: "View Policies", link: "/cancellationpolicies" },
    { title: "Add New Policy", link: "/add" }
];

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
            <button className={"sidebar__button"} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <ul>
                {menuItems.map(item => (
                    <li key={item.title}>
                        <div className={"sidebar__listItem"}>
                            <CSSTransition
                                in={isOpen}
                                timeout={200}
                                classNames={"fade"}
                                unmountOnExit
                            >
                                <Link to={item.link}>{item.title}</Link>
                            </CSSTransition>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default SideBar;