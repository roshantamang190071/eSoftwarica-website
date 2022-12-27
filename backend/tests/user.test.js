
// use the path of your model
const User = require('../models/user_model');
const mongoose = require('mongoose');

// use the new name of the database
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

describe('User Schema test anything', () => {
     // the code below is for insert testing
     it('Adding user', () => {
          const user = {
               'college_id': '0006',
               'full_name': 'Ram',
               'batch':'batch 3',
               'password': '0006'
          };

          return User.create(user)
               .then((result) => {
                    expect(result.college_id).toEqual('0006');
               });
     });

     // the code below is for delete testing
     it('User delete', async () => {
          const status = await User.deleteMany();
          expect(status.ok).toBe(1);
     });

     it('To user update', async () => {
          return User.findOneAndUpdate({ _id: Object('5d20c71c0da2982d681e4bf0') },
               { $set: { full_name: 'Harry' } })
               .then((result) => {
                    expect(result.full_name).toEqual('Harry')
               })
     });
})