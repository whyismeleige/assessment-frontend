import '../Styles/Home.css'

export default function Home(props) {
  return (
    <div className="card">
      <div className="main-content">
        <div className="header">
          <span>Project by</span>
          <span>7-June-2025</span>
        </div>
        <p className="heading">This was a login page created by me</p>
        <div className="categories">
            <span>Mongo</span>
            <span>Express</span>
          <span>React</span>
          <span>Node</span>

        </div>
      </div>
      <div className="footer">by Piyush Jain</div>
    </div>
  );
}
