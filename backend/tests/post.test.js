
const Post = require('../models/post_model');
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

describe('post Schema test anything', () => {
     it('Adding post', () => {
          const post = {
               'tag': 'Hi',
               'content': 'Hello',
               'date': '02/02/2021 05:05 pm',
               'user_id':'6150445d0ee93544485f695e',
               'user_full_name': 'student_1'
          };

          return Post.create(post)
               .then((result) => {
                    expect(result.tag).toEqual('Hi');
               });
     });

     it('post delete', async () => {
          const status = await Post.deleteMany();
          expect(status.ok).toBe(1);
     });

     it('To post update', async () => {
          return Post.findOneAndUpdate({ _id: Object('5d20c71c0da2982d681e4bf0') },
               { $set: { content: 'Hello there!' } })
               .then((result) => {
                    expect(result.content).toEqual('Hello there!')
               })
     });
})