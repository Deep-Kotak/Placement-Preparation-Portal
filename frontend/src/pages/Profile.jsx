import Navbar from "../components/Navbar";

function Profile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card p-4 shadow">

                    <h2 className="mb-4">
                        Student Profile
                    </h2>

                    <p>
                        <strong>Name:</strong> {user?.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {user?.email}
                    </p>

                    <p>
                        <strong>College:</strong> {user?.college}
                    </p>

                    <p>
                        <strong>Course:</strong> {user?.course}
                    </p>

                </div>

            </div>
        </>
    );
}

export default Profile;