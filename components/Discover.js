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

export default Discover;
