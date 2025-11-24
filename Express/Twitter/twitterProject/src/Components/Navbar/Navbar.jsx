import "./Navbar.css"

export default function Navbar() {
  return (
    <div className='navbarMain'>
      <div>
        <img src="../../../public/images/logo.png" alt="" />
      </div>
      <div className="listNavbar">
       <ul>
  <li><a href=""><i class="fa-regular fa-house"></i> Home</a></li>
  <li><a href=""><i class="fa-solid fa-hashtag"></i> Explore</a></li>
  <li><a href=""><i class="fa-regular fa-bell"></i> Notifications</a></li>
  <li><a href=""><i class="fa-regular fa-envelope"></i> Messages</a></li>
  <li><a href=""><i class="fa-regular fa-bookmark"></i> Bookmarks</a></li>
  <li><a href=""><i class="fa-solid fa-list"></i> Lists</a></li>
  <li><a href=""><i class="fa-regular fa-circle-user"></i> Profile</a></li>
  <li><a href=""><i class="fa-solid fa-ellipsis"></i> More</a></li>
</ul>

      </div>
      <div>
        <button>Tweet</button>
      </div>
    </div>
  )
}
