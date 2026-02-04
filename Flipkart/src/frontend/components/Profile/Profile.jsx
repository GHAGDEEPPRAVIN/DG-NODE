
const Profile = () => {
    return (
        <div className="pt-5 mt-5">
            <div className="container">
                <div className="row">

                    <div className="col-md-3">

                        <div
                            className="card mb-3"
                            style={{ borderRadius: "6px", padding: "15px" }}
                        >
                            <div className="d-flex align-items-center">
                                <div
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: "#ffc107",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold"
                                    }}
                                >
                                    👤
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                    <div style={{ fontSize: "14px", color: "#878787" }}>
                                        Hello,
                                    </div>
                                    <div style={{ fontWeight: "600" }}>
                                        Flipkart Customer
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ borderRadius: "6px" }}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item fw-bold">
                                    📦 MY ORDERS
                                </li>

                                <li className="list-group-item fw-bold">
                                    👤 ACCOUNT SETTINGS
                                </li>
                                <li
                                    className="list-group-item"
                                    style={{ color: "#2874f0", fontWeight: "500" }}
                                >
                                    Profile Information
                                </li>
                                <li className="list-group-item">Manage Addresses</li>
                                <li className="list-group-item">PAN Card Information</li>

                                <li className="list-group-item fw-bold">
                                    💳 PAYMENTS
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    Gift Cards <span style={{ color: "green" }}>₹0</span>
                                </li>
                                <li className="list-group-item">Saved UPI</li>
                                <li className="list-group-item">Saved Cards</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div
                            className="card"
                            style={{
                                borderRadius: "6px",
                                padding: "25px",
                                background: "#fff"
                            }}
                        >
                            <div className="mb-4">
                                <div className="d-flex justify-content-between">
                                    <h5>Personal Information</h5>
                                    <span style={{ color: "#2874f0", cursor: "pointer" }}>
                                        Edit
                                    </span>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Flipkart"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="Customer"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label className="fw-bold mb-2">Your Gender</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                checked
                                                readOnly
                                            />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                readOnly
                                            />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between">
                                    <h5>Email Address</h5>
                                    <span style={{ color: "#2874f0", cursor: "pointer" }}>
                                        Edit
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    className="form-control mt-3"
                                    placeholder="Enter your email"
                                    disabled
                                />
                            </div>

                            <div>
                                <div className="d-flex justify-content-between">
                                    <h5>Mobile Number</h5>
                                    <span style={{ color: "#2874f0", cursor: "pointer" }}>
                                        Edit
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control mt-3"
                                    value=""
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
