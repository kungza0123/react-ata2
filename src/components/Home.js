import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Auth'
import logo from '../Img/logo.png'

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>

            <div className="container mt-5" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height:'35vh'
            }}>
                <img
                    src={logo}
                    style={{ width: '300px' }}

                />

            </div>
            <div className="container mt-5" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                {currentUser ? (
                    <p>You are logged in - <Link to="/dashboard">View Dashboard</Link></p>
                ) : (
                    <p>
                        <Link to="/login" className="btn btn-primary">Log In</Link>
                    </p>
                )}
            </div>

        </>
    )
}

export default Home;
