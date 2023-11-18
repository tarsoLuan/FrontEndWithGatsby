import React, { useState, useEffect} from 'react';
import Layout from "../components/layout"
import ProfileComponent from "../components/profile"
import "../components/styles/profile.css";

export default function Profile() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return(
        <Layout>
            <ProfileComponent />
        </Layout>
    )
}