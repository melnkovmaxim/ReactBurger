import componentStyles from './FeedTap.module.css';
import FeedTapOrder from "../FeedTapOrder/FeedTapOrder";

const FeedTap = () => {
  return (
    <div className={componentStyles.container}>
      <div className={`pr-2 ${componentStyles.orderListWrapper}`}>
        <FeedTapOrder/>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
        <div className="mt-4"><FeedTapOrder/></div>
      </div>
    </div>
  );
}

export default FeedTap;