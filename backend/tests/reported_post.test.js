
const Reported_post = require('../models/reported_post_model');
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

describe('reported_post Schema test anything', () => {
     it('Adding reported_post', () => {
          const reported_post = {
               'reported_post_id':'615046c30ee93544485f6962',
               'tag': 'qwer',
               'content': 'Hewrqqello',
               'date': '06/03/2021 02:16 pm',
               'user_id':'6150445d0ee93544485f695e',
               'user_full_name': 'student_1',
               'reported_by_full_name' : 'student_1'
          };

          return Reported_post.create(reported_post)
               .then((result) => {
                    expect(result.tag).toEqual('qwer');
               });
     });

     it('reported_post delete', async () => {
          const status = await Reported_post.deleteMany();
          expect(status.ok).toBe(1);
     });

})