import "./Home.css"

export default function Home() {
  return (
    <div className='homeMain'>
      <div className='homeSearch'>
        <input type="text" placeholder='Search Twitter'/>
      </div>
      <div>
        <h2>Trends for you</h2>
        <div>
          <span>Trending worldwide</span>
          <p className="headNews"># Breaking News</p> 
          <p>Dharmendra Funeral Live Updates: Veteran Bollywood actor Dharmendra, fondly known as the “He-Man of Bollywood,” has passed away at the age...</p>
          <span>20.2K Tweets</span>

           <span>Trending worldwide</span>
           <p className="headNews"># World News</p>
           <p>'Accept Or Face Worse': Ukraine Insider's Brutal Reality Check For Zelensky On Trump Russia Plan...</p>
            <span>15.3K Tweets</span>

            <span>Trending worldwide</span>
            <p className="headNews"># Tech News</p>
            <p>Apple's New VR Headset: A Game-Changer in Tech Innovation...</p>
            <span>10.5K Tweets</span>
        </div>
      </div>
    </div>
  )
}
