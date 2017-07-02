import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.sass';

const ProposedTrade = ({ itemName, itemPic, itemId, reqStatus, ownerInfo, itemOwner, cancelProposal }) => {
  let cancelBtn, wrapper;
  const contactInfo = [];

  if(ownerInfo[0]) {
    contactInfo.push(
      <h4 key="infoEmail">
        <span>Email:</span> {ownerInfo[0]}
      </h4>
    );
  }

  if(ownerInfo[1]) {
    contactInfo.push(
      <h4 key="infoPhoneNo">
        <span>Phone No:</span> {ownerInfo[1]}
      </h4>
    );
  }

  if(!ownerInfo[0] && !ownerInfo[1]) {
    contactInfo.push(
      <h4 key="noContactsh">
        Sorry, Item owner hasn't provided any contact details.
      </h4>
    );
  }

  return (
    <div className="ptWrapper" ref={node => wrapper = node}>
      <div className="upper">
        <Link to={`/item/${itemId}`}>
          <div className="userImg bkdPic" data-bg={itemPic} />
        </Link>
        {
          reqStatus === 'PENDING' ?
          <h4>
            You have proposed <span className="name">{itemOwner}</span> for trading <Link to={`/item/${itemId}`}>{itemName}</Link>.
          </h4> :
          <h4>
            Your proposal to <span className="name">{itemOwner}</span> for trading <Link to={`/item/${itemId}`}>{itemName}</Link> has been accepted.
          </h4>
        }
      </div>
      <div className="tradeBtnWrapper lower">
        {
          reqStatus === 'PENDING' ?
          <button
            ref={node => cancelBtn = node}
            className="cancelBtn normalBtn"
            onClick={() => {
              cancelBtn.disabled = true;
              cancelBtn.classList.add('disabled');
              wrapper.classList.add('blacklisted');
              cancelProposal(itemId, wrapper, cancelBtn);
            }}
          >
            Cancel Proposal
          </button> :
          <div className="contactInfoOwner">
            <h4><span className="underline">Owner Contact Info</span></h4>
            {contactInfo}
          </div>
        }
      </div>
    </div>
  );
};

ProposedTrade.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  itemPic: PropTypes.string.isRequired,
  itemOwner: PropTypes.string.isRequired,
  cancelProposal: PropTypes.func.isRequired,
  reqStatus: PropTypes.string.isRequired,
  ownerInfo: PropTypes.array.isRequired
};

export default ProposedTrade;
