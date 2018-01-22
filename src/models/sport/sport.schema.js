import mongoose from 'mongoose';
import { add, get, remove } from '../../schema-helpers';

mongoose.Promise = require('bluebird');

const SportSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: mongoose.Types.ObjectId },
  name: String
});

SportSchema.set('toJSON', { getters: true });

const Sport = mongoose.model('Sport', SportSchema, 'sports');

module.exports.addSport = (root, { name }) => {
  const newSport = new Sport({ name: name });
  return add(newSport);
};

module.exports.getSport = (root, { id }) => get(Sport, id);

module.exports.getSports = () => get(Sport);

module.exports.updateSport = (root, { id, name }) => {
  return new Promise((resolve, reject) => {
    Sport.findOneAndUpdate({ id: id }, { name: name }).exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};

module.exports.removeSport = (root, { id }) => remove(Sport, id);
