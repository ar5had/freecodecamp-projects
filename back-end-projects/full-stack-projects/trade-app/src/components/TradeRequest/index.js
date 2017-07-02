import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.sass';

const TradeRequest = ({itemName, itemPic, reqMaker, docId, reqStatus, acceptRequest, declineRequest, itemId }) => {
    let wrapper, acceptBtn, declineBtn;
    return (
      <div className="trWrapper" ref={node => wrapper = node}>
        <div className="upper">
          <Link to={`/item/${itemId}`}>
            <div className="userImg bkdPic" data-bg={itemPic} />
          </Link>
          <h4>
            <span className="name">{reqMaker}</span> wants to trade with your item- <Link to={`/item/${itemId}`}>{itemName}</Link>
          </h4>
        </div>
        <div className="tradeBtnWrapper lower">
          {
            reqStatus === 'PENDING' ?
              <div>
                <button className="acceptBtn normalBtn"
                  ref={node => acceptBtn = node}
                  onClick={() => {
                    acceptBtn.classList.add('disabled');
                    declineBtn.classList.add('disabled');
                    acceptRequest(itemId, docId, acceptBtn, declineBtn);
                  }}
                >
                  Accept
                </button>
                <button className="declineBtn normalBtn"
                  ref={node => declineBtn = node}
                  onClick={() => {
                    wrapper.classList.add('blacklisted');
                    acceptBtn.classList.add('disabled');
                    declineBtn.classList.add('disabled');
                    declineRequest(itemId, docId, wrapper, acceptBtn, declineBtn);
                  }}
                >
                  Decline
                </button>
              </div> :
              <button className="acceptBtn normalBtn noLinkBtn"
              >
                Accepted
              </button>
          }

        </div>
      </div>
    );

};

TradeRequest.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  itemPic: PropTypes.string.isRequired,
  reqMaker: PropTypes.string.isRequired,
  reqStatus: PropTypes.string.isRequired,
  declineRequest: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired
};

export default TradeRequest;
