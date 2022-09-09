import React from "react";
import Slider from "react-slick";
import { settings } from "../common/settings";
import Card from "./Card";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

//get all series from database
const seriesRef = collection(db, "series");
const getSeries = async () => {
  const data = await getDocs(seriesRef);
  const series = await data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return series;
};

class Discover extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      series: [
        { title: "", category: "", img_id: "" },
        { title: "", category: "", img_id: "" },
      ],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    getSeries().then((res) => {
      this.setState({ series: [...res] });
      console.log(this.state.series);
    });
  }
  componentWillUnmount() {
    // to avoid unmounted react state error
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    var serieslist = this.state.series;
    return (
      <div className="sm:px-10">
        <div className=" px-5  my-5 text-white text-xl sm:text-2xl font-medium">
          Trending now{" "}
        </div>

        <Slider {...settings}>
          {serieslist.map((serie) => (
            <Card key={serie.id} data={serie} />
          ))}
        </Slider>
      </div>
    );
  }
}

/*function Discover() {
  const [data, setData] = useState([{}]);
  const [data1, setData1] = useState([{}]);
  const [series, setSeries] = useState([{}]);

  useEffect(() => {
    getSeries().then((res) => {
      setSeries({ series: [...res] });
      console.log(series);
    });
  }, [series]);

  /* useEffect(() => {
    movieApi.get(`/trending/movie/day?api_key=${APIkey}`).then((res) => {
      setData(res.data.results);
    });
    movieApi
      .get(
        `discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2020&with_watch_monetization_types=flatrate`
      )
      .then((res) => {
        setData1(res.data.results);
      });
  }, [data]);
  if (!series) {
    return (
      <div>
        <div className=" text-xl flex space-x-2 items-center text-white">
          <AiOutlineLoading3Quarters className=" animate-spin" />
          <p>Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" sm:px-10   ">
      <div className=" px-5  my-5 text-white text-xl sm:text-2xl font-medium">
        Trending now{" "}
      </div>

      <Slider {...settings}>
        {series.map((serie) => (
          <Card key={serie.id} data={serie} />
        ))}
      </Slider>
      {/*   <div className=" px-5  my-5 text-white text-xl sm:text-2xl font-medium">
        Trending today
      </div>
      <Slider {...settings}>
        {data.slice(7, 14).map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </Slider>
      <div className=" px-5  my-5 text-white  text-xl sm:text-2xl font-medium">
        Trending this week{" "}
      </div>
      <Slider {...settings}>
        {data.slice(14, 20).map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </Slider>
      <div className=" px-5  my-5 text-white  text-xl sm:text-2xl font-medium">
        Best of this year{" "}
      </div>
      <Slider {...settings}>
        {data1.slice(0, 7).map((item) => (
          <SearchCard key={item.id} data={item} />
        ))}
      </Slider>
      <div className=" px-5  my-5 text-white  text-xl sm:text-2xl font-medium">
        Best of this Year{" "}
      </div>
      <Slider {...settings}>
        {data1.slice(8, 14).map((item) => (
          <SearchCard key={item.id} data={item} />
        ))}
      </Slider>
      <div className=" px-5  my-5 text-white  text-xl sm:text-2xl font-medium">
        Best of this century{" "}
      </div>
      <Slider {...settings}>
        {data1.slice(15, 20).map((item) => (
          <SearchCard key={item.id} data={item} />
        ))}
      </Slider>
        }
    </div>
  );
}*/

export default Discover;
