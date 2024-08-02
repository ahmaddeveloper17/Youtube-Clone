import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  const [videoData, setVideoData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchVideoData = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        relatedToVideoId: "7ghhRHRP6t4",
        part: "id,snippet",
        type: "video",
        maxResults: "50",
      },
      headers: {
        "x-rapidapi-key": "e5b0792fa2mshe7054ebd9b586d8p183c65jsne9226c163f67",
        "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setVideoData(response.data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideoData();
  }, []);
  return (
    <div  className="container">
<Navbar/>
      <h1 style={{textAlign:"center"}}>YouTube Videos</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Routes>
        <Route
          path="/"
          element={
            <div className="video-grid" style={{display:"flex" , flexDirection:"row"}}>
              {videoData.map((video) => (
                <VideoCard key={video.id.videoId} video={video} />
              ))}
            </div>
          }
        />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </div>
  );
};

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.id.videoId}`);
  };

  return (
    <div className="video-card" onClick={handleClick}>
      <img src={video.snippet.thumbnails.default.url} alt="Video Thumbnail" />
      <div className="video-card-title">{video.snippet.title}</div>
    </div>
  );
};

const VideoPage = () => {
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { id } = useParams();

  const fetchVideo = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/videos",
      params: {
        part: "snippet,contentDetails",
        id: id,
      },
      headers: {
        "x-rapidapi-key": "e5b0792fa2mshe7054ebd9b586d8p183c65jsne9226c163f67",
        "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setVideo(response.data.items[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVideo();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {video && (
        <div>
          <h2>{video.snippet.title}</h2>
          <div className="video-container">
  <iframe
    src={`https://www.youtube.com/embed/${video.id}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title={video.snippet.title}
  ></iframe>
</div>

          <p>{video.snippet.description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
