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
}).single('picture');

const sendProfileData = (req, res) => {
  Item.find(
    { ownerUserId: req.profileId.toString() },
    { '_id': 0, 'key': 1, 'caption': 1, 'picture': 1, 'likesCount': 1, 'ownerUserId': 1, 'ownerDp': 1 },
    {
      sort: { key: -1 }
    }
  )
    .exec((err, docs) => {
      if (err) {
        console.error('Error happened while loading profile items-', err);
        res.status(500).send({ error: 'Some error happened while loading profile items!' });
      } else {
        if (req.profileName && req.profileDp) {
          res.json({ name: req.profileName, dp: req.profileDp, myItems: docs });
        } else {
          User.findOne({ userId: req.profileId.toString() }, { _id: 0, dp: 1, name: 1 })
            .exec((err, user) => {
              if (err) {
                console.error('Error happened while loading profile items-', err);
                res.status(500).send({ error: 'Some error happened while loading profile items!' });
              } else {
                if (user) {
                  res.json({ name: user.name, dp: user.dp, myItems: docs });
                } else {
                  res.json({ 'error': 'WRONG_PROFILE_ID!' });
                }
              }

            });
        }
      }
    });
};

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
    res.json({ error: '', userId: req.user.userId.toString(), favourites: req.user.likedItems });
  });

  app.get('/api/getProfileData', isLoggedIn, (req, res, next) => {
    req.profileId = req.user.userId;
    req.profileName = req.user.name;
    req.profileDp = req.user.dp;
    next();
  }, sendProfileData);

  // add double check so that non-auth user can't post pic in any case
  app.post('/api/addMyItem', isLoggedIn, (req, res) => {
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
        const ownerInfo = { ownerId: req.user._id, ownerName: req.user.name, ownerDp: req.user.dp };
        const data = objectAssign(
          {},
          req.body,
          {
            likesCount: 0, key: date.getTime(), ownerUserId: req.user.userId
          },
          ownerInfo
        );
        const newItem = new Item(data);

        cloudinary.uploader.upload(`${req.file.path}`, function (result) {
          newItem.picture = result.secure_url;
          newItem.save((err, doc) => {
            if (err) {
              console.error('Error happened while adding new myitem-', err);
              res.status(500).send({ error: 'Some error happened while adding new item!' });
            } else {
              const item = objectAssign({}, doc.toObject());
              delete item._id;
              delete item.__v;
              delete item.ownerId;
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

  // add double check so that non-auth user can't delete pic in any case
  app.delete('/api/deleteMyItem/:key', isLoggedIn, (req, res) => {
    Item.find({ key: req.params.key, ownerId: req.user._id})
      .remove((err) => {
        if (err) {
          console.error('Error happened while deleting item with key', req.params.key, "-", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
          cloudinary.uploader.destroy(`${req.params.key}`);
        }
      });
  });

  app.get('/api/getAllItemsData', (req, res) => {
    Item.find({},
      { '_id': 0, 'key': 1, 'caption': 1, 'picture': 1, 'ownerDp': 1, 'ownerName': 1, 'likesCount': 1, 'ownerUserId': 1 },
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

  app.post('/api/toggleFavItem', isLoggedIn, (req, res) => {
    const photoId = req.body.photoId;
    let count = 1;
    const index = req.user.likedItems.indexOf(photoId);

    if (index === -1) {
      req.user.likedItems.push(photoId);
    } else {
      count = -1;
      req.user.likedItems = req.user.likedItems.slice(0, index).concat(req.user.likedItems.slice(index + 1));
    }
    req.user.markModified('likedItems');
    req.user.save(err => {
      if (err) {
        console.log('Error happened when changing likedItems list.');
        res.status(500).send('Error while changing likedItems list of user model!').end();
      } else {
        res.json(req.user.likedItems);

        let query;
        if (count === -1) {
          query = { key: parseInt(photoId, 10), likesCount: { $gt: 0 } };
        } else {
          query = { key: parseInt(photoId, 10) };
        }

        Item.findOneAndUpdate(
          query,
          { $inc: { likesCount: count } }
        ).exec(err => {
          if (err) {
            console.error('Error happend while adding likes count!')
          }
        });
      }
    });
  });

  app.get('/profile/:id', (req, res, next) => {
    if (!isNaN(parseFloat(req.params.id))) {
      req.profileId = req.params.id;
      next();
    } else {
      res.json({ 'error': 'WRONG_PROFILE_ID!' });
    }
  }, sendProfileData);
};
