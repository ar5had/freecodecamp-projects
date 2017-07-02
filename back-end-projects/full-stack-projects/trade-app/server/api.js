const User = require('../models/user');
const Item = require('../models/item');
const objectAssign = require('object-assign');
const cloudinary = require('cloudinary');
const multer = require('multer');
const path = require('path');
const cp = require('child_process');

const uploadDir = path.resolve(process.cwd(), 'uploads');

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 512000 }
}).single('itemPic');

module.exports = function (app) {

  cloudinary.config({
    cloud_name: process.env.CAPI_CLOUD_NAME,
    api_key: process.env.CAPI_KEY,
    api_secret: process.env.CAPI_SECRET
  });

  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json({ 'error': 'UNAUTHORIZED' });
    }
  };

  app.get('/isUserLoggedIn', isLoggedIn, (req, res) => {
    res.json({ 'error': '', 'notificationsCount': req.user.notificationsCount })
  });

  app.get('/api/getProfileData', isLoggedIn, (req, res) => {
    const { name, address, phoneNo, email, dp } = req.user;
    res.json({ name, address, phoneNo, email, dp });
  });

  app.post('/api/setProfileData', isLoggedIn, (req, res) => {
    const { landmark, city, state, pinCode, country, localAddress } = req.body;
    const address = { landmark, city, state, pinCode, country, localAddress };
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const newProfileData = req.query.edit === 'location' ? { address } : { phoneNo, email };
    User.findByIdAndUpdate(req.user.id, newProfileData, { new: true })
      .exec((err, doc) => {
        if (err) {
          res.status(500).send({ error: "Error happened while updating user info!" });
        } else {
          const { address, phoneNo, email } = doc;
          res.json({ address, phoneNo, email });
        }
      });
  });

  app.post('/api/addMyItem', (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.status(500).send('File upload failed.').end();
      } else {
        if (!req.file) {
          return res.status(403).send('Please upload a picture of item!').end();
        }

        if (!/^image\/(jpe?g|png|gif)$/i.test(req.file.mimetype)) {
          return res.status(403).send('Please upload JPEG or PNG or GIF image file!').end();
        }

        const date = new Date();
        const ownerInfo = { itemOwnerId: req.user._id, itemOwner: req.user.name };
        const data = objectAssign(
          {},
          req.body,
          {
            itemAdditionDate: date.toDateString().slice(4),
            itemRequests: [], key: date.getTime()
          },
          ownerInfo
        );
        const newItem = new Item(data);

        cloudinary.uploader.upload(`${req.file.path}`, function (result) {
          newItem.itemPic = result.secure_url;
          newItem.save((err, doc) => {
            if (err) {
              console.error('Error happened while adding new myitem-', err);
              res.status(500).send({ error: 'Some error happened while adding new item!' });
            } else {
              const item = objectAssign({}, doc.toObject());
              delete item._id;
              delete item.__v;
              delete item.itemOwnerId;
              res.json(item);
            }
          });

          // clear the uploadDir
          cp.exec('rm -r ' + uploadDir + '/*', err => {
            if (err) {
              console.error('Error happenned while clearing uploadDir-', err);
            }
          });

        }, { public_id: `${date.getTime()}` });

      }
    });
  });

  app.get('/api/getMyItemsData', isLoggedIn, (req, res) => {
    Item.find({ itemOwnerId: req.user._id.toString() },
      ['key', 'itemName', 'itemPic', 'itemCurrency', 'itemAdditionDate',
        'itemPrice', 'itemDescription', 'itemTags'],
      {
        sort: { key: -1 }
      }
    )
      .exec((err, docs) => {
        if (err) {
          console.error('Error happened while loading myItems-', err);
          res.status(500).send({ error: 'Some error happened while loading all of your items!' });
        } else {
          res.json(docs);
        }
      });
  });

  app.delete('/api/deleteMyItem/:key', isLoggedIn, (req, res) => {
    cloudinary.uploader.destroy(`${req.params.key}`);
    Item.find({ key: req.params.key })
      .remove((err) => {
        if (err) {
          console.error('Error happened while deleting item with key', req.params.key, "-", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });

  app.get('/api/getAllItemsData', (req, res) => {
    Item.find({},
      ['key', 'itemName', 'itemCurrency', 'itemPrice', 'itemPic'],
      {
        sort: { key: -1 }
      }
    )
      .exec((err, docs) => {
        if (err) {
          console.error('Error happened while loading allItems-', err);
          res.sendStatus(500);
        } else {
          res.json(docs);
        }
      });
  });

  app.get('/api/getIndividualItemData/:key', (req, res) => {
    Item.findOne({ key: req.params.key },
      ['key', 'itemName', 'itemCurrency', 'itemPrice', 'itemPic', 'itemRequests',
        'itemDescription', 'itemAdditionDate', 'itemTags', 'itemOwner', 'itemOwnerId']
    )
      .exec((err, doc) => {
        if (err) {
          console.error('Error happened while loading individual Item-', err);
          res.sendStatus(500);
        } else {
          if (doc) {

            const isSoldOut = doc.itemRequests.some(elem => elem.reqStatus === 'ACCEPTED');

            const item = objectAssign({}, doc.toObject());
            // checking whether the current user has requested the item
            // in past or not

            let itemRequestedByCurrentUser = false;

            if (req.user) {
              itemRequestedByCurrentUser = item.itemRequests.some(elem => (
                elem.reqMaker.id === req.user._id.toString()
              ));
            }

            const ownItem = item.itemOwnerId === (req.user && req.user._id.toString());
            delete item._id;
            delete item.itemOwnerId;
            delete item.__v;
            item.ownItem = ownItem;
            res.json(objectAssign(item, { itemRequestedByCurrentUser, isSoldOut }));
          } else {
            res.sendStatus(400);
          }
        }
      });
  });

  app.get('/api/requestitem/:key', isLoggedIn, (req, res) => {
    Item.findOne({ key: parseInt(req.params.key, 10) }, (err, doc) => {
      if (err) {
        console.error('Error happened while loading allItems-', err);
        res.sendStatus(500);
      } else {

        User.findOne({ _id: doc.itemOwnerId }, (err, doc) => {
          if (!err) {
            doc.notificationsCount += 1;
            doc.markModified('notificationsCount');
            doc.save();
          }
        });

        // dont push itemRequest if its already there.
        const itemRequestedByCurrentUser = doc.itemRequests.some(elem => (
          elem.reqMaker.id === req.user._id.toString()
        ));

        // checkout whether item has already sold out or not.
        const isSoldOut = doc.itemRequests.some(elem => elem.reqStatus === 'ACCEPTED');

        if (isSoldOut) {
          res.status(409).send('Item Sold Out');
        } else if (!itemRequestedByCurrentUser) {
          const itemRequest = {
            reqMaker: {
              uniqueId: new Date().getTime(),
              id: req.user._id.toString(),
              name: req.user.name
            },
            reqStatus: 'PENDING'
          };
          doc.itemRequests.push(itemRequest);
          doc.save((err, doc) => {
            const itemRequestedByCurrentUser = true;

            const proposedTrade = {};
            proposedTrade.id = req.params.key;
            proposedTrade.itemName = doc.itemName;
            proposedTrade.itemPic = doc.itemPic;
            proposedTrade.itemOwner = doc.itemOwner;
            proposedTrade.reqStatus = "PENDING";
            proposedTrade.reqMakerInfo = [];
            req.user.trades.unshift(proposedTrade);
            req.user.markModified('trades');
            req.user.save(err => {
              if (err) {
                console.log('Error happened when adding trades request to user model.');
                res.status(500).send('Error while saving to user model!').end();
              } else {
                res.json(objectAssign({}, doc.toObject(), { itemRequestedByCurrentUser }));
              }
            });

          });
        } else {
          res.json(doc.toObject());
        }
      }
    });
  });

  app.get('/api/getTradesData', isLoggedIn, (req, res) => {
    Item.find({ itemOwnerId: req.user._id },
      { 'itemRequests': 1, _id: 0, 'itemPic': 1, 'itemName': 1, 'key': 1 })
      .exec((err, docs) => {
        if (err) {
          res.status(500).send('Failed to fetch item trade requests!').end();
        } else {
          let requests = docs.filter(elem => elem.itemRequests.length > 0);
          requests = requests.map(elem => {
            elem.itemRequests = elem.itemRequests.map(elemItem => {
              return ({
                reqStatus: elemItem.reqStatus,
                reqMaker: elemItem.reqMaker.name,
                docId: elemItem.reqMaker.uniqueId
              });
            });
            return elem;
          });
          res.json({ proposedTrades: req.user.trades, tradeRequests: requests });
        }

        req.user.notificationsCount = 0;
        req.user.markModified('notificationCount');
        req.user.save();
      });
  });

  app.post('/api/removeitemrequest', isLoggedIn, (req, res) => {
    const key = req.body.id;
    Item.findOne({ key: parseInt(key, 10) })
      .exec((err, doc) => {
        if (err) {
          console.log("Some error happened while removing item request-", err);
          res.status(500).send('Some error happened while removing item request');
        } else {

          User.findOne({ _id: doc.itemOwnerId }, (err, doc) => {
            if (!err) {
              doc.notificationsCount -= 1;
              doc.markModified('notificationsCount');
              doc.save();
            }
          });

          doc.itemRequests = doc.itemRequests.filter(elem => (
            elem.reqMaker.id !== req.user._id.toString()
          ));
          doc.save(err => {
            if (err) {
              console.log("Some error happened while removing item request-", err);
            } else {
              req.user.trades = req.user.trades.filter(
                elem => elem.id !== key
              );
              req.user.markModified('trades');
              req.user.save(err => {
                if (err) {
                  console.log("Error while removing cancelling trade proposal!");
                } else {
                  res.json({ proposedTrades: req.user.trades });
                }
              });
            }
          });
        }
      });
  });

  app.post('/api/declinerequest', isLoggedIn, (req, res) => {
    // first remove itemRequest = require(item
    let userId, reqStatus;
    Item.findOne({ key: parseInt(req.body.key, 10) })
      .exec((err, doc) => {
        if (err) {
          res.status(500).send('Error happened while declining trade request!').end();
          console.log('Error happened while declining trade request!');
        } else {

          doc.itemRequests = doc.itemRequests.filter(elem => {
            if (elem.reqMaker.uniqueId.toString() === req.body.docId) {
              userId = elem.reqMaker.id;
              reqStatus = elem.reqStatus;
              return false;
            } else {
              return true;
            }
          });

          if (reqStatus === 'PENDING') {
            doc.save(err => {
              if (err) {
                res.status(500).send('Error happened while declining trade request!').end();
                console.log('Error happened while declining trade request!');
              } else {
                // remove proposedTrade item = require(the user who made that request.
                User.findOne({ _id: userId })
                  .exec((err, doc) => {
                    if (err) {
                      res.status(500).send('Error happened while declining trade request!').end();
                      console.log('Error happened while declining trade request!');
                    } else {
                      doc.trades = doc.trades.filter(elem => elem.id !== req.body.key);
                      doc.save(err => {
                        if (err) {
                          res.status(500).send('Error happened while declining trade request!').end();
                          console.log('Error happened while declining trade request!');
                        } else {
                          res.json({ status: 'OK' });
                        }
                      });
                    }
                  });
              }
            });
          } else {
            res.json({ status: 'Accepted trade requests can\'t be declined' });
          }

        }
      });
  });

  app.post('/api/acceptrequest', isLoggedIn, (req, res) => {
    const { key, docId } = req.body;
    let userId, prevReqStatus;
    Item.findOne({ key: parseInt(key, 10) })
      .exec((err, doc) => {
        if (err) {
          res.status(500).send('Error happened while accepting trade request!').end();
          console.log('Error happened while accepting trade request!');
        } else {

          doc.itemRequests = doc.itemRequests.map(elem => {
            if (elem.reqMaker.uniqueId.toString() === docId) {
              userId = elem.reqMaker.id;
              prevReqStatus = elem.reqStatus;
              // mongoose unable to see changes in embedded arrays
              // check out issue - https://github.com/Automattic/mongoose/issues/1204
              elem.reqStatus = 'ACCEPTED';
            }
            return elem;
          });
          doc.markModified('itemRequests');
          if (prevReqStatus === 'PENDING') {
            doc.save(err => {
              if (err) {
                res.status(500).send('Error happened while accepting trade request!').end();
                console.log('Error happened while accepting trade request!');
              } else {
                // remove proposedTrade item = require(the user who made that request.
                User.findOne({ _id: userId })
                  .exec((err, doc) => {
                    if (err) {
                      res.status(500).send('Error happened while declining trade request!').end();
                      console.log('Error happened while declining trade request!');
                    } else {
                      doc.trades = doc.trades.map(elem => {
                        if (elem.id === key) {
                          elem.reqStatus = "ACCEPTED";
                          elem.reqMakerInfo = [req.user.email, req.user.phoneNo];
                        }
                        return elem;
                      });

                      // for notifications
                      doc.notificationsCount += 1;
                      doc.markModified('notificationsCount');

                      doc.markModified('trades');
                      doc.save(err => {
                        if (err) {
                          res.status(500).send('Error happened while declining trade request!').end();
                          console.log('Error happened while declining trade request!');
                        } else {
                          res.json({ status: 'OK' });
                        }
                      });
                    }
                  });
              }
            });
          } else {
            res.json({ status: 'Trade request is already accepted!' });
          }
        }
      });

  });

};
