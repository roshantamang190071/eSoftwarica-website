
const Admin = require('../models/admin_model');
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

describe('admin Schema test anything', () => {
     it('Adding admin', () => {
          const admin = {
               'college_id': 'admin_2',
               'full_name': 'Admin_2',
               'password': 'admin_2'
          };

          return Admin.create(admin)
               .then((result) => {
                    expect(result.college_id).toEqual('admin_2');
               });
     });

     it('admin delete', async () => {
          const status = await Admin.deleteMany();
          expect(status.ok).toBe(1);
     });

     it('To admin update', async () => {
          return Admin.findOneAndUpdate({ _id: Object('5d20c71c0da2982d681e4bf0') },
               { $set: { full_name: 'Harry' } })
               .then((result) => {
                    expect(result.full_name).toEqual('Harry')
               })
     });
})