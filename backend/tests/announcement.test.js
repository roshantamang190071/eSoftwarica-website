
const Announcement = require('../models/announcement_model');
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

describe('announcement Schema test anything', () => {

     it('Adding announcement', () => {
          const announcement = {
               'tag': 'Announcement!',
               'content': 'Announcement!',
               'date': '21/02/2021 05:05 pm',
               'admin':'614f1ddb28939f4664eced00'
          };

          return Announcement.create(announcement)
               .then((result) => {
                    expect(result.tag).toEqual('Announcement!');
               });
     });

     it('announcement delete', async () => {
          const status = await Announcement.deleteMany();
          expect(status.ok).toBe(1);
     });

     it('To announcement update', async () => {
          return Announcement.findOneAndUpdate({ _id: Object('5d20c71c0da2982d681e4bf0') },
               { $set: { content: 'Announcement_2!'} })
               .then((result) => {
                    expect(result.content).toEqual('Announcement 2!')
               })
     });
})