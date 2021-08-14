import FeedTap from "../../components/FeedTap/FeedTap";
import FeedStatistics from "../../components/FeedStatistics/FeedStatistics";
import componentStyles from './Feed.module.css';
import React from "react";

const Feed = () => {
  return (
    <div className={`mt-8 ${componentStyles.container}`}>
      <p className={ "text text_type_main-large" }>Лента заказов</p>
      <div className={`mt-6 ${componentStyles.innerContainer}`}>
        <FeedTap/>
        <div className="ml-15"/>
        <FeedStatistics/>
      </div>
    </div>
  )
};

export default Feed;