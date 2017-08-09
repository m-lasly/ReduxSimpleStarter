import React, {Component} from "react";
import ReactDom from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const API_KEY = "AIzaSyB0biq99zOGD9mKqALJEq8ggrJ4NiKi9Y0";

// create new component this should produce HTML

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo:
      null
    };

    YTSearch({
      key: API_KEY,
      term: "surfboards"
    }, videos => {
      this.setState({videos});
      console.log(videos);
    });
  }
  render() {
    return (
      <div>
        <SearchBar/>
        <VideoDetail video={this.state.videos[1]}/>
        <VideoList videos={this.state.videos}/>
      </div>
    );
  }
}

// take this component' s generated HTML and //put it on the page

ReactDom.render(
  <App/>, document.querySelector(".container"));
