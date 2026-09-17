function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Student Task Manager</div>

      <ul>
        <li>
          <a href="#dashboard">Dashboard</a>
        </li>
        <li>
          <a href="#tasks">Tasks</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;