import { Route, Routes } from "react-router-dom"
import AddMovie from "../features/AddMovie/AddMovie.jsx"
import Home from "../components/Home/Home"
import EditMovie from "../features/EditMovie/EditMovie.jsx"

export default function MovieRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addmovie" element={<AddMovie />} />
                <Route path="/edit/:id" element={<EditMovie />} />
            </Routes>
        </div>
    )
}
