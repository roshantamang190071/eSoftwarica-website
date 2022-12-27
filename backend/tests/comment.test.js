
const Comment = require('../models/comment_model');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/eSoftwarica_test';
beforeAll(async () => {
     await mongoose.connect(url, {
          useNewUrlParser: true,
          useCreateIndex: true
     });
});

afterAll(async () => {
     await mongoose.connection.close();
});

describe('comment Schema test anything', () => {

     it('Adding comment', () => {
          const comment = {
               'comment': 'Yo yo!',
               'date': '02/02/2021 05:25 pm',
               'post_id': '614f22832ce81f48ace01964',
               'user_id':'614f1d4e28939f4664ececfa',
               'user_full_name': 'Hari Prasad'
          };

          return Comment.create(comment)
               .then((result) => {
                    expect(result.comment).toEqual('Yo yo!');
               });
     });
})