import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
window.$ = $;

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});


const SideNav = () => {

    return (
        {/*<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <button type="button" id="sidebarCollapse" className="btn btn-info">
                    <i className="fas fa-align-left"></i>
                    <span>Toggle Sidebar</span>
                </button>
                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-align-justify"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Page</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Page</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Page</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Page</a>
                        </li>
                    </ul>
                </div>
            </div>
    </nav>*/}
    )
}




export default SideNav