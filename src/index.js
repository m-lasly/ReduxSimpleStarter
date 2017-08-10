import _ from "lodash";
import React, {Component} from "react";
import ReactDom from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
//const API_KEY = "AIzaSyB0biq99zOGD9mKqALJEq8ggrJ4NiKi9Y0";
const API_KEY = "AIzaSyDoXOTyiZwLXSNYtKMLLEJFR-Bdez_n_F0";

// create new component this should produce HTML

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }
  videoSearch(term) {
    YTSearch({
      key: API_KEY,
      term: term
    }, videos => {
      this.setState({videos: videos, selectedVideo: videos[0]});
      //console.log(videos);
    });
  }
  render() {
    const videoSearch = _.debounce((term) => {
      this.videoSearch(term)
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
      </div>
    );
  }
}

// take this component' s generated HTML and //put it on the page

ReactDom.render(
  <App/>, document.querySelector(".container"));
