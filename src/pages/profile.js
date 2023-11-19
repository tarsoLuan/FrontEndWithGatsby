import React from 'react';
import Layout from "../components/layout"
import ProfileComponent from "../components/profile"
import "../components/styles/profile.css";

export default function Profile() {
    return(
        <Layout>
            <ProfileComponent />
        </Layout>
    )
}