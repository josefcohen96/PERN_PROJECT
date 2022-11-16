import React from "react";

const HomePage = (e) => {

        const onSubmit = async e => {
        e.preventDefault();
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Home Page</h2>
                    <form onSubmit={e => onSubmit(e)}>
                            <button className="btn btn-secondary btn-block">Add User</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default HomePage;